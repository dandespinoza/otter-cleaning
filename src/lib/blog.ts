// Blog post types and localStorage-based storage
// In production, this would connect to a real CMS/API

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  status: "draft" | "published" | "scheduled";
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
  views: number;
}

export interface BlogRevision {
  id: string;
  postId: string;
  title: string;
  content: string;
  excerpt: string;
  createdAt: string;
  authorNote: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "video" | "document";
  size: number;
  createdAt: string;
  alt: string;
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  totalViews: number;
  categoryCounts: Record<string, number>;
}

const BLOG_STORAGE_KEY = "otter_blog_posts";
const CATEGORIES_STORAGE_KEY = "otter_blog_categories";
const REVISIONS_STORAGE_KEY = "otter_blog_revisions";
const MEDIA_STORAGE_KEY = "otter_blog_media";
const AUTOSAVE_KEY = "otter_blog_autosave";

// Default categories
const defaultCategories: BlogCategory[] = [
  { id: "1", name: "Cleaning Tips", slug: "cleaning-tips", description: "Expert cleaning advice and techniques", postCount: 0 },
  { id: "2", name: "Home Organization", slug: "home-organization", description: "Tips for organizing your living space", postCount: 0 },
  { id: "3", name: "Eco-Friendly Living", slug: "eco-friendly-living", description: "Sustainable and green cleaning practices", postCount: 0 },
  { id: "4", name: "Company News", slug: "company-news", description: "Updates and announcements from Otter Cleaning", postCount: 0 },
  { id: "5", name: "Commercial Cleaning", slug: "commercial-cleaning", description: "Business and office cleaning guides", postCount: 0 },
];

// Sample blog posts with rich formatting
const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Spring Cleaning Tips for a Fresh Start",
    slug: "spring-cleaning-tips-fresh-start",
    excerpt: "Get your home ready for spring with these professional cleaning tips from our experts.",
    content: `<p>Spring cleaning isn't just a tradition—it's an opportunity to refresh your living space and create a healthier environment for your family. After months of closed windows and indoor living, your home accumulates dust, allergens, and clutter that can affect your well-being.</p>

<div class="callout callout-info">
<strong>Why Spring Cleaning Matters</strong>
<p>Studies show that a clean home can reduce stress levels by up to 40% and improve sleep quality. Spring is the perfect time to reset your space.</p>
</div>

<h2>Your Complete Spring Cleaning Checklist</h2>

<p>Follow these 10 expert tips to transform your home this season:</p>

<h3>1. Start with a Plan</h3>
<p>Before diving in, create a room-by-room checklist. This helps you stay organized and ensures you don't miss any areas.</p>

<div class="tip-box">
<span class="tip-icon">💡</span>
<div>
<strong>Pro Tip:</strong> Start with the rooms you use most frequently—you'll see immediate results that motivate you to keep going.
</div>
</div>

<h3>2. Declutter First, Clean Second</h3>
<p>Before cleaning, go through each room and remove items you no longer need. Use the <strong>four-box method</strong>:</p>

<ul>
<li><strong>Keep</strong> — Items you use regularly</li>
<li><strong>Donate</strong> — Good condition items others can use</li>
<li><strong>Recycle</strong> — Paper, plastics, and recyclable materials</li>
<li><strong>Trash</strong> — Broken or unusable items</li>
</ul>

<h3>3. Work Top to Bottom</h3>
<p>Always clean from ceiling to floor. This way, any dust or debris that falls will be cleaned up as you work your way down. Start with:</p>

<ol>
<li>Ceiling fans and light fixtures</li>
<li>Crown molding and tops of door frames</li>
<li>Windows and window sills</li>
<li>Furniture surfaces</li>
<li>Baseboards</li>
<li>Floors</li>
</ol>

<h3>4. Don't Forget Hidden Areas</h3>
<p>Pull out furniture to clean behind and underneath. These areas often harbor dust bunnies and allergens that can affect your health.</p>

<div class="callout callout-warning">
<strong>Often Missed Spots</strong>
<p>Behind the refrigerator, under beds, tops of cabinets, behind toilets, and inside light fixtures are the most commonly forgotten areas.</p>
</div>

<h3>5. Deep Clean Your Kitchen</h3>
<p>The kitchen is the heart of the home and deserves extra attention:</p>

<ul>
<li>Empty and clean your refrigerator shelves and drawers</li>
<li>Wipe down cabinet interiors</li>
<li>Degrease your oven and stovetop</li>
<li>Clean the dishwasher (yes, it needs cleaning too!)</li>
<li>Sanitize countertops and backsplash</li>
</ul>

<h3>6. Refresh Your Bedding</h3>
<p>Wash all bedding including mattress pads, pillow covers, and duvet covers. Consider flipping or rotating your mattress for even wear.</p>

<div class="tip-box">
<span class="tip-icon">✨</span>
<div>
<strong>Fresh Tip:</strong> Sprinkle baking soda on your mattress, let it sit for 30 minutes, then vacuum for a fresh, odor-free bed.
</div>
</div>

<h3>7. Clean Windows Inside and Out</h3>
<p>Let the spring sunshine in through sparkling clean windows. Don't forget to wipe down sills and tracks where dirt accumulates.</p>

<h3>8. Tackle the Bathroom</h3>
<p>Give your bathroom a thorough refresh:</p>

<ul>
<li>Scrub grout with a baking soda paste</li>
<li>Descale faucets and showerheads with vinegar</li>
<li>Organize your medicine cabinet</li>
<li>Throw away expired products</li>
<li>Wash shower curtains and bath mats</li>
</ul>

<h3>9. Use Eco-Friendly Products</h3>
<p>At Otter Cleaning, we use <strong>100% organic products</strong> that are safe for your family and pets while being effective against dirt and germs.</p>

<div class="callout callout-success">
<strong>Our Green Promise</strong>
<p>All our cleaning products are plant-based, biodegradable, and free from harsh chemicals. Better for your home, better for the planet.</p>
</div>

<h3>10. Consider Professional Help</h3>
<p>For a truly thorough spring clean, our professional team can handle the heavy lifting while you enjoy the beautiful weather.</p>

<div class="cta-box">
<h4>Ready for a Spotless Home?</h4>
<p>Book your spring cleaning with Otter Cleaning and enjoy a fresh start without the stress.</p>
</div>`,
    coverImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
    category: "Cleaning Tips",
    tags: ["spring cleaning", "home cleaning", "organization"],
    author: "Otter Cleaning Team",
    status: "published",
    publishedAt: "2024-03-15T10:00:00Z",
    scheduledAt: null,
    createdAt: "2024-03-14T09:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    metaTitle: "10 Spring Cleaning Tips for a Fresh Start | Otter Cleaning",
    metaDescription: "Professional spring cleaning tips from Otter Cleaning. Learn how to refresh your home with our expert guide to deep cleaning every room.",
    featured: true,
    views: 1247,
  },
  {
    id: "2",
    title: "The Benefits of Organic Cleaning Products",
    slug: "benefits-organic-cleaning-products",
    excerpt: "Discover why we exclusively use organic, eco-friendly cleaning products and how they benefit your home and health.",
    content: `<p>At Otter Cleaning, we've been committed to using 100% organic cleaning products since 2009. Here's why this matters for you and your family.</p>

<div class="callout callout-info">
<strong>Our Commitment</strong>
<p>Every product we use is certified organic, cruelty-free, and tested for effectiveness. We never compromise on quality or safety.</p>
</div>

<h2>Why Go Organic?</h2>

<p>Traditional cleaning products often contain harsh chemicals that can cause health problems. Making the switch to organic isn't just a trend—it's a smart choice for your family's wellbeing.</p>

<h3>Better for Your Health</h3>

<p>Conventional cleaners often contain ingredients linked to:</p>

<ul>
<li><strong>Respiratory issues</strong> — Ammonia and bleach fumes irritate airways</li>
<li><strong>Skin irritation</strong> — Harsh detergents strip natural oils</li>
<li><strong>Hormone disruption</strong> — Phthalates and parabens affect endocrine function</li>
<li><strong>Allergic reactions</strong> — Synthetic fragrances trigger sensitivities</li>
</ul>

<div class="tip-box">
<span class="tip-icon">🌿</span>
<div>
<strong>Did You Know?</strong> The EPA estimates that indoor air can be 2-5 times more polluted than outdoor air, largely due to cleaning products.
</div>
</div>

<h3>Safe for Children and Pets</h3>

<p>Children and pets spend a lot of time on floors and surfaces. They're more vulnerable to chemical exposure because:</p>

<ol>
<li>Their bodies are still developing</li>
<li>They have higher respiration rates relative to body size</li>
<li>They frequently put hands (or paws) in their mouths</li>
<li>They're closer to the ground where residues settle</li>
</ol>

<div class="callout callout-success">
<strong>Peace of Mind</strong>
<p>Organic products don't leave harmful residues, making your home safer for the smallest members of your family.</p>
</div>

<h3>Environmentally Responsible</h3>

<p>Conventional cleaning chemicals don't just affect your home—they impact our planet:</p>

<ul>
<li>Pollute waterways when washed down drains</li>
<li>Harm aquatic ecosystems</li>
<li>Contribute to air pollution during manufacturing</li>
<li>Create toxic waste in landfills</li>
</ul>

<p>Our eco-friendly products break down naturally and don't contribute to environmental pollution.</p>

<h3>Just as Effective</h3>

<p>Modern organic cleaning products are just as powerful as their chemical counterparts. We've tested hundreds of products to find the most effective options that also meet our strict environmental standards.</p>

<div class="feature-grid">
<div class="feature-item">
<span class="feature-icon">🧪</span>
<strong>Lab Tested</strong>
<p>Every product undergoes rigorous effectiveness testing</p>
</div>
<div class="feature-item">
<span class="feature-icon">🌱</span>
<strong>Plant-Based</strong>
<p>Derived from natural, renewable ingredients</p>
</div>
<div class="feature-item">
<span class="feature-icon">🐰</span>
<strong>Cruelty-Free</strong>
<p>Never tested on animals</p>
</div>
<div class="feature-item">
<span class="feature-icon">♻️</span>
<strong>Biodegradable</strong>
<p>Breaks down safely in the environment</p>
</div>
</div>

<h3>Better Indoor Air Quality</h3>

<p>Chemical cleaning products release volatile organic compounds (VOCs) that can linger in your home for hours or days. Organic products improve indoor air quality, which is especially important during winter when windows stay closed.</p>

<div class="cta-box">
<h4>Experience the Difference</h4>
<p>Book a cleaning with Otter Cleaning and enjoy a spotless home without the chemical smell.</p>
</div>`,
    coverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200",
    category: "Eco-Friendly Living",
    tags: ["organic", "eco-friendly", "health", "green cleaning"],
    author: "Otter Cleaning Team",
    status: "published",
    publishedAt: "2024-02-20T10:00:00Z",
    scheduledAt: null,
    createdAt: "2024-02-19T14:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
    metaTitle: "Benefits of Organic Cleaning Products | Otter Cleaning",
    metaDescription: "Learn why Otter Cleaning uses 100% organic products and how eco-friendly cleaning benefits your health, family, and the environment.",
    featured: false,
    views: 892,
  },
  {
    id: "3",
    title: "How to Prepare Your Home for Professional Cleaning",
    slug: "prepare-home-professional-cleaning",
    excerpt: "Make the most of your professional cleaning appointment with these simple preparation tips.",
    content: `<p>To ensure our team can provide the most thorough clean possible, a little preparation goes a long way. Here's how to get your home ready for maximum results.</p>

<div class="callout callout-info">
<strong>Quick Summary</strong>
<p>The key to a successful cleaning appointment: declutter surfaces, secure valuables, communicate your priorities, and ensure our team has full access.</p>
</div>

<h2>Before Your Appointment</h2>

<h3>1. Declutter Common Areas</h3>

<p>Pick up toys, clothes, and personal items from floors and surfaces. This allows our cleaners to focus on actual cleaning rather than organizing.</p>

<div class="checklist">
<h4>Quick Declutter Checklist</h4>
<ul>
<li>Pick up clothes from floors and furniture</li>
<li>Put away toys and games</li>
<li>Clear dining table of mail and papers</li>
<li>Remove items from coffee tables</li>
<li>Tidy shoe areas by entrances</li>
</ul>
</div>

<h3>2. Secure Valuables</h3>

<p>While our team members are thoroughly vetted, bonded, and insured, we recommend securing certain items for your peace of mind:</p>

<ul>
<li><strong>Jewelry</strong> — Place in a locked drawer or safe</li>
<li><strong>Cash</strong> — Store in a secure location</li>
<li><strong>Important documents</strong> — File away sensitive paperwork</li>
<li><strong>Prescription medications</strong> — Keep in a medicine cabinet</li>
</ul>

<div class="tip-box">
<span class="tip-icon">🔐</span>
<div>
<strong>Trust & Transparency:</strong> All Otter Cleaning team members pass comprehensive background checks and are fully bonded and insured.
</div>
</div>

<h3>3. Clear Countertops</h3>

<p>Move small appliances and items off kitchen and bathroom counters so we can properly sanitize these surfaces.</p>

<div class="feature-grid">
<div class="feature-item">
<span class="feature-icon">🍳</span>
<strong>Kitchen</strong>
<p>Move small appliances, dish racks, fruit bowls</p>
</div>
<div class="feature-item">
<span class="feature-icon">🛁</span>
<strong>Bathroom</strong>
<p>Clear toiletries, toothbrushes, cosmetics</p>
</div>
</div>

<h3>4. Communicate Special Requests</h3>

<p>Let us know about any areas that need extra attention, spots to avoid, or specific products you prefer us to use.</p>

<div class="callout callout-warning">
<strong>Things to Tell Us</strong>
<p>Allergies to certain products, areas with delicate items, rooms that need extra attention, or any surfaces requiring special care.</p>
</div>

<h3>5. Arrange for Pets</h3>

<p>We love animals! But it helps to keep pets in a separate area during cleaning:</p>

<ul>
<li>Reduces their stress from unfamiliar people</li>
<li>Prevents escape through open doors</li>
<li>Allows us to work more efficiently</li>
<li>Keeps pets safe from wet floors and cleaning solutions</li>
</ul>

<h3>6. Provide Access</h3>

<p>If you won't be home, arrange for key access or leave instructions for any smart locks. Make sure we can reach all areas you want cleaned.</p>

<div class="checklist">
<h4>Access Options</h4>
<ul>
<li>Be home to let us in</li>
<li>Leave a key in a secure location</li>
<li>Provide smart lock code</li>
<li>Leave with building concierge</li>
<li>Set up recurring access</li>
</ul>
</div>

<div class="cta-box">
<h4>Ready to Book?</h4>
<p>Schedule your professional cleaning in under 60 seconds. We'll handle the rest!</p>
</div>`,
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    category: "Cleaning Tips",
    tags: ["professional cleaning", "preparation", "tips"],
    author: "Otter Cleaning Team",
    status: "published",
    publishedAt: "2024-01-10T10:00:00Z",
    scheduledAt: null,
    createdAt: "2024-01-09T11:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    metaTitle: "How to Prepare for Professional Cleaning | Otter Cleaning",
    metaDescription: "Simple tips to prepare your home for professional cleaning. Get the most out of your Otter Cleaning appointment with these preparation steps.",
    featured: false,
    views: 654,
  },
];

// Sample media
const sampleMedia: MediaItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
    name: "clean-living-room.jpg",
    type: "image",
    size: 245000,
    createdAt: "2024-01-15T10:00:00Z",
    alt: "Clean living room",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200",
    name: "eco-cleaning-products.jpg",
    type: "image",
    size: 198000,
    createdAt: "2024-02-10T10:00:00Z",
    alt: "Eco-friendly cleaning products",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
    name: "tidy-bedroom.jpg",
    type: "image",
    size: 312000,
    createdAt: "2024-03-05T10:00:00Z",
    alt: "Tidy bedroom",
  },
];

// Initialize storage
function initializeStorage() {
  if (!localStorage.getItem(BLOG_STORAGE_KEY)) {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(samplePosts));
  }
  if (!localStorage.getItem(CATEGORIES_STORAGE_KEY)) {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(defaultCategories));
  }
  if (!localStorage.getItem(REVISIONS_STORAGE_KEY)) {
    localStorage.setItem(REVISIONS_STORAGE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(MEDIA_STORAGE_KEY)) {
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(sampleMedia));
  }
}

// Blog Post CRUD
export function getAllPosts(): BlogPost[] {
  initializeStorage();
  const posts = localStorage.getItem(BLOG_STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts()
    .filter((post) => post.status === "published")
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());
}

export function getFeaturedPosts(): BlogPost[] {
  return getPublishedPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getPostById(id: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((post) => post.id === id) || null;
}

export function createPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "views">): BlogPost {
  const posts = getAllPosts();
  const newPost: BlogPost = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    views: 0,
  };
  posts.push(newPost);
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  updateCategoryCount();
  return newPost;
}

export function updatePost(id: string, updates: Partial<BlogPost>, createRevision = true): BlogPost | null {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return null;

  // Create revision before updating
  if (createRevision) {
    const oldPost = posts[index];
    saveRevision(id, oldPost.title, oldPost.content, oldPost.excerpt, "Auto-saved revision");
  }

  posts[index] = {
    ...posts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  updateCategoryCount();
  return posts[index];
}

export function deletePost(id: string): boolean {
  const posts = getAllPosts();
  const filtered = posts.filter((post) => post.id !== id);
  if (filtered.length === posts.length) return false;
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(filtered));
  // Also delete revisions
  const revisions = getRevisions(id);
  revisions.forEach((r) => deleteRevision(r.id));
  updateCategoryCount();
  return true;
}

export function duplicatePost(id: string): BlogPost | null {
  const post = getPostById(id);
  if (!post) return null;

  return createPost({
    ...post,
    title: `${post.title} (Copy)`,
    slug: `${post.slug}-copy-${Date.now()}`,
    status: "draft",
    publishedAt: null,
    scheduledAt: null,
    featured: false,
  });
}

export function publishPost(id: string): BlogPost | null {
  return updatePost(id, {
    status: "published",
    publishedAt: new Date().toISOString(),
    scheduledAt: null,
  }, false);
}

export function unpublishPost(id: string): BlogPost | null {
  return updatePost(id, {
    status: "draft",
    publishedAt: null,
  }, false);
}

export function schedulePost(id: string, scheduledAt: string): BlogPost | null {
  return updatePost(id, {
    status: "scheduled",
    scheduledAt,
    publishedAt: null,
  }, false);
}

export function incrementViews(id: string): void {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts[index].views = (posts[index].views || 0) + 1;
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  }
}

// Category operations
export function getAllCategories(): BlogCategory[] {
  initializeStorage();
  const categories = localStorage.getItem(CATEGORIES_STORAGE_KEY);
  return categories ? JSON.parse(categories) : [];
}

export function createCategory(category: Omit<BlogCategory, "id" | "postCount">): BlogCategory {
  const categories = getAllCategories();
  const newCategory: BlogCategory = {
    ...category,
    id: Date.now().toString(),
    postCount: 0,
  };
  categories.push(newCategory);
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  return newCategory;
}

export function updateCategory(id: string, updates: Partial<BlogCategory>): BlogCategory | null {
  const categories = getAllCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...updates };
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  return categories[index];
}

export function deleteCategory(id: string): boolean {
  const categories = getAllCategories();
  const filtered = categories.filter((c) => c.id !== id);
  if (filtered.length === categories.length) return false;
  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

function updateCategoryCount(): void {
  const posts = getAllPosts();
  const categories = getAllCategories();

  categories.forEach((cat) => {
    cat.postCount = posts.filter((p) => p.category === cat.name).length;
  });

  localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  const category = getAllCategories().find((c) => c.slug === categorySlug);
  if (!category) return [];
  return getPublishedPosts().filter((post) => post.category === category.name);
}

// Revision operations
export function getRevisions(postId: string): BlogRevision[] {
  const revisions = localStorage.getItem(REVISIONS_STORAGE_KEY);
  const all: BlogRevision[] = revisions ? JSON.parse(revisions) : [];
  return all.filter((r) => r.postId === postId).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function saveRevision(postId: string, title: string, content: string, excerpt: string, authorNote: string): BlogRevision {
  const revisions = localStorage.getItem(REVISIONS_STORAGE_KEY);
  const all: BlogRevision[] = revisions ? JSON.parse(revisions) : [];

  const newRevision: BlogRevision = {
    id: Date.now().toString(),
    postId,
    title,
    content,
    excerpt,
    createdAt: new Date().toISOString(),
    authorNote,
  };

  all.push(newRevision);

  // Keep only last 20 revisions per post
  const postRevisions = all.filter((r) => r.postId === postId);
  if (postRevisions.length > 20) {
    const oldestToRemove = postRevisions.slice(0, postRevisions.length - 20);
    oldestToRemove.forEach((r) => {
      const idx = all.findIndex((rev) => rev.id === r.id);
      if (idx !== -1) all.splice(idx, 1);
    });
  }

  localStorage.setItem(REVISIONS_STORAGE_KEY, JSON.stringify(all));
  return newRevision;
}

export function restoreRevision(revisionId: string): BlogPost | null {
  const revisions = localStorage.getItem(REVISIONS_STORAGE_KEY);
  const all: BlogRevision[] = revisions ? JSON.parse(revisions) : [];
  const revision = all.find((r) => r.id === revisionId);

  if (!revision) return null;

  return updatePost(revision.postId, {
    title: revision.title,
    content: revision.content,
    excerpt: revision.excerpt,
  }, true);
}

export function deleteRevision(id: string): boolean {
  const revisions = localStorage.getItem(REVISIONS_STORAGE_KEY);
  const all: BlogRevision[] = revisions ? JSON.parse(revisions) : [];
  const filtered = all.filter((r) => r.id !== id);
  if (filtered.length === all.length) return false;
  localStorage.setItem(REVISIONS_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

// Media operations
export function getAllMedia(): MediaItem[] {
  initializeStorage();
  const media = localStorage.getItem(MEDIA_STORAGE_KEY);
  return media ? JSON.parse(media) : [];
}

export function addMedia(item: Omit<MediaItem, "id" | "createdAt">): MediaItem {
  const media = getAllMedia();
  const newItem: MediaItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  media.push(newItem);
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(media));
  return newItem;
}

export function deleteMedia(id: string): boolean {
  const media = getAllMedia();
  const filtered = media.filter((m) => m.id !== id);
  if (filtered.length === media.length) return false;
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function updateMedia(id: string, updates: Partial<MediaItem>): MediaItem | null {
  const media = getAllMedia();
  const index = media.findIndex((m) => m.id === id);
  if (index === -1) return null;
  media[index] = { ...media[index], ...updates };
  localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(media));
  return media[index];
}

// Autosave
export function getAutosave(postId: string): Partial<BlogPost> | null {
  const autosaves = localStorage.getItem(AUTOSAVE_KEY);
  const all: Record<string, Partial<BlogPost>> = autosaves ? JSON.parse(autosaves) : {};
  return all[postId] || null;
}

export function setAutosave(postId: string, data: Partial<BlogPost>): void {
  const autosaves = localStorage.getItem(AUTOSAVE_KEY);
  const all: Record<string, Partial<BlogPost>> = autosaves ? JSON.parse(autosaves) : {};
  all[postId] = { ...data, updatedAt: new Date().toISOString() };
  localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(all));
}

export function clearAutosave(postId: string): void {
  const autosaves = localStorage.getItem(AUTOSAVE_KEY);
  const all: Record<string, Partial<BlogPost>> = autosaves ? JSON.parse(autosaves) : {};
  delete all[postId];
  localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(all));
}

// Stats
export function getBlogStats(): BlogStats {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const categoryCounts: Record<string, number> = {};
  categories.forEach((cat) => {
    categoryCounts[cat.name] = posts.filter((p) => p.category === cat.name && p.status === "published").length;
  });

  return {
    totalPosts: posts.length,
    publishedPosts: posts.filter((p) => p.status === "published").length,
    draftPosts: posts.filter((p) => p.status === "draft").length,
    scheduledPosts: posts.filter((p) => p.status === "scheduled").length,
    totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0),
    categoryCounts,
  };
}

// Utility functions
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// Check scheduled posts and publish them
export function checkScheduledPosts(): void {
  const posts = getAllPosts();
  const now = new Date();

  posts.forEach((post) => {
    if (post.status === "scheduled" && post.scheduledAt) {
      const scheduledDate = new Date(post.scheduledAt);
      if (scheduledDate <= now) {
        publishPost(post.id);
      }
    }
  });
}
