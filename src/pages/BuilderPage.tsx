import { useState, useRef, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ResumeData, defaultResumeData } from "@/types/resume";
import { calculateATSScore, generateAISummary, RESUME_TEMPLATES } from "@/lib/resumeUtils";
import ResumePreview from "@/components/ResumePreview";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, User, Briefcase, GraduationCap, Code, Award, FolderGit2,
  ChevronDown, ChevronUp, Plus, Trash2, Download, Eye, Sparkles,
  Target, Palette, Upload, X, Camera, Paperclip, Save, ArrowLeft,
  CheckCircle, AlertCircle, Info
} from "lucide-react";

const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Code },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "projects", label: "Projects", icon: FolderGit2 },
];

const FONTS = ["Inter", "Georgia", "Arial", "Merriweather", "Roboto", "Lato", "Playfair Display"];
const ACCENT_COLORS = ["#7C3AED", "#0EA5E9", "#F97316", "#10B981", "#EC4899", "#EF4444", "#F59E0B", "#3B82F6", "#06B6D4", "#8B5CF6"];

export default function BuilderPage() {
  const [searchParams] = useSearchParams();
  const initialTemplate = searchParams.get("template") || "modern";

  const [resumeData, setResumeData] = useState<ResumeData>({
    ...defaultResumeData,
    selectedTemplate: initialTemplate,
  });
  const [activeSection, setActiveSection] = useState("personal");
  const [showPreview, setShowPreview] = useState(true);
  const [atsResult, setAtsResult] = useState<ReturnType<typeof calculateATSScore> | null>(null);
  const [showATS, setShowATS] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [expandedExp, setExpandedExp] = useState<string | null>("exp1");
  const [expandedEdu, setExpandedEdu] = useState<string | null>("edu1");
  const photoRef = useRef<HTMLInputElement>(null);

  const update = useCallback((updater: (prev: ResumeData) => ResumeData) => {
    setResumeData(updater);
  }, []);

  const updatePersonal = (field: string, value: string) => {
    update(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updatePersonal("profilePhoto", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCertAttachment = (certId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      update(prev => ({
        ...prev,
        certifications: prev.certifications.map(c =>
          c.id === certId
            ? { ...c, attachmentName: file.name, attachmentData: ev.target?.result as string }
            : c
        )
      }));
    };
    reader.readAsDataURL(file);
  };

  const addExperience = () => {
    const id = `exp${Date.now()}`;
    update(prev => ({
      ...prev,
      experience: [...prev.experience, {
        id, company: "", position: "", startDate: "", endDate: "", current: false,
        location: "", description: "", highlights: [""],
      }]
    }));
    setExpandedExp(id);
  };

  const removeExperience = (id: string) => {
    update(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const updateExp = (id: string, field: string, value: string | boolean | string[]) => {
    update(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const addEducation = () => {
    const id = `edu${Date.now()}`;
    update(prev => ({
      ...prev,
      education: [...prev.education, {
        id, institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "", description: "",
      }]
    }));
    setExpandedEdu(id);
  };

  const removeEducation = (id: string) => {
    update(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  const updateEdu = (id: string, field: string, value: string) => {
    update(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    }));
  };

  const addSkill = () => {
    update(prev => ({
      ...prev,
      skills: [...prev.skills, { id: `s${Date.now()}`, name: "", level: 3, category: "General" }]
    }));
  };

  const removeSkill = (id: string) => {
    update(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  };

  const addCertification = () => {
    update(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        id: `cert${Date.now()}`, name: "", issuer: "", date: "", url: "", attachmentName: null, attachmentData: null
      }]
    }));
  };

  const removeCertification = (id: string) => {
    update(prev => ({ ...prev, certifications: prev.certifications.filter(c => c.id !== id) }));
  };

  const addProject = () => {
    update(prev => ({
      ...prev,
      projects: [...prev.projects, {
        id: `proj${Date.now()}`, name: "", description: "", technologies: "", url: "", startDate: "", endDate: "",
      }]
    }));
  };

  const removeProject = (id: string) => {
    update(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const runATSCheck = () => {
    const result = calculateATSScore(resumeData);
    setAtsResult(result);
    setShowATS(true);
  };

  const handleGenerateAI = async (field: "summary") => {
    setIsGeneratingAI(true);
    await new Promise(r => setTimeout(r, 1500));
    if (field === "summary") {
      updatePersonal("summary", generateAISummary(resumeData));
    }
    setIsGeneratingAI(false);
  };

  const handleSave = () => {
    setSaveStatus("saving");
    localStorage.setItem("irb-resume", JSON.stringify(resumeData));
    setTimeout(() => setSaveStatus("saved"), 800);
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const handleExportPDF = () => {
    window.print();
  };

  const scoreColor = (score: number) => {
    if (score >= 75) return "#10B981";
    if (score >= 50) return "#F59E0B";
    return "#EF4444";
  };

  const inputCls = "w-full px-3 py-2 rounded-lg bg-muted/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors";
  const labelCls = "text-xs font-medium text-muted-foreground mb-1 block";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="h-14 glass border-b border-border/60 flex items-center justify-between px-4 flex-shrink-0 z-40">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-violet flex items-center justify-center">
              <FileText className="w-3 h-3 text-white" />
            </div>
            <span className="font-syne font-bold text-xs text-foreground hidden sm:block">
              IRB <span className="text-gradient-violet">Builder</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-border/60 text-muted-foreground hover:text-foreground text-xs font-medium transition-all"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Template</span>
          </button>
          <button
            onClick={runATSCheck}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal/30 text-teal hover:bg-teal/10 text-xs font-medium transition-all"
          >
            <Target className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ATS Score</span>
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              saveStatus === "saved"
                ? "border border-teal/40 text-teal"
                : "border border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save"}
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-violet text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-border text-muted-foreground text-xs"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Template picker dropdown */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass border-b border-border/40 z-30 px-4 py-3"
          >
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Template:</span>
              {RESUME_TEMPLATES.slice(0, 12).map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    update(prev => ({ ...prev, selectedTemplate: t.id, accentColor: t.color }));
                    setShowTemplates(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all border ${
                    resumeData.selectedTemplate === t.id
                      ? "border-primary/50 text-foreground bg-primary/10"
                      : "border-border/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  {t.name}
                </button>
              ))}
            </div>
            {/* Accent colors + fonts */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Color:</span>
                {ACCENT_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => update(prev => ({ ...prev, accentColor: color }))}
                    className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
                    style={{
                      backgroundColor: color,
                      borderColor: resumeData.accentColor === color ? "white" : "transparent"
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Font:</span>
                <select
                  value={resumeData.fontFamily}
                  onChange={e => update(prev => ({ ...prev, fontFamily: e.target.value }))}
                  className="text-xs bg-muted/50 border border-border rounded px-2 py-1 text-foreground"
                >
                  {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar nav */}
        <div className="w-14 border-r border-border/40 glass flex flex-col items-center py-3 gap-1 flex-shrink-0">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              title={s.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                activeSection === s.id
                  ? "bg-gradient-violet text-white glow-violet"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <s.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Editor panel */}
        <div className={`flex-1 overflow-y-auto p-4 ${showPreview ? "max-w-lg" : "flex-1"}`}>
          <div className="max-w-lg mx-auto space-y-4">
            {/* Personal Info */}
            {activeSection === "personal" && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h2 className="font-syne font-bold text-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> Personal Information
                </h2>

                {/* Photo upload */}
                <div className="glass rounded-xl p-4 border border-border/50">
                  <label className={labelCls}>Profile Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {resumeData.personalInfo.profilePhoto ? (
                        <div className="relative">
                          <img
                            src={resumeData.personalInfo.profilePhoto}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-primary/30"
                          />
                          <button
                            onClick={() => updatePersonal("profilePhoto", "")}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive flex items-center justify-center"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-muted/50 border-2 border-dashed border-border flex items-center justify-center">
                          <Camera className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <button
                        onClick={() => photoRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-violet text-white text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload Photo
                      </button>
                      <p className="text-muted-foreground text-xs mt-1.5">JPG, PNG, GIF up to 5MB</p>
                      <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </div>
                  </div>
                </div>

                <div className="glass rounded-xl p-4 border border-border/50 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input className={inputCls} value={resumeData.personalInfo.fullName} onChange={e => updatePersonal("fullName", e.target.value)} placeholder="Alex Johnson" />
                    </div>
                    <div>
                      <label className={labelCls}>Job Title *</label>
                      <input className={inputCls} value={resumeData.personalInfo.jobTitle} onChange={e => updatePersonal("jobTitle", e.target.value)} placeholder="Software Engineer" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input className={inputCls} type="email" value={resumeData.personalInfo.email} onChange={e => updatePersonal("email", e.target.value)} placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className={labelCls}>Phone</label>
                      <input className={inputCls} value={resumeData.personalInfo.phone} onChange={e => updatePersonal("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Location</label>
                      <input className={inputCls} value={resumeData.personalInfo.location} onChange={e => updatePersonal("location", e.target.value)} placeholder="City, State" />
                    </div>
                    <div>
                      <label className={labelCls}>LinkedIn</label>
                      <input className={inputCls} value={resumeData.personalInfo.linkedin} onChange={e => updatePersonal("linkedin", e.target.value)} placeholder="linkedin.com/in/you" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>GitHub</label>
                      <input className={inputCls} value={resumeData.personalInfo.github} onChange={e => updatePersonal("github", e.target.value)} placeholder="github.com/you" />
                    </div>
                    <div>
                      <label className={labelCls}>Website</label>
                      <input className={inputCls} value={resumeData.personalInfo.website} onChange={e => updatePersonal("website", e.target.value)} placeholder="yoursite.com" />
                    </div>
                  </div>
                </div>

                {/* Summary with AI */}
                <div className="glass rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-muted-foreground">Professional Summary</label>
                    <button
                      onClick={() => handleGenerateAI("summary")}
                      disabled={isGeneratingAI}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-violet text-white text-xs font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                    >
                      {isGeneratingAI ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3" />
                          AI Generate
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    className={`${inputCls} min-h-[100px] resize-none`}
                    value={resumeData.personalInfo.summary}
                    onChange={e => updatePersonal("summary", e.target.value)}
                    placeholder="A brief, compelling overview of your professional background and key strengths..."
                  />
                  <p className="text-muted-foreground text-xs mt-1">{resumeData.personalInfo.summary.length}/500 chars</p>
                </div>
              </motion.div>
            )}

            {/* Experience */}
            {activeSection === "experience" && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-syne font-bold text-foreground flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" /> Work Experience
                  </h2>
                  <button onClick={addExperience} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                {resumeData.experience.map(exp => (
                  <div key={exp.id} className="glass rounded-xl border border-border/50 overflow-hidden">
                    <button
                      onClick={() => setExpandedExp(expandedExp === exp.id ? null : exp.id)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm">{exp.position || "New Position"}</p>
                        <p className="text-muted-foreground text-xs">{exp.company || "Company"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }} className="text-destructive/60 hover:text-destructive transition-colors p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {expandedExp === exp.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </button>
                    {expandedExp === exp.id && (
                      <div className="px-4 pb-4 space-y-3 border-t border-border/40 pt-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Position *</label>
                            <input className={inputCls} value={exp.position} onChange={e => updateExp(exp.id, "position", e.target.value)} placeholder="Senior Engineer" />
                          </div>
                          <div>
                            <label className={labelCls}>Company *</label>
                            <input className={inputCls} value={exp.company} onChange={e => updateExp(exp.id, "company", e.target.value)} placeholder="Company Inc." />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Start Date</label>
                            <input type="month" className={inputCls} value={exp.startDate} onChange={e => updateExp(exp.id, "startDate", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelCls}>End Date</label>
                            <input type="month" className={inputCls} value={exp.endDate} onChange={e => updateExp(exp.id, "endDate", e.target.value)} disabled={exp.current} />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id={`curr-${exp.id}`} checked={exp.current} onChange={e => updateExp(exp.id, "current", e.target.checked)} className="rounded" />
                          <label htmlFor={`curr-${exp.id}`} className="text-xs text-muted-foreground">Currently working here</label>
                        </div>
                        <div>
                          <label className={labelCls}>Location</label>
                          <input className={inputCls} value={exp.location} onChange={e => updateExp(exp.id, "location", e.target.value)} placeholder="City, Remote" />
                        </div>
                        <div>
                          <label className={labelCls}>Description</label>
                          <textarea className={`${inputCls} min-h-[70px] resize-none`} value={exp.description} onChange={e => updateExp(exp.id, "description", e.target.value)} placeholder="Brief overview of your role and impact..." />
                        </div>
                        <div>
                          <label className={labelCls}>Key Highlights (one per line)</label>
                          <textarea
                            className={`${inputCls} min-h-[70px] resize-none`}
                            value={exp.highlights.join("\n")}
                            onChange={e => updateExp(exp.id, "highlights", e.target.value.split("\n"))}
                            placeholder="Led team of 5 engineers&#10;Reduced load time by 40%&#10;Deployed on AWS"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Education */}
            {activeSection === "education" && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-syne font-bold text-foreground flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" /> Education
                  </h2>
                  <button onClick={addEducation} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                {resumeData.education.map(edu => (
                  <div key={edu.id} className="glass rounded-xl border border-border/50 overflow-hidden">
                    <button
                      onClick={() => setExpandedEdu(expandedEdu === edu.id ? null : edu.id)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm">{edu.degree || "Degree"} {edu.field ? `in ${edu.field}` : ""}</p>
                        <p className="text-muted-foreground text-xs">{edu.institution || "Institution"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={(e) => { e.stopPropagation(); removeEducation(edu.id); }} className="text-destructive/60 hover:text-destructive transition-colors p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {expandedEdu === edu.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </button>
                    {expandedEdu === edu.id && (
                      <div className="px-4 pb-4 space-y-3 border-t border-border/40 pt-3">
                        <div>
                          <label className={labelCls}>Institution *</label>
                          <input className={inputCls} value={edu.institution} onChange={e => updateEdu(edu.id, "institution", e.target.value)} placeholder="University Name" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Degree</label>
                            <input className={inputCls} value={edu.degree} onChange={e => updateEdu(edu.id, "degree", e.target.value)} placeholder="B.S., M.S., Ph.D." />
                          </div>
                          <div>
                            <label className={labelCls}>Field of Study</label>
                            <input className={inputCls} value={edu.field} onChange={e => updateEdu(edu.id, "field", e.target.value)} placeholder="Computer Science" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className={labelCls}>Start</label>
                            <input type="month" className={inputCls} value={edu.startDate} onChange={e => updateEdu(edu.id, "startDate", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelCls}>End</label>
                            <input type="month" className={inputCls} value={edu.endDate} onChange={e => updateEdu(edu.id, "endDate", e.target.value)} />
                          </div>
                          <div>
                            <label className={labelCls}>GPA</label>
                            <input className={inputCls} value={edu.gpa} onChange={e => updateEdu(edu.id, "gpa", e.target.value)} placeholder="3.8" />
                          </div>
                        </div>
                        <div>
                          <label className={labelCls}>Notes</label>
                          <textarea className={`${inputCls} min-h-[60px] resize-none`} value={edu.description} onChange={e => updateEdu(edu.id, "description", e.target.value)} placeholder="Dean's List, relevant coursework..." />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* Skills */}
            {activeSection === "skills" && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-syne font-bold text-foreground flex items-center gap-2">
                    <Code className="w-4 h-4 text-primary" /> Skills
                  </h2>
                  <button onClick={addSkill} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                <div className="space-y-2">
                  {resumeData.skills.map(skill => (
                    <div key={skill.id} className="glass rounded-xl border border-border/50 p-3 flex items-center gap-3">
                      <input
                        className={`${inputCls} flex-1`}
                        value={skill.name}
                        onChange={e => update(prev => ({ ...prev, skills: prev.skills.map(s => s.id === skill.id ? { ...s, name: e.target.value } : s) }))}
                        placeholder="Skill name"
                      />
                      <select
                        className="text-xs bg-muted/50 border border-border rounded-lg px-2 py-2 text-foreground"
                        value={skill.category}
                        onChange={e => update(prev => ({ ...prev, skills: prev.skills.map(s => s.id === skill.id ? { ...s, category: e.target.value } : s) }))}
                      >
                        {["Frontend", "Backend", "Languages", "Cloud", "DevOps", "Database", "Design", "Soft Skills", "Other"].map(c => <option key={c}>{c}</option>)}
                      </select>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(level => (
                          <button
                            key={level}
                            onClick={() => update(prev => ({ ...prev, skills: prev.skills.map(s => s.id === skill.id ? { ...s, level } : s) }))}
                            className="w-4 h-4 rounded-full border transition-all"
                            style={{
                              backgroundColor: level <= skill.level ? resumeData.accentColor : "transparent",
                              borderColor: resumeData.accentColor
                            }}
                          />
                        ))}
                      </div>
                      <button onClick={() => removeSkill(skill.id)} className="text-destructive/60 hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {activeSection === "certifications" && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-syne font-bold text-foreground flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" /> Certifications & Documents
                  </h2>
                  <button onClick={addCertification} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                {resumeData.certifications.map(cert => (
                  <div key={cert.id} className="glass rounded-xl border border-border/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground">{cert.name || "New Certification"}</h3>
                      <button onClick={() => removeCertification(cert.id)} className="text-destructive/60 hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Certification Name</label>
                        <input className={inputCls} value={cert.name} onChange={e => update(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, name: e.target.value } : c) }))} placeholder="AWS Solutions Architect" />
                      </div>
                      <div>
                        <label className={labelCls}>Issuing Organization</label>
                        <input className={inputCls} value={cert.issuer} onChange={e => update(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, issuer: e.target.value } : c) }))} placeholder="Amazon Web Services" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Date Earned</label>
                        <input type="month" className={inputCls} value={cert.date} onChange={e => update(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, date: e.target.value } : c) }))} />
                      </div>
                      <div>
                        <label className={labelCls}>Credential URL</label>
                        <input className={inputCls} value={cert.url} onChange={e => update(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, url: e.target.value } : c) }))} placeholder="https://..." />
                      </div>
                    </div>
                    {/* File attachment */}
                    <div>
                      <label className={labelCls}>Attach Certificate / Document</label>
                      {cert.attachmentName ? (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                          <Paperclip className="w-4 h-4 text-primary" />
                          <span className="text-xs text-foreground flex-1 truncate">{cert.attachmentName}</span>
                          <button onClick={() => update(prev => ({ ...prev, certifications: prev.certifications.map(c => c.id === cert.id ? { ...c, attachmentName: null, attachmentData: null } : c) }))} className="text-destructive/70 hover:text-destructive">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border/60 cursor-pointer hover:border-primary/40 transition-colors">
                          <Paperclip className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Click to attach PDF, JPG, PNG...</span>
                          <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" className="hidden" onChange={e => handleCertAttachment(cert.id, e)} />
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Projects */}
            {activeSection === "projects" && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-syne font-bold text-foreground flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-primary" /> Projects
                  </h2>
                  <button onClick={addProject} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
                {resumeData.projects.map(proj => (
                  <div key={proj.id} className="glass rounded-xl border border-border/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground">{proj.name || "New Project"}</h3>
                      <button onClick={() => removeProject(proj.id)} className="text-destructive/60 hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div>
                      <label className={labelCls}>Project Name</label>
                      <input className={inputCls} value={proj.name} onChange={e => update(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, name: e.target.value } : p) }))} placeholder="My Awesome Project" />
                    </div>
                    <div>
                      <label className={labelCls}>Description</label>
                      <textarea className={`${inputCls} min-h-[70px] resize-none`} value={proj.description} onChange={e => update(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p) }))} placeholder="What did you build and what was its impact?" />
                    </div>
                    <div>
                      <label className={labelCls}>Technologies Used</label>
                      <input className={inputCls} value={proj.technologies} onChange={e => update(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, technologies: e.target.value } : p) }))} placeholder="React, Node.js, PostgreSQL" />
                    </div>
                    <div>
                      <label className={labelCls}>Project URL</label>
                      <input className={inputCls} value={proj.url} onChange={e => update(prev => ({ ...prev, projects: prev.projects.map(p => p.id === proj.id ? { ...p, url: e.target.value } : p) }))} placeholder="github.com/you/project" />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div className="hidden md:flex flex-1 flex-col bg-muted/20 border-l border-border/40">
            <div className="h-10 flex items-center justify-between px-4 border-b border-border/30">
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Live Preview
              </span>
              <span className="text-xs text-muted-foreground">A4 Format</span>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <div className="w-full max-w-[600px] mx-auto origin-top-left" style={{ transform: "scale(0.72)", transformOrigin: "top center" }}>
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        )}

        {/* ATS Panel */}
        <AnimatePresence>
          {showATS && atsResult && (
            <motion.div
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              className="w-72 border-l border-border/40 glass flex-shrink-0 overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-syne font-bold text-foreground text-sm flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-teal" /> ATS Score
                  </h3>
                  <button onClick={() => setShowATS(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Score ring */}
                <div className="flex flex-col items-center mb-6">
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center border-8 mb-3"
                    style={{
                      borderColor: scoreColor(atsResult.score),
                      boxShadow: `0 0 30px ${scoreColor(atsResult.score)}44`
                    }}
                  >
                    <div className="text-center">
                      <div className="font-syne text-3xl font-bold" style={{ color: scoreColor(atsResult.score) }}>
                        {atsResult.score}
                      </div>
                      <div className="text-muted-foreground text-xs">/ 100</div>
                    </div>
                  </div>
                  <div className="font-medium text-sm" style={{ color: scoreColor(atsResult.score) }}>
                    {atsResult.score >= 75 ? "Excellent!" : atsResult.score >= 50 ? "Good" : "Needs Work"}
                  </div>
                </div>

                {/* Issues */}
                {atsResult.issues.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-coral" /> Issues ({atsResult.issues.length})
                    </h4>
                    <div className="space-y-1.5">
                      {atsResult.issues.map((issue, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground bg-destructive/10 rounded-lg px-3 py-2 border border-destructive/20">
                          <span className="text-coral mt-0.5">•</span> {issue}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {atsResult.suggestions.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-primary" /> Suggestions
                    </h4>
                    <div className="space-y-1.5">
                      {atsResult.suggestions.map((s, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground bg-primary/10 rounded-lg px-3 py-2 border border-primary/20">
                          <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" /> {s}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Keywords found */}
                {atsResult.keywords.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-teal" /> Keywords Found ({atsResult.keywords.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.keywords.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-teal/20 text-teal border border-teal/30">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={runATSCheck}
                  className="w-full mt-4 py-2 rounded-lg bg-gradient-teal text-white text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Re-check Score
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
