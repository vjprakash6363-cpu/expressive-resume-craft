import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RESUME_TEMPLATES } from "@/lib/resumeUtils";
import { Search, Filter, Star } from "lucide-react";
import { useState } from "react";
import { FileText } from "lucide-react";

const INDUSTRIES = ["All", "Tech", "Business", "Design", "Healthcare", "Finance", "Education", "Data", "Product", "Engineering", "Marketing", "Legal", "Media", "Science"];

export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filtered = RESUME_TEMPLATES.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.industry.toLowerCase().includes(search.toLowerCase());
    const matchIndustry = activeIndustry === "All" || t.industry === activeIndustry;
    return matchSearch && matchIndustry;
  });

  return (
    <div className="min-h-screen mesh-bg">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-syne font-bold text-sm tracking-wide text-foreground">
              INTERACTIVE <span className="text-gradient-violet">RESUME BUILDER</span>
            </span>
          </Link>
          <Link to="/builder" className="px-4 py-2 rounded-lg bg-gradient-violet text-white text-sm font-semibold hover:opacity-90 transition-opacity">
            Start Building
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-syne text-5xl font-bold mb-4">
            <span className="text-gradient-hero">30+ Professional</span> Templates
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry-specific, ATS-optimized designs crafted by professional recruiters and designers.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass border border-border bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Filter className="w-4 h-4" />
            <span>{filtered.length} templates</span>
          </div>
        </div>

        {/* Industry Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {INDUSTRIES.map(industry => (
            <button
              key={industry}
              onClick={() => setActiveIndustry(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeIndustry === industry
                  ? "bg-gradient-violet text-white glow-violet"
                  : "glass border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filtered.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="group"
            >
              <Link to={`/builder?template=${template.id}`}>
                <div className="relative rounded-2xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all hover:scale-105 hover:shadow-xl cursor-pointer">
                  {/* Template preview mockup */}
                  <div
                    className="aspect-[3/4] p-3 flex flex-col gap-2"
                    style={{ background: `linear-gradient(145deg, ${template.color}15, ${template.color}08)` }}
                  >
                    <div className="bg-white rounded-lg h-full p-2.5 flex flex-col gap-1.5 shadow-sm">
                      {/* Header bar */}
                      <div className="flex items-center gap-1.5 pb-1.5 border-b-2" style={{ borderColor: template.color }}>
                        <div className="w-6 h-6 rounded-full" style={{ backgroundColor: template.color }} />
                        <div className="flex-1 space-y-0.5">
                          <div className="h-1.5 rounded w-3/4" style={{ backgroundColor: template.color }} />
                          <div className="h-1 rounded w-1/2 bg-gray-200" />
                        </div>
                      </div>
                      {/* Contact row */}
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="h-1 rounded bg-gray-200 flex-1" />
                        ))}
                      </div>
                      {/* Section header */}
                      <div className="h-1.5 rounded w-1/3 mt-0.5" style={{ backgroundColor: `${template.color}88` }} />
                      {/* Lines */}
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="flex gap-1">
                          <div className="h-1 rounded bg-gray-300 w-1/4" />
                          <div className="h-1 rounded bg-gray-100 flex-1" />
                        </div>
                      ))}
                      <div className="h-1.5 rounded w-1/3 mt-0.5" style={{ backgroundColor: `${template.color}88` }} />
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-1 rounded bg-gray-100 w-full" />
                      ))}
                      {/* Skills section */}
                      <div className="flex flex-wrap gap-0.5 mt-0.5">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-2 w-6 rounded-full" style={{ backgroundColor: `${template.color}33` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Popular badge */}
                  {template.popular && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: template.color }}>
                      <Star className="w-2.5 h-2.5 fill-current" /> Popular
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center gap-3 rounded-2xl" style={{ background: `${template.color}dd` }}>
                    <span className="text-white font-bold text-sm">Use Template</span>
                    <div className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs">Click to select</div>
                  </div>
                </div>

                <div className="mt-3 px-1">
                  <div className="font-semibold text-foreground text-sm">{template.name}</div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-muted-foreground text-xs">{template.industry}</span>
                    <div className="flex items-center gap-0.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: template.color }} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
