import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { getPublishedPosts, getAllCategories, formatDate, type BlogPost, type BlogCategory } from "@/lib/blog";
import { cn } from "@/lib/utils";

export default function Blog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setPosts(getPublishedPosts());
    setCategories(getAllCategories());
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Cleaning Tips & Home Care Blog"
        description="Expert cleaning tips, home organization advice, and eco-friendly living guides from Otter Cleaning. Learn professional cleaning techniques for your home."
        keywords="cleaning tips blog, home cleaning advice, eco-friendly cleaning, professional cleaning tips, home organization, green cleaning"
        canonicalUrl="/blog"
      />
      <Header onBookNow={() => navigate("/booking")} />

      {/* Hero */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto text-center">
          <p className="text-blue font-medium mb-3 text-lg">Our Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Cleaning Tips & Insights</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert advice on keeping your home spotless, organized, and eco-friendly.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  selectedCategory === "all"
                    ? "bg-blue text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                All Posts
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === cat.name
                      ? "bg-blue text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No posts found</p>
              <Button variant="outline" onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-16">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Card className="overflow-hidden hover:shadow-card-hover transition-shadow">
                      <div className="grid md:grid-cols-2 gap-0">
                        {featuredPost.coverImage && (
                          <div className="aspect-video md:aspect-auto">
                            <img
                              src={featuredPost.coverImage}
                              alt={featuredPost.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 rounded-full bg-blue/10 text-blue text-sm font-medium">
                              {featuredPost.category}
                            </span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                            </span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4 hover:text-blue transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {featuredPost.excerpt}
                          </p>
                          <div className="flex items-center text-blue font-medium">
                            Read Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              )}

              {/* Other Posts Grid */}
              {otherPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`}>
                      <Card className="overflow-hidden h-full hover:shadow-card-hover transition-shadow group">
                        {post.coverImage && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-2.5 py-1 rounded-full bg-blue/10 text-blue text-xs font-medium">
                              {post.category}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(post.publishedAt || post.createdAt)}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-navy mb-3 group-hover:text-blue transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-blue text-sm font-medium">
                            Read More
                            <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready for a Spotless Home?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Let our professional team handle the cleaning while you enjoy more free time.
          </p>
          <Button variant="red" size="lg" onClick={() => navigate("/booking")}>
            Book Your Cleaning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
