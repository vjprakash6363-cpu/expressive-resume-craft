import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Star } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
}

const levelDots = (level: number) =>
  [...Array(5)].map((_, i) => (
    <div
      key={i}
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor: i < level ? "#7C3AED" : "#E5E7EB" }}
    />
  ));

export default function ResumePreview({ data }: ResumePreviewProps) {
  const { personalInfo, experience, education, skills, certifications, projects, accentColor } = data;

  const accent = accentColor || "#7C3AED";

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div
      id="resume-preview"
      className="resume-preview bg-white w-full min-h-[1056px] text-[#1a1a2e] shadow-2xl"
      style={{ fontFamily: data.fontFamily || "Inter", fontSize: "11px" }}
    >
      {/* Header */}
      <div style={{ background: accent }} className="px-8 py-6 text-white">
        <div className="flex items-start gap-4">
          {/* Profile Photo */}
          {personalInfo.profilePhoto ? (
            <img
              src={personalInfo.profilePhoto}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-white/30 flex-shrink-0"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 border-4 border-white/30">
              <span className="text-2xl font-bold text-white">
                {personalInfo.fullName?.charAt(0) || "?"}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight">{personalInfo.fullName || "Your Name"}</h1>
            <p className="text-white/80 text-sm font-medium mt-0.5">{personalInfo.jobTitle || "Job Title"}</p>
            {/* Contact row */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-white/70 text-xs">
              {personalInfo.email && (
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{personalInfo.phone}</span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.location}</span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" />{personalInfo.linkedin}</span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1"><Github className="w-3 h-3" />{personalInfo.github}</span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{personalInfo.website}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 flex gap-6">
        {/* Left column */}
        <div className="w-1/3 flex flex-col gap-4">
          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
                Profile
              </h2>
              <p className="text-[10px] text-gray-600 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
                Skills
              </h2>
              <div className="flex flex-col gap-1.5">
                {skills.map(skill => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-700">{skill.name}</span>
                    <div className="flex items-center gap-0.5">
                      {levelDots(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
                Certifications
              </h2>
              {certifications.map(cert => (
                <div key={cert.id} className="mb-2">
                  <div className="flex items-start gap-1">
                    <Star className="w-2.5 h-2.5 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                    <div>
                      <p className="text-[10px] font-semibold text-gray-800">{cert.name}</p>
                      <p className="text-[9px] text-gray-500">{cert.issuer}</p>
                      {cert.date && <p className="text-[9px] text-gray-400">{formatDate(cert.date)}</p>}
                      {cert.attachmentName && (
                        <p className="text-[9px] text-blue-500 mt-0.5">📎 {cert.attachmentName}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
                Experience
              </h2>
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
                  {exp.description && (
                    <p className="text-[10px] text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                  )}
                  {exp.highlights.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.highlights.filter(Boolean).map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[10px] text-gray-600">
                          <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                          {h}
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
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</p>
                      <p className="text-[10px] font-medium" style={{ color: accent }}>{edu.institution}</p>
                      {edu.gpa && <p className="text-[9px] text-gray-500">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-[9px] text-gray-400 text-right">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-[10px] text-gray-500 mt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2" style={{ color: accent, borderColor: accent }}>
                Projects
              </h2>
              {projects.map(proj => (
                <div key={proj.id} className="mb-2">
                  <div className="flex items-start justify-between">
                    <p className="text-[11px] font-bold text-gray-900">{proj.name}</p>
                    {proj.url && <p className="text-[9px] text-blue-500">{proj.url}</p>}
                  </div>
                  <p className="text-[10px] text-gray-600">{proj.description}</p>
                  {proj.technologies && (
                    <p className="text-[9px] text-gray-400 mt-0.5"><span className="font-medium">Tech:</span> {proj.technologies}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
