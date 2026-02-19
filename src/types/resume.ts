export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  summary: string;
  profilePhoto: string | null;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
  attachmentName: string | null;
  attachmentData: string | null;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url: string;
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  selectedTemplate: string;
  accentColor: string;
  fontFamily: string;
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    jobTitle: "Senior Software Engineer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    github: "github.com/alexjohnson",
    website: "alexjohnson.dev",
    summary: "Passionate software engineer with 6+ years of experience building scalable web applications and leading cross-functional teams. Expertise in React, Node.js, and cloud infrastructure.",
    profilePhoto: null,
  },
  experience: [
    {
      id: "exp1",
      company: "TechCorp Inc.",
      position: "Senior Software Engineer",
      startDate: "2021-03",
      endDate: "",
      current: true,
      location: "San Francisco, CA",
      description: "Led development of microservices architecture serving 2M+ users. Mentored junior developers and drove 40% performance improvement.",
      highlights: ["Reduced API latency by 40%", "Led team of 5 engineers", "Deployed on AWS ECS"],
    },
    {
      id: "exp2",
      company: "StartupXYZ",
      position: "Full Stack Developer",
      startDate: "2018-06",
      endDate: "2021-02",
      current: false,
      location: "Remote",
      description: "Built and maintained React/Node.js applications. Implemented CI/CD pipelines and automated testing.",
      highlights: ["Built 3 production apps", "100% test coverage", "Reduced deploy time by 60%"],
    },
  ],
  education: [
    {
      id: "edu1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2014-08",
      endDate: "2018-05",
      gpa: "3.8",
      description: "Dean's List. Relevant coursework: Algorithms, Data Structures, Machine Learning, Distributed Systems.",
    },
  ],
  skills: [
    { id: "s1", name: "React", level: 5, category: "Frontend" },
    { id: "s2", name: "TypeScript", level: 5, category: "Languages" },
    { id: "s3", name: "Node.js", level: 4, category: "Backend" },
    { id: "s4", name: "AWS", level: 4, category: "Cloud" },
    { id: "s5", name: "Python", level: 4, category: "Languages" },
    { id: "s6", name: "Docker", level: 4, category: "DevOps" },
    { id: "s7", name: "GraphQL", level: 3, category: "Backend" },
    { id: "s8", name: "Kubernetes", level: 3, category: "DevOps" },
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022-08",
      url: "aws.amazon.com/certification",
      attachmentName: null,
      attachmentData: null,
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "OpenSource Dashboard",
      description: "Real-time analytics dashboard with 500+ GitHub stars. Built with React, D3.js and WebSockets.",
      technologies: "React, D3.js, WebSockets, Node.js",
      url: "github.com/alexjohnson/dashboard",
      startDate: "2022-01",
      endDate: "2022-06",
    },
  ],
  selectedTemplate: "modern",
  accentColor: "#7C3AED",
  fontFamily: "Inter",
};
