import { ResumeData } from "@/types/resume";

export const RESUME_TEMPLATES = [
  { id: "modern", name: "Modern Pro", industry: "Tech", color: "#7C3AED", preview: "gradient", popular: true },
  { id: "executive", name: "Executive Suite", industry: "Business", color: "#0EA5E9", preview: "clean", popular: true },
  { id: "creative", name: "Creative Studio", industry: "Design", color: "#F97316", preview: "bold", popular: true },
  { id: "minimal", name: "Minimal Zen", industry: "Any", color: "#10B981", preview: "minimal", popular: false },
  { id: "academic", name: "Academic Scholar", industry: "Education", color: "#8B5CF6", preview: "formal", popular: false },
  { id: "tech-dark", name: "Tech Dark", industry: "Tech", color: "#06B6D4", preview: "dark", popular: true },
  { id: "medical", name: "Medical Pro", industry: "Healthcare", color: "#EC4899", preview: "clean", popular: false },
  { id: "finance", name: "Finance Elite", industry: "Finance", color: "#059669", preview: "formal", popular: false },
  { id: "legal", name: "Legal Edge", industry: "Legal", color: "#374151", preview: "formal", popular: false },
  { id: "marketing", name: "Marketing Maestro", industry: "Marketing", color: "#EF4444", preview: "bold", popular: false },
  { id: "engineer", name: "Engineering Grid", industry: "Engineering", color: "#3B82F6", preview: "technical", popular: true },
  { id: "startup", name: "Startup Hustle", industry: "Startup", color: "#F59E0B", preview: "bold", popular: false },
  { id: "elegant", name: "Elegant Classic", industry: "Any", color: "#6B7280", preview: "clean", popular: false },
  { id: "data-sci", name: "Data Scientist", industry: "Data", color: "#8B5CF6", preview: "technical", popular: true },
  { id: "ux-design", name: "UX Portfolio", industry: "Design", color: "#EC4899", preview: "creative", popular: false },
  { id: "sales", name: "Sales Champion", industry: "Sales", color: "#F97316", preview: "bold", popular: false },
  { id: "hr", name: "HR Professional", industry: "HR", color: "#10B981", preview: "clean", popular: false },
  { id: "consulting", name: "Consulting Edge", industry: "Consulting", color: "#0EA5E9", preview: "formal", popular: false },
  { id: "nonprofit", name: "Nonprofit Leader", industry: "Nonprofit", color: "#7C3AED", preview: "minimal", popular: false },
  { id: "freelance", name: "Freelance Creative", industry: "Freelance", color: "#EF4444", preview: "creative", popular: false },
  { id: "architect", name: "Architect Blueprint", industry: "Architecture", color: "#374151", preview: "technical", popular: false },
  { id: "teacher", name: "Educator's Choice", industry: "Education", color: "#059669", preview: "clean", popular: false },
  { id: "journalist", name: "Journalist Voice", industry: "Media", color: "#DC2626", preview: "bold", popular: false },
  { id: "scientist", name: "Research Pro", industry: "Science", color: "#2563EB", preview: "formal", popular: false },
  { id: "product", name: "Product Manager", industry: "Product", color: "#7C3AED", preview: "gradient", popular: true },
  { id: "devops", name: "DevOps Engineer", industry: "Tech", color: "#0D9488", preview: "technical", popular: false },
  { id: "cybersec", name: "CyberSecurity", industry: "Tech", color: "#1F2937", preview: "dark", popular: false },
  { id: "ai-ml", name: "AI/ML Specialist", industry: "Tech", color: "#6366F1", preview: "technical", popular: true },
  { id: "game-dev", name: "Game Developer", industry: "Gaming", color: "#7C3AED", preview: "dark", popular: false },
  { id: "blockchain", name: "Blockchain Dev", industry: "Tech", color: "#F59E0B", preview: "technical", popular: false },
  { id: "nurse", name: "Healthcare Hero", industry: "Healthcare", color: "#3B82F6", preview: "clean", popular: false },
  { id: "chef", name: "Culinary Pro", industry: "Hospitality", color: "#DC2626", preview: "creative", popular: false },
];

export const ATS_KEYWORDS = {
  Tech: ["JavaScript", "React", "Python", "AWS", "Docker", "Kubernetes", "TypeScript", "Node.js", "API", "CI/CD", "Git", "Agile", "Scrum"],
  Business: ["leadership", "strategy", "ROI", "P&L", "stakeholder", "KPI", "revenue", "growth", "management", "budget"],
  Design: ["UX", "UI", "Figma", "user research", "wireframe", "prototype", "design system", "accessibility", "responsive"],
  Healthcare: ["patient care", "clinical", "EMR", "HIPAA", "diagnosis", "treatment", "healthcare", "medical"],
  Finance: ["financial analysis", "Excel", "modeling", "risk", "compliance", "audit", "investment", "portfolio"],
};

export function calculateATSScore(resumeData: ResumeData): {
  score: number;
  issues: string[];
  keywords: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const keywords: string[] = [];
  const suggestions: string[] = [];
  let score = 0;

  const fullText = [
    resumeData.personalInfo.summary,
    ...resumeData.experience.map(e => e.description + " " + e.highlights.join(" ")),
    ...resumeData.skills.map(s => s.name),
    ...resumeData.education.map(e => e.description),
  ].join(" ").toLowerCase();

  // Check completeness
  if (resumeData.personalInfo.fullName) score += 8;
  if (resumeData.personalInfo.email) score += 8;
  if (resumeData.personalInfo.phone) score += 5;
  if (resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 100) score += 12;
  else { issues.push("Summary too short (aim for 100+ characters)"); suggestions.push("Expand your professional summary with 3-4 impactful sentences"); }

  if (resumeData.experience.length >= 2) score += 15;
  else { issues.push("Add more work experience"); suggestions.push("Add at least 2 relevant work experiences"); }

  if (resumeData.education.length >= 1) score += 10;
  if (resumeData.skills.length >= 6) score += 12;
  else { issues.push("Add more skills (6+ recommended)"); suggestions.push("Add at least 6 technical or soft skills"); }

  if (resumeData.personalInfo.linkedin) score += 5;
  else suggestions.push("Add your LinkedIn profile URL");

  if (resumeData.personalInfo.profilePhoto) score += 3;

  // Keyword detection
  const allKeywords = Object.values(ATS_KEYWORDS).flat();
  allKeywords.forEach(kw => {
    if (fullText.includes(kw.toLowerCase())) {
      keywords.push(kw);
      score += 0.8;
    }
  });

  // Action verbs check
  const actionVerbs = ["led", "built", "developed", "managed", "created", "improved", "increased", "reduced", "launched", "implemented"];
  const hasActionVerbs = actionVerbs.some(v => fullText.includes(v));
  if (hasActionVerbs) score += 8;
  else { issues.push("Use strong action verbs (led, built, improved...)"); suggestions.push("Start bullet points with powerful action verbs"); }

  // Numbers check
  if (/\d+%/.test(fullText) || /\$\d+/.test(fullText)) score += 8;
  else { issues.push("Add quantifiable achievements (%, $, numbers)"); suggestions.push("Include metrics: 'Increased sales by 35%'"); }

  return {
    score: Math.min(Math.round(score), 99),
    issues: issues.slice(0, 4),
    keywords: keywords.slice(0, 12),
    suggestions: suggestions.slice(0, 4),
  };
}

export function generateAISummary(data: ResumeData): string {
  const { personalInfo, experience, skills } = data;
  const topSkills = skills.slice(0, 4).map(s => s.name).join(", ");
  const yearsExp = experience.length > 0 ? "5+" : "3+";
  const latestRole = experience[0]?.position || personalInfo.jobTitle;

  return `Dynamic ${latestRole} with ${yearsExp} years of experience driving innovation and delivering measurable results. Proficient in ${topSkills}, with a proven track record of leading high-impact projects and collaborating with cross-functional teams. Passionate about leveraging cutting-edge technology to solve complex business challenges and creating scalable solutions that enhance user experience and operational efficiency.`;
}
