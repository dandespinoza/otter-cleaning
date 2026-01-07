import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import {
  Plus, Edit, Trash2, Eye, EyeOff, Save, ArrowLeft, FileText, LayoutDashboard,
  Settings, Image as ImageIcon, Tag, Calendar, Search, CheckCircle, Clock,
  AlertCircle, Copy, ExternalLink, TrendingUp, BarChart3, FolderOpen,
  History, Star, StarOff, CalendarClock, X, Upload, Grip, MoreHorizontal,
  RefreshCw, Download, ChevronDown, Globe, Lock
} from "lucide-react";
import {
  getAllPosts, getAllCategories, createPost, updatePost, deletePost, publishPost,
  unpublishPost, schedulePost, duplicatePost, formatDate, formatDateTime,
  generateSlug, getBlogStats, getAllMedia, addMedia, deleteMedia, getRevisions,
  restoreRevision, setAutosave, getAutosave, clearAutosave, createCategory,
  updateCategory, deleteCategory, checkScheduledPosts, formatFileSize,
  type BlogPost, type BlogCategory, type MediaItem, type BlogRevision, type BlogStats,
} from "@/lib/blog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import otterLogo from "@/assets/otter-logo.png";

type View = "dashboard" | "posts" | "editor" | "media" | "categories" | "settings";
type EditorTab = "content" | "seo" | "revisions";

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "",
  tags: [] as string[],
  author: "Otter Cleaning Team",
  status: "draft" as const,
  publishedAt: null as string | null,
  scheduledAt: null as string | null,
  metaTitle: "",
  metaDescription: "",
  featured: false,
};

export default function Admin() {
  const [view, setView] = useState<View>("dashboard");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [stats, setStats] = useState<BlogStats | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [newPost, setNewPost] = useState(emptyPost);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [tagInput, setTagInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editorTab, setEditorTab] = useState<EditorTab>("content");
  const [revisions, setRevisions] = useState<BlogRevision[]>([]);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaAlt, setNewMediaAlt] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const autosaveRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadData();
    checkScheduledPosts();
    const interval = setInterval(checkScheduledPosts, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    setPosts(getAllPosts());
    setCategories(getAllCategories());
    setMedia(getAllMedia());
    setStats(getBlogStats());
  };

  // Autosave
  useEffect(() => {
    if (view === "editor" && (editingPost || newPost.title)) {
      if (autosaveRef.current) clearTimeout(autosaveRef.current);
      autosaveRef.current = setTimeout(() => {
        const postId = editingPost?.id || "new";
        setAutosave(postId, newPost);
        setLastSaved(new Date());
      }, 5000);
    }
    return () => {
      if (autosaveRef.current) clearTimeout(autosaveRef.current);
    };
  }, [newPost, view, editingPost]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || post.status === filterStatus;
    const matchesCategory = filterCategory === "all" || post.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const handleNewPost = () => {
    const autosaved = getAutosave("new");
    if (autosaved && autosaved.title) {
      if (confirm("Restore autosaved draft?")) {
        setNewPost({ ...emptyPost, ...autosaved });
      } else {
        clearAutosave("new");
        setNewPost(emptyPost);
      }
    } else {
      setNewPost(emptyPost);
    }
    setEditingPost(null);
    setEditorTab("content");
    setView("editor");
  };

  const handleEditPost = (post: BlogPost) => {
    const autosaved = getAutosave(post.id);
    if (autosaved && new Date(autosaved.updatedAt || 0) > new Date(post.updatedAt)) {
      if (confirm("A newer autosaved version exists. Restore it?")) {
        setNewPost({ ...emptyPost, ...autosaved });
      } else {
        setNewPost({
          title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content,
          coverImage: post.coverImage, category: post.category, tags: post.tags,
          author: post.author, status: post.status, publishedAt: post.publishedAt,
          scheduledAt: post.scheduledAt, metaTitle: post.metaTitle,
          metaDescription: post.metaDescription, featured: post.featured,
        });
      }
    } else {
      setNewPost({
        title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content,
        coverImage: post.coverImage, category: post.category, tags: post.tags,
        author: post.author, status: post.status, publishedAt: post.publishedAt,
        scheduledAt: post.scheduledAt, metaTitle: post.metaTitle,
        metaDescription: post.metaDescription, featured: post.featured,
      });
    }
    setEditingPost(post);
    setRevisions(getRevisions(post.id));
    setEditorTab("content");
    setView("editor");
  };

  const handleSavePost = async (publish = false) => {
    if (!newPost.title.trim()) {
      toast.error("Title is required");
      return;
    }

    setIsSaving(true);

    const postData = {
      ...newPost,
      slug: newPost.slug || generateSlug(newPost.title),
      metaTitle: newPost.metaTitle || newPost.title,
      metaDescription: newPost.metaDescription || newPost.excerpt,
      status: publish ? "published" as const : newPost.status,
      publishedAt: publish ? new Date().toISOString() : newPost.publishedAt,
    };

    try {
      if (editingPost) {
        updatePost(editingPost.id, postData);
        clearAutosave(editingPost.id);
        toast.success(publish ? "Post published!" : "Post updated!");
      } else {
        createPost(postData);
        clearAutosave("new");
        toast.success(publish ? "Post published!" : "Post created!");
      }
      loadData();
      setView("posts");
    } catch {
      toast.error("Failed to save post");
    }

    setIsSaving(false);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      deletePost(id);
      loadData();
      toast.success("Post deleted");
    }
  };

  const handleDuplicatePost = (id: string) => {
    duplicatePost(id);
    loadData();
    toast.success("Post duplicated");
  };

  const handleTogglePublish = (post: BlogPost) => {
    if (post.status === "published") {
      unpublishPost(post.id);
      toast.success("Post unpublished");
    } else {
      publishPost(post.id);
      toast.success("Post published!");
    }
    loadData();
  };

  const handleToggleFeatured = (post: BlogPost) => {
    updatePost(post.id, { featured: !post.featured }, false);
    loadData();
    toast.success(post.featured ? "Removed from featured" : "Added to featured");
  };

  const handleSchedulePost = () => {
    if (!scheduleDate || !scheduleTime) {
      toast.error("Please select date and time");
      return;
    }
    const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
    if (editingPost) {
      schedulePost(editingPost.id, scheduledAt);
      loadData();
      setView("posts");
      toast.success(`Post scheduled for ${formatDateTime(scheduledAt)}`);
    }
    setShowScheduler(false);
  };

  const handleRestoreRevision = (revisionId: string) => {
    if (confirm("Restore this revision? Current content will be saved as a new revision.")) {
      restoreRevision(revisionId);
      loadData();
      if (editingPost) {
        const updated = getAllPosts().find((p) => p.id === editingPost.id);
        if (updated) handleEditPost(updated);
      }
      toast.success("Revision restored");
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newPost.tags.includes(tagInput.trim())) {
      setNewPost((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setNewPost((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleTitleChange = (title: string) => {
    setNewPost((prev) => ({
      ...prev,
      title,
      slug: editingPost ? prev.slug : generateSlug(title),
    }));
  };

  const handleAddMedia = () => {
    if (!newMediaUrl) return;
    addMedia({
      url: newMediaUrl,
      name: newMediaUrl.split("/").pop() || "image",
      type: "image",
      size: 0,
      alt: newMediaAlt || "Image",
    });
    setNewMediaUrl("");
    setNewMediaAlt("");
    loadData();
    toast.success("Media added");
  };

  const handleSelectMedia = (url: string) => {
    setNewPost((prev) => ({ ...prev, coverImage: url }));
    setShowMediaPicker(false);
    toast.success("Cover image set");
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    createCategory({
      name: newCategoryName,
      slug: generateSlug(newCategoryName),
      description: newCategoryDesc,
    });
    setNewCategoryName("");
    setNewCategoryDesc("");
    loadData();
    toast.success("Category created");
  };

  const handleUpdateCategory = () => {
    if (!editingCategory) return;
    updateCategory(editingCategory.id, {
      name: editingCategory.name,
      slug: generateSlug(editingCategory.name),
      description: editingCategory.description,
    });
    setEditingCategory(null);
    loadData();
    toast.success("Category updated");
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Delete this category?")) {
      deleteCategory(id);
      loadData();
      toast.success("Category deleted");
    }
  };

  // Sidebar Navigation
  const NavItem = ({ icon: Icon, label, viewName, badge }: { icon: any; label: string; viewName: View; badge?: number }) => (
    <button
      onClick={() => setView(viewName)}
      className={cn(
        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left",
        view === viewName || (viewName === "posts" && view === "editor")
          ? "bg-blue text-white shadow-lg"
          : "text-white/70 hover:bg-white/10"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span className="font-medium">{label}</span>
      </div>
      {badge !== undefined && badge > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{badge}</span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-navy to-slate-900 text-white p-6 z-50 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <img src={otterLogo} alt="Otter Cleaning" className="h-12 w-auto" />
          <div>
            <h1 className="font-bold text-xl">Otter CMS</h1>
            <p className="text-xs text-white/60">Content Management</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" viewName="dashboard" />
          <NavItem icon={FileText} label="Posts" viewName="posts" badge={stats?.draftPosts} />
          <NavItem icon={ImageIcon} label="Media Library" viewName="media" />
          <NavItem icon={FolderOpen} label="Categories" viewName="categories" />
          <NavItem icon={Settings} label="Settings" viewName="settings" />
        </nav>

        <div className="space-y-3 pt-6 border-t border-white/10">
          <a
            href="/blog"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
          >
            <Globe className="h-4 w-4" />
            View Live Blog
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 min-h-screen">
        {/* Dashboard */}
        {view === "dashboard" && stats && (
          <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-navy">Dashboard</h2>
                <p className="text-muted-foreground mt-1">Welcome back! Here's your content overview.</p>
              </div>
              <Button variant="blue" size="lg" onClick={handleNewPost}>
                <Plus className="h-5 w-5 mr-2" />
                New Post
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Posts</p>
                    <p className="text-4xl font-bold text-navy">{stats.totalPosts}</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-blue/10 flex items-center justify-center">
                    <FileText className="h-7 w-7 text-blue" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Published</p>
                    <p className="text-4xl font-bold text-green-600">{stats.publishedPosts}</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-7 w-7 text-green-600" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Drafts</p>
                    <p className="text-4xl font-bold text-amber-600">{stats.draftPosts}</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                    <Clock className="h-7 w-7 text-amber-600" />
                  </div>
                </div>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                    <p className="text-4xl font-bold text-blue">{stats.totalViews.toLocaleString()}</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-blue/10 flex items-center justify-center">
                    <TrendingUp className="h-7 w-7 text-blue" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Category Stats */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-navy mb-6">Posts by Category</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                {Object.entries(stats.categoryCounts).map(([name, count]) => (
                  <div key={name} className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <p className="text-2xl font-bold text-navy">{count}</p>
                    <p className="text-sm text-muted-foreground">{name}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Posts */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-navy">Recent Posts</h3>
                <Button variant="ghost" onClick={() => setView("posts")}>
                  View All
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {posts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
                    onClick={() => handleEditPost(post)}
                  >
                    <div className="flex items-center gap-4">
                      {post.coverImage ? (
                        <img src={post.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy">{post.title}</p>
                          {post.featured && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {post.category} • {formatDate(post.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{post.views} views</span>
                      <StatusBadge status={post.status} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Posts List */}
        {view === "posts" && (
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-navy">Posts</h2>
                <p className="text-muted-foreground mt-1">Manage all your blog posts</p>
              </div>
              <Button variant="blue" size="lg" onClick={handleNewPost}>
                <Plus className="h-5 w-5 mr-2" />
                New Post
              </Button>
            </div>

            {/* Filters */}
            <Card className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-11"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 h-11">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48 h-11">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Posts Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-navy">Post</th>
                      <th className="text-left p-4 font-semibold text-navy">Category</th>
                      <th className="text-left p-4 font-semibold text-navy">Status</th>
                      <th className="text-left p-4 font-semibold text-navy">Views</th>
                      <th className="text-left p-4 font-semibold text-navy">Date</th>
                      <th className="text-right p-4 font-semibold text-navy">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {post.coverImage ? (
                              <img src={post.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-slate-400" />
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-navy hover:text-blue cursor-pointer" onClick={() => handleEditPost(post)}>
                                  {post.title}
                                </p>
                                {post.featured && <Star className="h-4 w-4 text-amber-500 fill-amber-500" />}
                              </div>
                              <p className="text-sm text-muted-foreground truncate max-w-xs">{post.excerpt}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{post.category || "—"}</td>
                        <td className="p-4"><StatusBadge status={post.status} /></td>
                        <td className="p-4 text-muted-foreground">{post.views.toLocaleString()}</td>
                        <td className="p-4 text-muted-foreground text-sm">{formatDate(post.updatedAt)}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleToggleFeatured(post)} title={post.featured ? "Unfeature" : "Feature"}>
                              {post.featured ? <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> : <StarOff className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleTogglePublish(post)} title={post.status === "published" ? "Unpublish" : "Publish"}>
                              {post.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)} title="Edit">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDuplicatePost(post.id)} title="Duplicate">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50" title="Delete">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPosts.length === 0 && (
                  <div className="text-center py-16">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-navy mb-2">No posts found</p>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || filterStatus !== "all" || filterCategory !== "all" ? "Try adjusting your filters" : "Create your first blog post"}
                    </p>
                    <Button variant="blue" onClick={handleNewPost}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Editor */}
        {view === "editor" && (
          <div className="flex flex-col h-screen">
            {/* Editor Header */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setView("posts")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <div className="h-6 w-px bg-slate-200" />
                <div>
                  <h2 className="font-semibold text-navy">{editingPost ? "Edit Post" : "New Post"}</h2>
                  {lastSaved && <p className="text-xs text-muted-foreground">Autosaved at {lastSaved.toLocaleTimeString()}</p>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {editingPost && (
                  <Button variant="outline" onClick={() => setShowScheduler(true)}>
                    <CalendarClock className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                )}
                <Button variant="outline" onClick={() => handleSavePost(false)} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="blue" onClick={() => handleSavePost(true)} disabled={isSaving}>
                  {isSaving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Globe className="h-4 w-4 mr-2" />}
                  Publish
                </Button>
              </div>
            </div>

            {/* Editor Tabs */}
            <div className="bg-white border-b px-6">
              <div className="flex gap-1">
                {[
                  { id: "content", label: "Content", icon: FileText },
                  { id: "seo", label: "SEO", icon: Globe },
                  { id: "revisions", label: "Revisions", icon: History },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setEditorTab(tab.id as EditorTab)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2",
                      editorTab === tab.id
                        ? "border-blue text-blue"
                        : "border-transparent text-muted-foreground hover:text-navy"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                    {tab.id === "revisions" && revisions.length > 0 && (
                      <span className="text-xs bg-slate-200 px-1.5 rounded">{revisions.length}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
              <div className="max-w-6xl mx-auto">
                {editorTab === "content" && (
                  <div className="grid lg:grid-cols-[1fr_350px] gap-6">
                    {/* Main Editor */}
                    <div className="space-y-6">
                      <Card className="p-6">
                        <Input
                          value={newPost.title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                          placeholder="Post title..."
                          className="text-2xl font-bold border-none shadow-none px-0 focus-visible:ring-0 h-auto"
                        />
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <span>/blog/</span>
                          <Input
                            value={newPost.slug}
                            onChange={(e) => setNewPost((prev) => ({ ...prev, slug: e.target.value }))}
                            placeholder="post-slug"
                            className="h-8 w-64"
                          />
                        </div>
                      </Card>

                      <Card className="p-6">
                        <Label className="text-sm font-medium text-navy mb-3 block">Excerpt</Label>
                        <Textarea
                          value={newPost.excerpt}
                          onChange={(e) => setNewPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                          placeholder="Brief description of the post..."
                          className="min-h-[80px] resize-none"
                        />
                      </Card>

                      <Card className="p-0 overflow-hidden">
                        <RichTextEditor
                          content={newPost.content}
                          onChange={(html) => setNewPost((prev) => ({ ...prev, content: html }))}
                          placeholder="Start writing your post..."
                        />
                      </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Status */}
                      <Card className="p-5">
                        <h3 className="font-semibold text-navy mb-4">Publish</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Status</Label>
                            <StatusBadge status={newPost.status} />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Featured</Label>
                            <Switch
                              checked={newPost.featured}
                              onCheckedChange={(checked) => setNewPost((prev) => ({ ...prev, featured: checked }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Author</Label>
                            <Input
                              value={newPost.author}
                              onChange={(e) => setNewPost((prev) => ({ ...prev, author: e.target.value }))}
                            />
                          </div>
                        </div>
                      </Card>

                      {/* Cover Image */}
                      <Card className="p-5">
                        <h3 className="font-semibold text-navy mb-4">Cover Image</h3>
                        {newPost.coverImage ? (
                          <div className="relative group">
                            <img src={newPost.coverImage} alt="Cover" className="w-full h-40 object-cover rounded-lg" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                              <Button size="sm" variant="secondary" onClick={() => setShowMediaPicker(true)}>
                                Change
                              </Button>
                              <Button size="sm" variant="secondary" onClick={() => setNewPost((prev) => ({ ...prev, coverImage: "" }))}>
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowMediaPicker(true)}
                            className="w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-blue hover:text-blue transition-colors"
                          >
                            <ImageIcon className="h-8 w-8" />
                            <span className="text-sm font-medium">Add Cover Image</span>
                          </button>
                        )}
                      </Card>

                      {/* Category */}
                      <Card className="p-5">
                        <h3 className="font-semibold text-navy mb-4">Category</h3>
                        <Select
                          value={newPost.category}
                          onValueChange={(v) => setNewPost((prev) => ({ ...prev, category: v }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Card>

                      {/* Tags */}
                      <Card className="p-5">
                        <h3 className="font-semibold text-navy mb-4">Tags</h3>
                        <div className="flex gap-2 mb-3">
                          <Input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            placeholder="Add tag..."
                            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                          />
                          <Button variant="outline" onClick={handleAddTag}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newPost.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue/10 text-blue text-sm">
                              #{tag}
                              <button onClick={() => handleRemoveTag(tag)} className="hover:text-red-500">
                                <X className="h-3 w-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {editorTab === "seo" && (
                  <Card className="p-6 max-w-3xl">
                    <h3 className="text-xl font-semibold text-navy mb-6">SEO Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <Label className="mb-2 block">Meta Title</Label>
                        <Input
                          value={newPost.metaTitle}
                          onChange={(e) => setNewPost((prev) => ({ ...prev, metaTitle: e.target.value }))}
                          placeholder={newPost.title || "SEO title"}
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          {(newPost.metaTitle || newPost.title).length}/60 characters
                        </p>
                      </div>
                      <div>
                        <Label className="mb-2 block">Meta Description</Label>
                        <Textarea
                          value={newPost.metaDescription}
                          onChange={(e) => setNewPost((prev) => ({ ...prev, metaDescription: e.target.value }))}
                          placeholder={newPost.excerpt || "SEO description"}
                          className="min-h-[100px]"
                        />
                        <p className="text-sm text-muted-foreground mt-1">
                          {(newPost.metaDescription || newPost.excerpt).length}/160 characters
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Search Preview</p>
                        <p className="text-blue font-medium">{newPost.metaTitle || newPost.title || "Post Title"}</p>
                        <p className="text-sm text-green-700">ottercleaning.com/blog/{newPost.slug || "post-slug"}</p>
                        <p className="text-sm text-muted-foreground">{newPost.metaDescription || newPost.excerpt || "Post description..."}</p>
                      </div>
                    </div>
                  </Card>
                )}

                {editorTab === "revisions" && (
                  <Card className="p-6 max-w-3xl">
                    <h3 className="text-xl font-semibold text-navy mb-6">Revision History</h3>
                    {revisions.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No revisions yet</p>
                        <p className="text-sm">Revisions are created automatically when you save</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {revisions.map((rev) => (
                          <div key={rev.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-navy">{rev.title}</p>
                                <p className="text-sm text-muted-foreground">{formatDateTime(rev.createdAt)}</p>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => handleRestoreRevision(rev.id)}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Restore
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Media Library */}
        {view === "media" && (
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-navy">Media Library</h2>
                <p className="text-muted-foreground mt-1">Manage your images and files</p>
              </div>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-navy mb-4">Add New Media</h3>
              <div className="flex gap-4">
                <Input
                  placeholder="Image URL..."
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Alt text..."
                  value={newMediaAlt}
                  onChange={(e) => setNewMediaAlt(e.target.value)}
                  className="w-48"
                />
                <Button variant="blue" onClick={handleAddMedia}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {media.map((item) => (
                <Card key={item.id} className="overflow-hidden group">
                  <div className="relative aspect-square">
                    <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" onClick={() => { navigator.clipboard.writeText(item.url); toast.success("URL copied"); }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="text-red-500" onClick={() => { deleteMedia(item.id); loadData(); toast.success("Deleted"); }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(item.size)}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        {view === "categories" && (
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-navy">Categories</h2>
              <p className="text-muted-foreground mt-1">Organize your content</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold text-navy mb-4">{editingCategory ? "Edit Category" : "Add New Category"}</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Name</Label>
                    <Input
                      value={editingCategory ? editingCategory.name : newCategoryName}
                      onChange={(e) => editingCategory
                        ? setEditingCategory({ ...editingCategory, name: e.target.value })
                        : setNewCategoryName(e.target.value)
                      }
                      placeholder="Category name"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Description</Label>
                    <Textarea
                      value={editingCategory ? editingCategory.description : newCategoryDesc}
                      onChange={(e) => editingCategory
                        ? setEditingCategory({ ...editingCategory, description: e.target.value })
                        : setNewCategoryDesc(e.target.value)
                      }
                      placeholder="Category description"
                    />
                  </div>
                  <div className="flex gap-2">
                    {editingCategory ? (
                      <>
                        <Button variant="blue" onClick={handleUpdateCategory}>Update Category</Button>
                        <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
                      </>
                    ) : (
                      <Button variant="blue" onClick={handleCreateCategory}>Add Category</Button>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold text-navy mb-4">All Categories</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-navy">{cat.name}</p>
                        <p className="text-sm text-muted-foreground">{cat.postCount} posts • /{cat.slug}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => setEditingCategory(cat)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDeleteCategory(cat.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Settings */}
        {view === "settings" && (
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-navy">Settings</h2>
              <p className="text-muted-foreground mt-1">Configure your CMS</p>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-navy mb-4">Data Management</h3>
              <p className="text-muted-foreground mb-4">
                All data is stored in your browser's localStorage. Export your data regularly for backup.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => {
                  const data = { posts: getAllPosts(), categories: getAllCategories(), media: getAllMedia() };
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `otter-blog-export-${new Date().toISOString().split("T")[0]}.json`;
                  a.click();
                  toast.success("Data exported");
                }}>
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
                <Button variant="outline" className="text-red-500 hover:text-red-700" onClick={() => {
                  if (confirm("This will delete ALL blog data. Are you sure?")) {
                    localStorage.removeItem("otter_blog_posts");
                    localStorage.removeItem("otter_blog_categories");
                    localStorage.removeItem("otter_blog_media");
                    localStorage.removeItem("otter_blog_revisions");
                    loadData();
                    toast.success("All data cleared");
                  }
                }}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowMediaPicker(false)}>
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-navy">Select Image</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMediaPicker(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {media.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMedia(item.url)}
                    className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-blue transition-colors"
                  >
                    <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduler && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowScheduler(false)}>
          <Card className="w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold text-navy mb-4">Schedule Post</h3>
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Date</Label>
                <Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
              </div>
              <div>
                <Label className="mb-2 block">Time</Label>
                <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Button variant="blue" className="flex-1" onClick={handleSchedulePost}>Schedule</Button>
                <Button variant="outline" onClick={() => setShowScheduler(false)}>Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    published: { icon: CheckCircle, label: "Published", class: "bg-green-100 text-green-700" },
    draft: { icon: Clock, label: "Draft", class: "bg-amber-100 text-amber-700" },
    scheduled: { icon: CalendarClock, label: "Scheduled", class: "bg-blue/10 text-blue" },
  }[status] || { icon: Clock, label: status, class: "bg-slate-100 text-slate-700" };

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium", config.class)}>
      <config.icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}
