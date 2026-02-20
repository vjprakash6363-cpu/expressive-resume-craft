import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Star } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} ${year}`;
};

const levelDots = (level: number, accent: string) =>
  [...Array(5)].map((_, i) => (
    <div
      key={i}
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor: i < level ? accent : "#E5E7EB" }}
    />
  ));

const levelBar = (level: number, accent: string) => (
  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
    <div className="h-full rounded-full" style={{ width: `${level * 20}%`, backgroundColor: accent }} />
  </div>
);

// ========================
// LAYOUT: Classic (header on top, single column)
// ========================
function ClassicLayout({ data }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills, certifications, projects, accentColor } = data;
  const accent = accentColor || "#7C3AED";

  return (
    <>
      {/* Header - centered */}
      <div className="text-center px-8 pt-8 pb-4 border-b-2" style={{ borderColor: accent }}>
        <div className="flex items-center justify-center gap-4 mb-2">
          {personalInfo.profilePhoto && (
            <img src={personalInfo.profilePhoto} alt="Profile" className="w-16 h-16 rounded-full object-cover border-2" style={{ borderColor: accent }} />
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName || "Your Name"}</h1>
            <p className="text-sm font-medium" style={{ color: accent }}>{personalInfo.jobTitle || "Job Title"}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500 mt-2">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
          {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>}
          {personalInfo.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{personalInfo.github}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website}</span>}
        </div>
      </div>

      <div className="px-8 py-5 space-y-4">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b" style={{ color: accent, borderColor: `${accent}44` }}>Professional Summary</h2>
            <p className="text-[10px] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b" style={{ color: accent, borderColor: `${accent}44` }}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-gray-900">{exp.position}</p>
                    <p className="text-[10px] font-medium" style={{ color: accent }}>{exp.company}{exp.location ? ` — ${exp.location}` : ""}</p>
                  </div>
                  <p className="text-[9px] text-gray-400 flex-shrink-0">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</p>
                </div>
                {exp.description && <p className="text-[10px] text-gray-600 mt-0.5">{exp.description}</p>}
                {exp.highlights.filter(Boolean).length > 0 && (
                  <ul className="mt-0.5 space-y-0.5">
                    {exp.highlights.filter(Boolean).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[10px] text-gray-600">
                        <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />{h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b" style={{ color: accent, borderColor: `${accent}44` }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
                    <p className="text-[10px] font-medium" style={{ color: accent }}>{edu.institution}</p>
                    {edu.gpa && <p className="text-[9px] text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <p className="text-[9px] text-gray-400">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills + Certs side by side */}
        <div className="grid grid-cols-2 gap-4">
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b" style={{ color: accent, borderColor: `${accent}44` }}>Skills</h2>
              <div className="flex flex-wrap gap-1">
                {skills.map(skill => (
                  <span key={skill.id} className="px-2 py-0.5 rounded text-[9px] font-medium text-white" style={{ backgroundColor: accent }}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b" style={{ color: accent, borderColor: `${accent}44` }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-1">
                  <p className="text-[10px] font-semibold text-gray-800">{cert.name}</p>
                  <p className="text-[9px] text-gray-500">{cert.issuer}{cert.date ? ` — ${formatDate(cert.date)}` : ""}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b" style={{ color: accent, borderColor: `${accent}44` }}>Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <div className="flex items-start justify-between">
                  <p className="text-[11px] font-bold text-gray-900">{proj.name}</p>
                  {proj.url && <p className="text-[9px] text-blue-500">{proj.url}</p>}
                </div>
                <p className="text-[10px] text-gray-600">{proj.description}</p>
                {proj.technologies && <p className="text-[9px] text-gray-400 mt-0.5"><span className="font-medium">Tech:</span> {proj.technologies}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ========================
// LAYOUT: Modern (colored header, two columns)
// ========================
function ModernLayout({ data }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills, certifications, projects, accentColor } = data;
  const accent = accentColor || "#7C3AED";

  return (
    <>
      {/* Header */}
      <div style={{ background: accent }} className="px-8 py-6 text-white">
        <div className="flex items-start gap-4">
          {personalInfo.profilePhoto ? (
            <img src={personalInfo.profilePhoto} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-white/30 flex-shrink-0" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border-4 border-white/30">
              <span className="text-2xl font-bold text-white">{personalInfo.fullName?.charAt(0) || "?"}</span>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
            <p className="text-white/80 text-sm font-medium mt-0.5">{personalInfo.jobTitle || "Job Title"}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-white/70 text-xs">
              {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
              {personalInfo.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>}
              {personalInfo.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>}
              {personalInfo.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" />{personalInfo.github}</span>}
              {personalInfo.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 flex gap-6">
        {/* Left column */}
        <div className="w-1/3 flex flex-col gap-4">
          {personalInfo.summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Profile</h2>
              <p className="text-[10px] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Skills</h2>
              <div className="flex flex-col gap-1.5">
                {skills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-700">{skill.name}</span>
                    <div className="flex items-center gap-0.5">{levelDots(skill.level, accent)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-2">
                  <div className="flex items-start gap-1">
                    <Star className="w-2.5 h-2.5 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                    <div>
                      <p className="text-[10px] font-semibold text-gray-800">{cert.name}</p>
                      <p className="text-[9px] text-gray-500">{cert.issuer}</p>
                      {cert.date && <p className="text-[9px] text-gray-400">{formatDate(cert.date)}</p>}
                      {cert.attachmentName && <p className="text-[9px] text-blue-500 mt-0.5">📎 {cert.attachmentName}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex-1 flex flex-col gap-4">
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-gray-900">{exp.position}</p>
                      <p className="text-[10px] font-medium" style={{ color: accent }}>{exp.company}</p>
                      {exp.location && <p className="text-[9px] text-gray-400">{exp.location}</p>}
                    </div>
                    <div className="text-[9px] text-gray-400 text-right flex-shrink-0">
                      {formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && <p className="text-[10px] text-gray-600 mt-1 leading-relaxed">{exp.description}</p>}
                  {exp.highlights.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.highlights.filter(Boolean).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[10px] text-gray-600">
                          <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />{h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
                      <p className="text-[10px] font-medium" style={{ color: accent }}>{edu.institution}</p>
                      {edu.gpa && <p className="text-[9px] text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-[9px] text-gray-400 text-right">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className="mb-2">
                  <div className="flex items-start justify-between">
                    <p className="text-[11px] font-bold text-gray-900">{proj.name}</p>
                    {proj.url && <p className="text-[9px] text-blue-500">{proj.url}</p>}
                  </div>
                  <p className="text-[10px] text-gray-600">{proj.description}</p>
                  {proj.technologies && <p className="text-[9px] text-gray-400 mt-0.5"><span className="font-medium">Tech:</span> {proj.technologies}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ========================
// LAYOUT: Sidebar (left colored sidebar)
// ========================
function SidebarLayout({ data }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills, certifications, projects, accentColor } = data;
  const accent = accentColor || "#7C3AED";

  return (
    <div className="flex min-h-[1056px]">
      {/* Left sidebar */}
      <div className="w-[35%] text-white p-6 flex flex-col gap-4" style={{ backgroundColor: accent }}>
        {/* Photo */}
        <div className="flex flex-col items-center mb-2">
          {personalInfo.profilePhoto ? (
            <img src={personalInfo.profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white/30 mb-2" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30 mb-2">
              <span className="text-3xl font-bold">{personalInfo.fullName?.charAt(0) || "?"}</span>
            </div>
          )}
          <h1 className="text-lg font-bold text-center leading-tight">{personalInfo.fullName || "Your Name"}</h1>
          <p className="text-white/70 text-xs mt-0.5">{personalInfo.jobTitle || "Job Title"}</p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-white/30">Contact</h2>
          <div className="space-y-1.5 text-[9px] text-white/80">
            {personalInfo.email && <p className="flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" />{personalInfo.email}</p>}
            {personalInfo.phone && <p className="flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" />{personalInfo.phone}</p>}
            {personalInfo.location && <p className="flex items-center gap-1.5"><MapPin className="w-2.5 h-2.5" />{personalInfo.location}</p>}
            {personalInfo.linkedin && <p className="flex items-center gap-1.5"><Linkedin className="w-2.5 h-2.5" />{personalInfo.linkedin}</p>}
            {personalInfo.github && <p className="flex items-center gap-1.5"><Github className="w-2.5 h-2.5" />{personalInfo.github}</p>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-white/30">Skills</h2>
            <div className="space-y-1.5">
              {skills.map(skill => (
                <div key={skill.id}>
                  <p className="text-[9px] text-white/90 mb-0.5">{skill.name}</p>
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white/80 rounded-full" style={{ width: `${skill.level * 20}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-widest mb-2 pb-1 border-b border-white/30">Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-1.5">
                <p className="text-[9px] font-semibold text-white/90">{cert.name}</p>
                <p className="text-[8px] text-white/60">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right content */}
      <div className="flex-1 p-6 space-y-4">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>About Me</h2>
            <p className="text-[10px] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Experience</h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-gray-900">{exp.position}</p>
                    <p className="text-[10px] font-medium" style={{ color: accent }}>{exp.company}</p>
                  </div>
                  <p className="text-[9px] text-gray-400 flex-shrink-0">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</p>
                </div>
                {exp.description && <p className="text-[10px] text-gray-600 mt-0.5">{exp.description}</p>}
                {exp.highlights.filter(Boolean).length > 0 && (
                  <ul className="mt-0.5 space-y-0.5">
                    {exp.highlights.filter(Boolean).map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[10px] text-gray-600">
                        <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />{h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <p className="text-[11px] font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
                <p className="text-[10px] font-medium" style={{ color: accent }}>{edu.institution}</p>
                <p className="text-[9px] text-gray-400">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}{edu.gpa ? ` | GPA: ${edu.gpa}` : ""}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-1.5 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <p className="text-[11px] font-bold text-gray-900">{proj.name}</p>
                <p className="text-[10px] text-gray-600">{proj.description}</p>
                {proj.technologies && <p className="text-[9px] text-gray-400 mt-0.5">Tech: {proj.technologies}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ========================
// LAYOUT: Minimal (clean, lots of whitespace)
// ========================
function MinimalLayout({ data }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills, certifications, projects, accentColor } = data;
  const accent = accentColor || "#10B981";

  return (
    <div className="px-10 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-sm text-gray-500 mt-1">{personalInfo.jobTitle || "Job Title"}</p>
        <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
        <div className="w-full h-px mt-4" style={{ backgroundColor: accent }} />
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-5">
          <p className="text-[10.5px] text-gray-600 leading-relaxed italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-3 pl-3" style={{ borderLeft: `2px solid ${accent}` }}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold text-gray-900">{exp.position}</p>
                  <p className="text-[10px] text-gray-500">{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
                </div>
                <p className="text-[9px] text-gray-400">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</p>
              </div>
              {exp.description && <p className="text-[10px] text-gray-600 mt-0.5">{exp.description}</p>}
              {exp.highlights.filter(Boolean).length > 0 && (
                <ul className="mt-0.5 space-y-0.5">
                  {exp.highlights.filter(Boolean).map((h, i) => (
                    <li key={i} className="text-[10px] text-gray-500">— {h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-2 pl-3" style={{ borderLeft: `2px solid ${accent}` }}>
              <p className="text-[11px] font-semibold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
              <p className="text-[10px] text-gray-500">{edu.institution}</p>
              <p className="text-[9px] text-gray-400">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}{edu.gpa ? ` • GPA: ${edu.gpa}` : ""}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(skill => (
              <span key={skill.id} className="text-[9px] px-2.5 py-1 rounded-full border text-gray-600" style={{ borderColor: `${accent}66` }}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Projects inline */}
      <div className="grid grid-cols-2 gap-6">
        {certifications.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-1">
                <p className="text-[10px] font-medium text-gray-800">{cert.name}</p>
                <p className="text-[9px] text-gray-500">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">Projects</h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-1">
                <p className="text-[10px] font-medium text-gray-800">{proj.name}</p>
                <p className="text-[9px] text-gray-500">{proj.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ========================
// LAYOUT: Bold (dark header, timeline style)
// ========================
function BoldLayout({ data }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills, certifications, projects, accentColor } = data;
  const accent = accentColor || "#F97316";

  return (
    <>
      {/* Dark header */}
      <div className="bg-gray-900 px-8 py-8 text-white">
        <div className="flex items-center gap-5">
          {personalInfo.profilePhoto && (
            <img src={personalInfo.profilePhoto} alt="Profile" className="w-24 h-24 rounded-2xl object-cover border-2" style={{ borderColor: accent }} />
          )}
          <div>
            <h1 className="text-3xl font-black tracking-tight">{personalInfo.fullName || "YOUR NAME"}</h1>
            <p className="text-lg font-light mt-0.5" style={{ color: accent }}>{personalInfo.jobTitle || "Job Title"}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-gray-400 text-[10px]">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
          </div>
        </div>
        {personalInfo.summary && (
          <p className="text-gray-300 text-[10.5px] leading-relaxed mt-4 border-t border-gray-700 pt-3">{personalInfo.summary}</p>
        )}
      </div>

      <div className="px-8 py-5 space-y-5">
        {/* Experience with timeline */}
        {experience.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: accent }}>Experience</h2>
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full border-2 flex-shrink-0" style={{ borderColor: accent, backgroundColor: `${accent}33` }} />
                    <div className="w-0.5 flex-1 bg-gray-200" />
                  </div>
                  <div className="pb-3 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-gray-900">{exp.position}</p>
                        <p className="text-[10px] font-semibold" style={{ color: accent }}>{exp.company}</p>
                      </div>
                      <p className="text-[9px] text-gray-400 flex-shrink-0">{formatDate(exp.startDate)} — {exp.current ? "Present" : formatDate(exp.endDate)}</p>
                    </div>
                    {exp.description && <p className="text-[10px] text-gray-600 mt-0.5">{exp.description}</p>}
                    {exp.highlights.filter(Boolean).length > 0 && (
                      <ul className="mt-0.5 space-y-0.5">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="text-[10px] text-gray-600">▸ {h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: accent }}>Education</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <p className="text-[11px] font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
                <p className="text-[10px] font-medium" style={{ color: accent }}>{edu.institution}</p>
                <p className="text-[9px] text-gray-400">{formatDate(edu.startDate)} — {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills as chips */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: accent }}>Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(skill => (
                <span key={skill.id} className="px-2.5 py-1 rounded-lg text-[9px] font-bold text-white" style={{ backgroundColor: accent }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects + Certs */}
        <div className="grid grid-cols-2 gap-4">
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: accent }}>Projects</h2>
              {projects.map(proj => (
                <div key={proj.id} className="mb-1.5">
                  <p className="text-[10px] font-bold text-gray-900">{proj.name}</p>
                  <p className="text-[9px] text-gray-600">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: accent }}>Certifications</h2>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-1.5">
                  <p className="text-[10px] font-bold text-gray-800">{cert.name}</p>
                  <p className="text-[9px] text-gray-500">{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ========================
// Template layout mapping
// ========================
const LAYOUT_MAP: Record<string, string> = {
  "modern": "modern",
  "executive": "classic",
  "creative": "bold",
  "minimal": "minimal",
  "academic": "classic",
  "tech-dark": "sidebar",
  "medical": "classic",
  "finance": "classic",
  "legal": "classic",
  "marketing": "bold",
  "engineer": "modern",
  "startup": "bold",
  "elegant": "minimal",
  "data-sci": "sidebar",
  "ux-design": "sidebar",
  "sales": "bold",
  "hr": "classic",
  "consulting": "classic",
  "nonprofit": "minimal",
  "freelance": "bold",
  "architect": "sidebar",
  "teacher": "classic",
  "journalist": "bold",
  "scientist": "classic",
  "product": "modern",
  "devops": "sidebar",
  "cybersec": "sidebar",
  "ai-ml": "modern",
  "game-dev": "bold",
  "blockchain": "sidebar",
  "nurse": "classic",
  "chef": "bold",
};

export default function ResumePreview({ data }: ResumePreviewProps) {
  const layoutType = LAYOUT_MAP[data.selectedTemplate] || "modern";

  const renderLayout = () => {
    switch (layoutType) {
      case "classic": return <ClassicLayout data={data} />;
      case "sidebar": return <SidebarLayout data={data} />;
      case "minimal": return <MinimalLayout data={data} />;
      case "bold": return <BoldLayout data={data} />;
      default: return <ModernLayout data={data} />;
    }
  };

  return (
    <div
      id="resume-preview"
      className="resume-preview bg-white w-full min-h-[1056px] text-[#1a1a2e] shadow-2xl"
      style={{ fontFamily: data.fontFamily || "Inter", fontSize: "11px" }}
    >
      {renderLayout()}
    </div>
  );
}
