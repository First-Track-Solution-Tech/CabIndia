import React, { useState, useMemo } from "react";
import { Search, Clock, ArrowRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "5 Tips to Save Money on Daily Commute",
    date: "July 15, 2025",
    category: "Travel",
    readTime: "4 min read",
    image: "/images/blog-1.jpg",
    summary:
      "Looking to cut down travel costs? Here are 5 actionable tips to help you save money while using ride-sharing services daily.",
    featured: true,
  },
  {
    id: 2,
    title: "How Technology is Changing Urban Transport",
    date: "July 10, 2025",
    category: "Tech",
    readTime: "6 min read",
    image: "/images/blog-2.jpg",
    summary:
      "From AI to electric vehicles, discover how modern tech is transforming the way we commute in cities.",
    featured: false,
  },
  {
    id: 3,
    title: "Top 3 Benefits of Using Bike Taxis",
    date: "July 3, 2025",
    category: "Travel",
    readTime: "3 min read",
    image: "/images/blog-3.jpg",
    summary:
      "Explore the key benefits of choosing a bike taxi for short trips — it's fast, affordable, and eco-friendly!",
    featured: false,
  },
  {
    id: 4,
    title: "Safety First: What CabIndia Does Differently",
    date: "June 28, 2025",
    category: "Safety",
    readTime: "5 min read",
    image: "/images/blog-4.jpg",
    summary:
      "Learn how CabIndia's verification process, live tracking, and SOS features keep every passenger safe on every ride.",
    featured: false,
  },

];

const CATEGORIES = ["All", "Travel", "Tech", "Safety"];

const categoryColors = {
  Travel: "bg-yellow-400/15 text-yellow-400 border-yellow-400/25",
  Tech:   "bg-blue-500/15 text-blue-400 border-blue-500/25",
  Safety: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

export default function Blog() {
  const navigate = useNavigate();
  const [search, setSearch]     = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat   = activeTab === "All" || p.category === activeTab;
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.summary.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeTab]);

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest      = filtered.filter((p) => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Hero / Header ── */}
      <div className="relative bg-gray-950 pt-14 pb-10 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.06)_0%,transparent_65%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-yellow-400 text-xs font-bold tracking-[0.22em] uppercase mb-4">
            <span className="w-6 h-px bg-yellow-400" />
            CabIndia Journal
            <span className="w-6 h-px bg-yellow-400" />
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Stories, Tips &{" "}
            <span className="text-yellow-400 italic">Insights</span>
          </h1>
          <p className="mt-3 text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            From smarter commuting to the latest in urban mobility — stay informed with CabIndia's blog.
          </p>
        </div>
      </div>

      {/* ── Search + Filter bar ── */}
      <div className="sticky top-0 z-30 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/60 px-4 sm:px-8 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/20 transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={[
                  "px-4 py-2 rounded-xl text-xs font-bold tracking-wide border transition-all duration-200",
                  activeTab === cat
                    ? "bg-yellow-400 text-gray-950 border-yellow-400 shadow-[0_2px_12px_rgba(250,204,21,0.3)]"
                    : "bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-gray-300",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-700">
              <Search size={22} />
            </div>
            <p className="text-gray-500 text-sm">No articles found for <span className="text-yellow-400">"{search}"</span></p>
            <button
              onClick={() => { setSearch(""); setActiveTab("All"); }}
              className="text-xs text-gray-600 underline underline-offset-4 hover:text-gray-400 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* ── Featured Post ── */}
            {featured && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-px bg-yellow-400" />
                  <span className="text-yellow-400 text-[10px] font-bold tracking-[0.2em] uppercase">Featured</span>
                </div>

                <div
                  onClick={() => navigate(`/blog/${featured.id}`)}
                  className="group cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-0 bg-gray-900 border border-gray-800 hover:border-yellow-400/30 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(250,204,21,0.08)]"
                >
                  {/* image */}
                  <div className="relative h-56 md:h-auto overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.parentElement.style.background = "#111827";
                        e.target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/40" />
                    <span className={`absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full border ${categoryColors[featured.category] || ""}`}>
                      {featured.category}
                    </span>
                  </div>

                  {/* text */}
                  <div className="flex flex-col justify-center p-7 md:p-9 gap-4">
                    <div className="flex items-center gap-3 text-gray-600 text-xs">
                      <span>{featured.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-700" />
                      <Clock size={11} />
                      <span>{featured.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {featured.summary}
                    </p>
                    <div className="flex items-center gap-2 text-yellow-400 text-sm font-bold mt-1 group-hover:gap-3 transition-all duration-200">
                      Read More <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Rest of Posts Grid ── */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-px bg-gray-700" />
                  <span className="text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase">More Articles</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => navigate(`/blog/${post.id}`)}
                      className="group cursor-pointer bg-gray-900 border border-gray-800 hover:border-yellow-400/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(250,204,21,0.07)] flex flex-col"
                    >
                      {/* image */}
                      <div className="relative h-44 overflow-hidden flex-shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.parentElement.style.background = "#111827";
                            e.target.style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full border ${categoryColors[post.category] || ""}`}>
                          {post.category}
                        </span>
                      </div>

                      {/* text */}
                      <div className="flex flex-col gap-2.5 p-4 flex-1">
                        <div className="flex items-center gap-2 text-gray-700 text-[11px]">
                          <span>{post.date}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-800" />
                          <Clock size={10} />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-base font-black tracking-tight leading-snug text-white group-hover:text-yellow-400 transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 flex-1">
                          {post.summary}
                        </p>
                        <div className="flex items-center gap-1.5 text-yellow-400 text-xs font-bold mt-1 pt-2 border-t border-gray-800 group-hover:gap-2.5 transition-all duration-200">
                          Read More <ArrowRight size={12} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}