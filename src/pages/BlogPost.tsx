import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  BookOpen
} from "lucide-react";
import { getPostBySlug, getPublishedPosts, formatDate, type BlogPost as BlogPostType } from "@/lib/blog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<{id: string; text: string; level: number}[]>([]);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      const foundPost = getPostBySlug(slug);
      setPost(foundPost);

      if (foundPost) {
        const allPosts = getPublishedPosts();
        const related = allPosts
          .filter((p) => p.id !== foundPost.id && p.category === foundPost.category)
          .slice(0, 3);
        setRelatedPosts(related);

        // Extract table of contents
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = foundPost.content;
        const headings = tempDiv.querySelectorAll('h2, h3');
        const toc: {id: string; text: string; level: number}[] = [];
        headings.forEach((heading, index) => {
          const id = `heading-${index}`;
          const text = heading.textContent || '';
          const level = heading.tagName === 'H2' ? 2 : 3;
          toc.push({ id, text, level });
        });
        setTableOfContents(toc);
      }

      setIsLoading(false);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const element = articleRef.current;
        const totalHeight = element.clientHeight - window.innerHeight;
        const windowScrollTop = window.scrollY - element.offsetTop + 200;
        if (windowScrollTop >= 0) {
          const progress = Math.min(Math.max((windowScrollTop / totalHeight) * 100, 0), 100);
          setReadProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header onBookNow={() => navigate("/booking")} />
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-slate-500 mb-8">The article you're looking for doesn't exist.</p>
          <Button variant="blue" onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Add IDs to headings for TOC navigation
  const contentWithIds = post.content.replace(/<(h[23])>/g, (match, tag, offset) => {
    const index = (post.content.substring(0, offset).match(/<h[23]>/g) || []).length;
    return `<${tag} id="heading-${index}">`;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-100 z-50">
        <div
          className="h-full bg-red transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <SEO
        title={post.metaTitle || `${post.title} | Otter Cleaning Blog`}
        description={post.metaDescription || post.excerpt}
        keywords={post.tags.join(", ")}
        canonicalUrl={`/blog/${post.slug}`}
      />
      <Header onBookNow={() => navigate("/booking")} />

      {/* Breadcrumb */}
      <div className="border-b bg-slate-50">
        <div className="container mx-auto py-3 px-4">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-blue transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/blog" className="hover:text-blue transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-700 truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article ref={articleRef}>
        {/* Header */}
        <header className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="inline-block px-4 py-1.5 rounded-full bg-blue text-white text-sm font-medium mb-6 hover:bg-blue/90 transition-colors"
            >
              {post.category}
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-navy flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-slate-700">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatDate(post.publishedAt || post.createdAt)}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="container mx-auto max-w-5xl px-4 -mt-4 mb-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>
        )}

        {/* Content + Sidebar */}
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            {/* Main Content */}
            <div className="min-w-0">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium hover:bg-blue hover:text-white transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Share */}
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">Share this article</p>
                    <p className="text-sm text-slate-500">Help others find this content</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare("twitter")}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button
                      onClick={copyLink}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
                      aria-label="Copy link"
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Author */}
              <div className="mt-8 p-6 bg-navy rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1">Written by</p>
                    <p className="text-white font-bold text-lg mb-2">{post.author}</p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Expert cleaning tips and industry insights from our professional team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="lg:sticky lg:top-8 space-y-6">
                {/* Table of Contents */}
                {tableOfContents.length > 2 && (
                  <Card className="p-6 bg-white border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-blue" />
                      In This Article
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm text-slate-600 hover:text-blue transition-colors ${
                            item.level === 3 ? 'pl-4 text-slate-500' : 'font-medium'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </Card>
                )}

                {/* CTA */}
                <Card className="p-6 bg-gradient-to-br from-blue to-navy text-white border-0 shadow-xl">
                  <div className="text-center">
                    <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Ready to Book?</h3>
                    <p className="text-white/80 text-sm mb-5">
                      Get a spotless home with our professional cleaning services.
                    </p>
                    <Button
                      variant="red"
                      className="w-full font-semibold"
                      onClick={() => navigate("/booking")}
                    >
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-xs text-white/50 mt-3">100% satisfaction guaranteed</p>
                  </div>
                </Card>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <Card className="p-6 bg-white border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            {relatedPost.coverImage && (
                              <img
                                src={relatedPost.coverImage}
                                alt={relatedPost.title}
                                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div>
                              <h4 className="font-medium text-slate-900 text-sm group-hover:text-blue transition-colors line-clamp-2 mb-1">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-slate-500">
                                {formatDate(relatedPost.publishedAt || relatedPost.createdAt)}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Back */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/blog")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Articles
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
