"use client";
import React, { useEffect, useRef, useState } from "react";
import { LuExternalLink, LuGithub } from "react-icons/lu";
import { formatYearMonth } from "../utils/helper";

const sectionTitleClass = "text-base font-bold uppercase tracking-wide mb-1 pb-1 border-b border-gray-300";

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
  const languageSource = Array.isArray(languages) ? languages : [];
  const workExperienceItems = Array.isArray(workExperience) ? workExperience : [];
  const internshipItems = Array.isArray(internshipExperience) ? internshipExperience : [];
  const projectItems = Array.isArray(projects) ? projects : [];
  const certificationItems = Array.isArray(certifications) ? certifications : [];
  const interestItems = Array.isArray(interests) ? interests : [];
  const workItems = internshipItems.length ? internshipItems : workExperienceItems;
  const linkedInUrl = typeof (contactInfo.linkedIn || contactInfo.linkedin) === "string"
    ? (contactInfo.linkedIn || contactInfo.linkedin)
    : "";
  const gitHubUrl = typeof (contactInfo.gitHub || contactInfo.github) === "string"
    ? (contactInfo.gitHub || contactInfo.github)
    : "";
  const skillItems = Array.isArray(skills)
    ? skills.map((skill) => (typeof skill === "string" ? skill : skill?.name)).filter(Boolean)
    : [...(skills.technical || []), ...(skills.soft || [])].filter(Boolean);
  const languageItems = languageSource.map((lang) =>
    typeof lang === "string" ? lang : lang?.name
  ).filter(Boolean);

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
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
      className="resume-section p-4 bg-white font-sans text-black max-w-4xl mx-auto"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
        height: "1123px",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold tracking-tight mb-2">{profileInfo.fullName}</h1>
        <p className="text-sm text-gray-600 font-medium mb-2">{profileInfo.designation}</p>
        <div className="flex flex-wrap justify-center gap-1 text-[11px] text-gray-700">
          {contactInfo.phone && <span>{contactInfo.phone}</span>}
          {contactInfo.email && (
            <a href={`mailto:${contactInfo.email}`} className="hover:underline text-blue-600">
              {contactInfo.email}
            </a>
          )}
          {linkedInUrl && (
            <a href={linkedInUrl} className="hover:underline text-blue-600">
              LinkedIn
            </a>
          )}
          {gitHubUrl && (
            <a href={gitHubUrl} className="hover:underline text-blue-600">
              GitHub
            </a>
          )}
          {contactInfo.website && (
            <a href={contactInfo.website} className="hover:underline text-blue-600">
              Portfolio
            </a>
          )}
        </div>
      </div>

      <hr className="border-gray-300 mb-2" />

      {/* Summary */}
      {profileInfo.summary && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Summary</h2>
          <p className="text-[11px] text-gray-800 leading-tight">{profileInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {workItems.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Experience</h2>
          <div className="space-y-2">
            {workItems.map((exp, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-[12px] pb-2 text-gray-800">{exp.role}</h3>
                    <p className="italic text-[11px] pb-2 text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-[11px] text-right text-gray-600">
                    <p className="italic">
                      {exp.duration || `${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
                    </p>
                    {exp.location && <p className="text-[11px]">{exp.location}</p>}
                  </div>
                </div>
                {exp.technologies && (
                  <p className="bg-gray-100 text-[10px] font-mono px-1.5 py-0.5 rounded inline-block">
                    {exp.technologies}
                  </p>
                )}
                <ul className=" mt-0.5 text-[12px] text-gray-700">
                  {exp.description?.split("\n").map((line, i) => (
                    <li key={i} className="pb-1">{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projectItems.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Projects</h2>
          <div className="space-y-2">
            {projectItems.map((proj, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-[12px] text-gray-800">{proj.title}</h3>
                  {proj.link && (
                    <a href={proj.link} className="text-blue-600 text-[11px] hover:underline">
                      {proj.linkType || "Link"}
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <p className="bg-gray-100 pb-2 text-[10px] font-mono px-1.5 py-0.5 rounded inline-block">
                    {proj.technologies}
                  </p>
                )}
                <p className="text-[11px] pb-2 text-gray-700 ">{proj.description}</p>
                <div className="flex gap-1 mt-0.5 pt-2 text-[11px]">
                  {(proj.gitHub || proj.github) && (
                    <a href={proj.gitHub || proj.github} className="flex items-center gap-0.5 hover:underline text-blue-600">
                      <LuGithub size={10} /> GitHub
                    </a>
                  )}
                  {(proj.liveLink || proj.liveDemo) && (
                    <a href={proj.liveLink || proj.liveDemo} className="flex items-center gap-0.5 hover:underline text-blue-600">
                      <LuExternalLink size={10} /> Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {educationItems.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Education</h2>
          <div className="space-y-1">
            {educationItems.map((edu, idx) => (
              <div key={idx} className="space-y-0.25">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-[12px] pb-2 text-gray-800">{edu.degree}</h3>
                  <p className="italic text-[11px] pb-2 text-gray-600">
                    {formatYearMonth(edu.startDate)} - {formatYearMonth(edu.endDate)}
                  </p>
                </div>
                <p className="italic text-[11px] text-gray-700">{edu.institution}</p>
                {edu.courses && (
                  <p className="text-[11px]">
                    <strong>Courses:</strong> {edu.courses}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillItems.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Skills</h2>
          <ul className="text-[11px] text-gray-800 flex flex-wrap gap-1">
            {skillItems.map((skill, idx) => (
              <li key={idx} className="w-fit">{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications */}
      {certificationItems.length > 0 && (
        <section className="mb-2">
          <h2 className={sectionTitleClass}>Certifications</h2>
          <ul className="list-disc list-inside text-[11px] text-gray-700">
            {certificationItems.map((cert, idx) => (
              <li key={idx} className="leading-tight">
                {cert.title} — {cert.issuer} ({cert.year})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages & Interests */}
      {(languageItems.length > 0 || interestItems.length > 0) && (
        <section className="mb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {languageItems.length > 0 && (
              <div>
                <h2 className={sectionTitleClass}>Languages</h2>
                <ul className="flex flex-wrap gap-1 text-[11px] text-gray-700">
                  {languageItems.map((lang, idx) => (
                    <li key={idx} className="bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {interestItems.length > 0 && interestItems.some(Boolean) && (
              <div>
                <h2 className={sectionTitleClass}>Interests</h2>
                <ul className="flex flex-wrap gap-1 text-[11px] text-gray-700">
                  {interestItems.filter(Boolean).map((int, idx) => (
                    <li key={idx} className="bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {int}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default TemplateTwo;
