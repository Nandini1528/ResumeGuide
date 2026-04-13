import React, { useEffect, useMemo, useRef, useState } from "react";
import { LuGlobe } from "react-icons/lu";
import { formatYearMonth } from "../utils/helper";

const sectionTitleClass =
  "text-[11px] font-bold uppercase tracking-[0.16em] text-gray-900 border-b border-gray-400 pb-1 mb-1.5";

const normalizeTextArray = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item : item?.name))
    .filter(Boolean);
};

const getDescriptionLines = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const TemplateOne = ({ resumeData = {}, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
    languages = [],
    workExperience = [],
    internshipExperience = [],
    projects = [],
    skills = [],
    certifications = [],
    interests = [],
  } = resumeData;

  const educationItems = Array.isArray(education) ? education : [];
  const workExperienceItems = Array.isArray(workExperience) ? workExperience : [];
  const internshipItems = Array.isArray(internshipExperience) ? internshipExperience : [];
  const projectItems = Array.isArray(projects) ? projects : [];
  const certificationItems = Array.isArray(certifications) ? certifications : [];
  const interestItems = normalizeTextArray(interests);
  const languageItems = normalizeTextArray(languages);
  const workItems = internshipItems.length ? internshipItems : workExperienceItems;

  const linkedInUrl =
    typeof (contactInfo.linkedIn || contactInfo.linkedin) === "string"
      ? contactInfo.linkedIn || contactInfo.linkedin
      : "";
  const gitHubUrl =
    typeof (contactInfo.gitHub || contactInfo.github) === "string"
      ? contactInfo.gitHub || contactInfo.github
      : "";
  const skillItems = Array.isArray(skills)
    ? skills.map((skill) => (typeof skill === "string" ? skill : skill?.name)).filter(Boolean)
    : [...(skills.technical || []), ...(skills.soft || [])].filter(Boolean);

  const leftHeaderLine = useMemo(() => {
    return [contactInfo.email, contactInfo.phone, contactInfo.location].filter(Boolean).join("   ");
  }, [contactInfo.email, contactInfo.location, contactInfo.phone]);

  const rightHeaderLabel = useMemo(() => {
    if (contactInfo.website) return "Portfolio";
    if (linkedInUrl) return "LinkedIn";
    if (gitHubUrl) return "GitHub";
    return "";
  }, [contactInfo.website, gitHubUrl, linkedInUrl]);

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(794);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current && containerWidth > 0) {
      const actualWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualWidth);
      setScale(containerWidth / actualWidth);
    }
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="bg-white font-sans text-black"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "210mm",
        minHeight: containerWidth > 0 ? undefined : "296.5mm",
        height: containerWidth > 0 ? undefined : "296.5mm",
        boxSizing: "border-box",
        overflow: "hidden",
        padding: containerWidth > 0 ? "18px" : "12mm 12mm 10mm",
      }}
    >
      <header className="pb-2 border-b border-gray-400">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[18px] font-bold tracking-tight text-gray-900">
              {profileInfo.fullName || "John Doe"}
            </h1>
            {profileInfo.designation && (
              <p className="mt-0.5 text-[10px] font-medium text-gray-700">
                {profileInfo.designation}
              </p>
            )}
            {leftHeaderLine && (
              <p className="mt-1 text-[8.5px] text-gray-600 break-words">{leftHeaderLine}</p>
            )}
          </div>

          {rightHeaderLabel && (
            <div className="shrink-0 flex items-center gap-1 text-[8.5px] text-gray-700">
              <LuGlobe size={10} />
              <span>{rightHeaderLabel}</span>
            </div>
          )}
        </div>
      </header>

      {profileInfo.summary && (
        <section className="resume-section pt-2">
          <h2 className={sectionTitleClass}>Professional Summary</h2>
          <p className="text-[10px] leading-[1.45] text-gray-700">{profileInfo.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-[1.8fr_0.95fr] gap-6 pt-2">
        <div className="space-y-2">
          {workItems.length > 0 && (
            <section className="resume-section">
              <h2 className={sectionTitleClass}>Work Experience</h2>
              <div className="space-y-1.5">
                {workItems.map((exp, idx) => {
                  const descriptionLines = getDescriptionLines(exp.description);
                  return (
                    <article key={idx} className="space-y-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-[11px] font-semibold text-gray-900">{exp.company}</h3>
                          <p className="text-[10px] font-medium text-gray-700">{exp.role}</p>
                        </div>
                        <p className="shrink-0 text-[8.5px] italic text-gray-600">
                          {exp.duration ||
                            `${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
                        </p>
                      </div>
                      {descriptionLines.length > 0 && (
                        <div className="text-[9.5px] leading-[1.45] text-gray-700">
                          {descriptionLines.map((line, lineIdx) => (
                            <p key={lineIdx}>{line}</p>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {projectItems.length > 0 && (
            <section className="resume-section">
              <h2 className={sectionTitleClass}>Projects</h2>
              <div className="space-y-1.5">
                {projectItems.map((proj, idx) => {
                  const descriptionLines = getDescriptionLines(proj.description);
                  return (
                    <article key={idx} className="space-y-0.5">
                      <h3 className="text-[11px] font-semibold text-gray-900">{proj.title}</h3>
                      {descriptionLines.length > 0 && (
                        <div className="text-[9.5px] leading-[1.45] text-gray-700">
                          {descriptionLines.map((line, lineIdx) => (
                            <p key={lineIdx}>{line}</p>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-2">
          {skillItems.length > 0 && (
            <section className="resume-section">
              <h2 className={sectionTitleClass}>Skills</h2>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[8.8px] text-gray-700">
                {skillItems.map((skill, idx) => (
                  <span key={idx}>{skill}</span>
                ))}
              </div>
            </section>
          )}

          {educationItems.length > 0 && (
            <section className="resume-section">
              <h2 className={sectionTitleClass}>Education</h2>
              <div className="space-y-1.5">
                {educationItems.map((edu, idx) => (
                  <article key={idx} className="space-y-0.5">
                    <h3 className="text-[10px] font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-[9px] text-gray-700">{edu.institution}</p>
                    <p className="text-[8.5px] italic text-gray-600">
                      {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {certificationItems.length > 0 && (
            <section className="resume-section">
              <h2 className={sectionTitleClass}>Certifications</h2>
              <div className="space-y-1">
                {certificationItems.map((cert, idx) => (
                  <article key={idx} className="space-y-0.5">
                    <h3 className="text-[9.5px] font-semibold text-gray-900">{cert.title}</h3>
                    <p className="text-[8.5px] text-gray-600">
                      {[cert.issuer, cert.year].filter(Boolean).join("   ")}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {languageItems.length > 0 && (
            <section className="resume-section">
              <h2 className={sectionTitleClass}>Languages</h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[8.8px] text-gray-700">
                {languageItems.map((lang, idx) => (
                  <span key={idx}>{lang}</span>
                ))}
              </div>
            </section>
          )}

          {interestItems.length > 0 && (
            <section className="resume-section">
              <h2 className={sectionTitleClass}>Interests</h2>
              <div className="space-y-0.5 text-[8.8px] text-gray-700">
                {interestItems.map((interest, idx) => (
                  <p key={idx}>{interest}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
