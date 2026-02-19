import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { FileText, Zap, Star, Users, ChevronRight, Sparkles, Target, Download, Palette, BarChart3, Brain, Lock, Globe } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Writing", desc: "Let AI craft compelling summaries and bullet points tailored to your industry.", color: "violet" },
  { icon: Target, title: "Real-Time ATS Score", desc: "Instant feedback on keyword optimization, formatting, and ATS compatibility.", color: "coral" },
  { icon: Palette, title: "30+ Pro Templates", desc: "Industry-specific templates designed by HR professionals and recruiters.", color: "teal" },
  { icon: Download, title: "Multi-Format Export", desc: "Download as PDF, Word, or plain text. Print-ready and ATS-friendly formats.", color: "gold" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track your resume views, downloads, and application success rates.", color: "violet" },
  { icon: Globe, title: "LinkedIn Import", desc: "Import your LinkedIn profile data in one click to auto-fill your resume.", color: "teal" },
  { icon: Lock, title: "Secure & Private", desc: "Bank-level encryption for your data. GDPR compliant. Your data stays yours.", color: "coral" },
  { icon: Users, title: "Collaboration Tools", desc: "Get feedback from mentors and career coaches directly in the builder.", color: "gold" },
];

const stats = [
  { value: "2.4M+", label: "Resumes Created" },
  { value: "94%", label: "Interview Rate" },
  { value: "30+", label: "Templates" },
  { value: "4.9★", label: "User Rating" },
];

const testimonials = [
  { name: "Sarah Chen", role: "Software Engineer @ Google", text: "Got 3 interviews in the first week after using IRB. The ATS score feature is a game-changer!", avatar: "SC" },
  { name: "Marcus Thompson", role: "Product Manager @ Meta", text: "The AI summary generator saved me hours. My resume went from bland to brilliant instantly.", avatar: "MT" },
  { name: "Priya Patel", role: "Data Scientist @ Netflix", text: "Best resume builder I've used. The templates are stunning and the export quality is flawless.", avatar: "PP" },
];

const colorMap: Record<string, string> = {
  violet: "from-primary to-primary/50",
  coral: "from-coral to-coral/50",
  teal: "from-teal to-teal/50",
  gold: "from-gold to-gold/50",
};

const glowMap: Record<string, string> = {
  violet: "glow-violet",
  coral: "glow-coral",
  teal: "glow-teal",
  gold: "glow-violet",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen mesh-bg overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-syne font-bold text-sm tracking-wide text-foreground">
              INTERACTIVE <span className="text-gradient-violet">RESUME BUILDER</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Reviews</a>
            <Link to="/templates" className="hover:text-foreground transition-colors">Browse Templates</Link>
          </div>
          <Link
            to="/builder"
            className="px-4 py-2 rounded-lg bg-gradient-violet text-white text-sm font-semibold hover:opacity-90 transition-opacity glow-violet"
          >
            Build My Resume
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroBg} alt="Hero background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-32 left-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 w-80 h-80 rounded-full bg-teal/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-coral/8 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm text-primary mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered • ATS-Optimized • 30+ Templates</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-syne text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          >
            <span className="text-foreground">Build Resumes</span>
            <br />
            <span className="text-gradient-hero">That Get Hired</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Craft stunning, ATS-optimized resumes with AI assistance, real-time scoring, and 30+ industry-specific templates. Land interviews 3x faster.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/builder"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-violet text-white font-bold text-lg glow-violet hover:scale-105 transition-transform"
            >
              <Zap className="w-5 h-5" />
              Start Building — Free
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/templates"
              className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-border hover:border-primary/50 text-foreground font-semibold text-lg transition-all hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              Browse Templates
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-4 border border-border/50">
                <div className="font-syne text-3xl font-bold text-gradient-hero">{stat.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50 text-xs">
          <span>Scroll to explore</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm mb-4">Everything You Need</div>
            <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">
              Powerful Features for <span className="text-gradient-violet">Career Success</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From AI writing assistance to real-time ATS scoring — every tool you need to land your dream job.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group glass rounded-2xl p-6 border border-border/50 hover:border-primary/40 transition-all hover:-translate-y-1 cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[feature.color]} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section id="templates" className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-teal/30 text-teal text-sm mb-4">30+ Templates</div>
            <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">
              Templates for <span className="text-gradient-teal">Every Industry</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professionally designed, recruiter-approved templates for tech, business, healthcare, design, and more.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {[
              { name: "Modern Pro", color: "#7C3AED", tag: "Tech" },
              { name: "Executive", color: "#0EA5E9", tag: "Business" },
              { name: "Creative", color: "#F97316", tag: "Design" },
              { name: "Minimal", color: "#10B981", tag: "Any" },
              { name: "Academic", color: "#8B5CF6", tag: "Education" },
              { name: "Tech Dark", color: "#06B6D4", tag: "Tech" },
              { name: "Data Sci", color: "#EC4899", tag: "Data" },
              { name: "Product", color: "#F59E0B", tag: "Product" },
              { name: "AI/ML", color: "#6366F1", tag: "Tech" },
              { name: "Finance", color: "#059669", tag: "Finance" },
            ].map((tmpl, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group cursor-pointer"
              >
                <Link to="/templates">
                  <div
                    className="aspect-[3/4] rounded-xl border border-border/50 overflow-hidden relative hover:scale-105 transition-transform shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${tmpl.color}22, ${tmpl.color}11)` }}
                  >
                    {/* Mini resume preview */}
                    <div className="absolute inset-0 p-2">
                      <div className="h-full w-full bg-white/95 rounded-lg p-2 flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 mb-1">
                          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: tmpl.color }} />
                          <div className="flex-1">
                            <div className="h-1.5 rounded w-3/4" style={{ backgroundColor: tmpl.color }} />
                          </div>
                        </div>
                        <div className="h-0.5 rounded w-full" style={{ backgroundColor: `${tmpl.color}44` }} />
                        {[...Array(5)].map((_, j) => (
                          <div key={j} className="flex gap-1">
                            <div className="h-1 rounded bg-gray-200 w-1/4" />
                            <div className="h-1 rounded bg-gray-100 flex-1" />
                          </div>
                        ))}
                        <div className="h-0.5 rounded w-full bg-gray-100 mt-1" />
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="h-1 rounded bg-gray-100 w-full" />
                        ))}
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl" style={{ background: `${tmpl.color}cc` }}>
                      <span className="text-white text-xs font-bold">Use Template</span>
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-foreground text-xs font-semibold">{tmpl.name}</div>
                    <div className="text-muted-foreground text-xs">{tmpl.tag}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl glass border border-border hover:border-teal/50 text-foreground font-semibold transition-all hover:scale-105"
            >
              View All 30+ Templates <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">
              From Blank to <span className="text-gradient-coral">Interview-Ready</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get your professional resume done in under 10 minutes.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Choose a Template", desc: "Pick from 30+ industry-specific templates designed by pro recruiters.", color: "primary" },
              { step: "02", title: "Fill & AI-Enhance", desc: "Add your details and let AI generate compelling descriptions automatically.", color: "teal" },
              { step: "03", title: "Score & Export", desc: "Check your ATS score, optimize, and export as PDF, Word, or text.", color: "coral" },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center glass rounded-3xl p-8 border border-border/50"
              >
                <div className="font-syne text-6xl font-bold text-gradient-hero opacity-30 mb-4">{step.step}</div>
                <h3 className="font-syne text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-muted-foreground/30 text-2xl z-10">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-syne text-4xl md:text-5xl font-bold mb-4">
              Loved by <span className="text-gradient-violet">2.4M+ Job Seekers</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 border border-border/50"
              >
                <div className="flex items-center gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-foreground/90 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-violet flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-muted-foreground text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden text-center p-12 md:p-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-teal" />
            <div className="absolute inset-0 bg-gradient-hero opacity-80" />
            <div className="relative z-10">
              <h2 className="font-syne text-4xl md:text-6xl font-bold text-white mb-6">
                Your Dream Job Awaits
              </h2>
              <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
                Join 2.4 million professionals who landed their dream jobs with Interactive Resume Builder.
              </p>
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-white text-primary font-bold text-xl hover:scale-105 transition-transform shadow-2xl"
              >
                <Zap className="w-6 h-6" />
                Build My Resume Now
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-violet flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="font-syne font-bold text-sm text-foreground">INTERACTIVE RESUME BUILDER</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="text-muted-foreground text-sm">© 2025 Interactive Resume Builder. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
