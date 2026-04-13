"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { LuExternalLink, LuGithub } from "react-icons/lu";
import { formatYearMonth } from "../utils/helper";

const sectionTitleClass =
  "text-[11px] font-bold uppercase tracking-[0.16em] text-gray-800 border-b border-gray-400 pb-1 mb-1.5";

const itemTitleClass = "text-[11px] font-semibold text-gray-900";
const itemMetaClass = "text-[10px] italic text-gray-600";
const bodyTextClass = "text-[10px] leading-[1.45] text-gray-700";

const normalizeTextArray = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item : item?.name))
    .filter(Boolean);
};

const renderDescriptionLines = (description) => {
  if (!description) return [];
  if (Array.isArray(description)) return description.filter(Boolean);
  return String(description)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

const TemplateTwo = ({ resumeData = {}, containerWidth }) => {
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

  const contactLine = useMemo(() => {
    const items = [
      contactInfo.phone,
      contactInfo.email,
      linkedInUrl ? "LinkedIn" : "",
      gitHubUrl ? "GitHub" : "",
      contactInfo.website ? "Portfolio" : "",
    ].filter(Boolean);

    return items.join("  •  ");
  }, [contactInfo.email, contactInfo.phone, contactInfo.website, gitHubUrl, linkedInUrl]);

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
        minHeight: containerWidth > 0 ? undefined : "295.5mm",
        height: containerWidth > 0 ? undefined : "295.5mm",
        boxSizing: "border-box",
        overflow: "hidden",
        padding: containerWidth > 0 ? "16px" : "12mm 12mm 10mm",
      }}
    >
      <header className="text-center pb-2 border-b border-gray-400">
        <h1 className="text-[18px] font-bold tracking-tight text-gray-900">
          {profileInfo.fullName || "John Doe"}
        </h1>
        {profileInfo.designation && (
          <p className="mt-0.5 text-[10px] font-medium text-gray-600">
            {profileInfo.designation}
          </p>
        )}
        {contactLine && (
          <p className="mt-1 text-[9px] text-gray-600 break-words">{contactLine}</p>
        )}
      </header>

      <div className="pt-2 space-y-2">
        {profileInfo.summary && (
          <section className="resume-section">
            <h2 className={sectionTitleClass}>Summary</h2>
            <p className={bodyTextClass}>{profileInfo.summary}</p>
          </section>
        )}

        {workItems.length > 0 && (
          <section className="resume-section">
            <h2 className={sectionTitleClass}>Experience</h2>
            <div className="space-y-1.5">
              {workItems.map((exp, idx) => {
                const descriptionLines = renderDescriptionLines(exp.description);
                return (
                  <article key={idx} className="space-y-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className={itemTitleClass}>{exp.role}</h3>
                        <p className={itemMetaClass}>{exp.company}</p>
                      </div>
                      <div className="shrink-0 text-right text-[9px] italic text-gray-600">
                        {exp.duration ||
                          `${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
                      </div>
                    </div>
                    {descriptionLines.length > 0 && (
                      <ul className="pl-3 list-disc space-y-0.5 text-[10px] leading-[1.4] text-gray-700">
                        {descriptionLines.map((line, lineIdx) => (
                          <li key={lineIdx}>{line}</li>
                        ))}
                      </ul>
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
                const descriptionLines = renderDescriptionLines(proj.description);
                return (
                  <article key={idx} className="space-y-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className={itemTitleClass}>{proj.title}</h3>
                      {(proj.liveLink || proj.liveDemo || proj.gitHub || proj.github) && (
                        <div className="flex items-center gap-2 text-[9px] text-blue-600 shrink-0">
                          {(proj.gitHub || proj.github) && (
                            <span className="inline-flex items-center gap-0.5">
                              <LuGithub size={9} />
                              GitHub
                            </span>
                          )}
                          {(proj.liveLink || proj.liveDemo) && (
                            <span className="inline-flex items-center gap-0.5">
                              <LuExternalLink size={9} />
                              Demo
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {descriptionLines.length > 0 && (
                      <ul className="pl-3 list-disc space-y-0.5 text-[10px] leading-[1.4] text-gray-700">
                        {descriptionLines.map((line, lineIdx) => (
                          <li key={lineIdx}>{line}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {educationItems.length > 0 && (
          <section className="resume-section">
            <h2 className={sectionTitleClass}>Education</h2>
            <div className="space-y-1">
              {educationItems.map((edu, idx) => (
                <article key={idx} className="space-y-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={itemTitleClass}>{edu.degree}</h3>
                    <p className="shrink-0 text-[9px] italic text-gray-600">
                      {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                    </p>
                  </div>
                  <p className="text-[10px] text-gray-700">{edu.institution}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {skillItems.length > 0 && (
          <section className="resume-section">
            <h2 className={sectionTitleClass}>Skills</h2>
            <p className="text-[10px] leading-[1.5] text-gray-700">{skillItems.join("  •  ")}</p>
          </section>
        )}

        {certificationItems.length > 0 && (
          <section className="resume-section">
            <h2 className={sectionTitleClass}>Certifications</h2>
            <div className="space-y-0.5 text-[10px] text-gray-700">
              {certificationItems.map((cert, idx) => (
                <p key={idx}>
                  {cert.title}
                  {(cert.issuer || cert.year) &&
                    ` - ${[cert.issuer, cert.year].filter(Boolean).join(" • ")}`}
                </p>
              ))}
            </div>
          </section>
        )}

        {(languageItems.length > 0 || interestItems.length > 0) && (
          <section className="resume-section">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className={sectionTitleClass}>Languages</h2>
                <p className="text-[10px] leading-[1.5] text-gray-700">
                  {languageItems.length ? languageItems.join("  •  ") : "-"}
                </p>
              </div>
              <div>
                <h2 className={sectionTitleClass}>Interests</h2>
                <p className="text-[10px] leading-[1.5] text-gray-700">
                  {interestItems.length ? interestItems.join("  •  ") : "-"}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default TemplateTwo;
