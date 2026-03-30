import React, { useEffect, useRef, useState } from "react";
import { LuMail, LuPhone, LuMapPin, LuGlobe } from "react-icons/lu";
import {
  EducationInfo,
  WorkExperience,
  ProjectInfo,
  CertificationInfo,
} from "./ResumeSection";
import { formatYearMonth } from "../utils/helper";

const DEFAULT_THEME = ["#ffffff", "#0d2137", "#1a3a5c", "#64b5f6", "#bbdefb"];

const SectionTitle = ({ text, light = false }) => (
  <div className="mb-3">
    <h2
      className="text-xs font-bold uppercase tracking-widest pb-1"
      style={{ color: light ? "#bbdefb" : "#0d2137" }}
    >
      {text}
    </h2>
    <div
      className="w-full h-[1.5px]"
      style={{ backgroundColor: light ? "#bbdefb" : "#0d2137" }}
    />
  </div>
);

const TemplateFour = ({ resumeData = {}, colorPalette, containerWidth }) => {
  const colors = colorPalette?.length ? colorPalette : DEFAULT_THEME;

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
    references = [],
  } = resumeData;

  const educationItems = Array.isArray(education) ? education : [];
  const languageSource = Array.isArray(languages) ? languages : [];
  const workExperienceItems = Array.isArray(workExperience) ? workExperience : [];
  const internshipItems = Array.isArray(internshipExperience) ? internshipExperience : [];
  const projectItems = Array.isArray(projects) ? projects : [];
  const certificationItems = Array.isArray(certifications) ? certifications : [];
  const interestItems = Array.isArray(interests) ? interests : [];
  const referenceItems = Array.isArray(references) ? references : [];
  const workItems = internshipItems.length ? internshipItems : workExperienceItems;

  const skillItems = Array.isArray(skills)
    ? skills.map((skill) => (typeof skill === "string" ? skill : skill?.name)).filter(Boolean)
    : [...(skills.technical || []), ...(skills.soft || [])].filter(Boolean);

  const languageItems = languageSource
    .map((lang) => (typeof lang === "string" ? lang : lang?.name))
    .filter(Boolean);

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
      className="flex font-sans text-gray-800 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
        minHeight: "1100px",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        className="w-[30%] flex flex-col p-6"
        style={{ backgroundColor: colors[1] }}
      >
        {/* Profile Photo */}
        {profileInfo.profilePreviewUrl && (
          <div className="flex justify-center mb-6 mt-2">
            <div
              className="w-28 h-28 rounded-full overflow-hidden border-4"
              style={{ borderColor: colors[0] }}
            >
              <img
                src={profileInfo.profilePreviewUrl}
                alt={profileInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* CONTACT */}
        <div className="resume-section mb-5">
          <SectionTitle text="Contact" light />
          <div className="space-y-2 text-xs" style={{ color: "#d1e8ff" }}>
            {contactInfo.phone && (
              <div className="flex items-start gap-2">
                <LuPhone className="mt-0.5 shrink-0" size={12} />
                <span>{contactInfo.phone}</span>
              </div>
            )}
            {contactInfo.email && (
              <div className="flex items-start gap-2">
                <LuMail className="mt-0.5 shrink-0" size={12} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="break-all text-blue-300 hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.location && (
              <div className="flex items-start gap-2">
                <LuMapPin className="mt-0.5 shrink-0" size={12} />
                <span>{contactInfo.location}</span>
              </div>
            )}
            {contactInfo.website && (
              <div className="flex items-start gap-2">
                <LuGlobe className="mt-0.5 shrink-0" size={12} />
                <a
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-blue-300 hover:underline"
                >
                  {contactInfo.website}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATION */}
        {educationItems.length > 0 && (
          <div className="resume-section mb-5">
            <SectionTitle text="Education" light />
            <div className="space-y-4">
              {educationItems.map((edu, i) => (
                <div key={i} className="text-xs" style={{ color: "#d1e8ff" }}>
                  <p className="font-semibold text-white">
                    {formatYearMonth(edu.startDate)} -{" "}
                    {formatYearMonth(edu.endDate)}
                  </p>
                  <p className="font-bold uppercase tracking-wide text-white text-[11px] mt-0.5">
                    {edu.institution}
                  </p>
                  <ul className="mt-1 space-y-0.5 list-disc list-inside">
                    <li>{edu.degree}</li>
                    {edu.grade && <li>GPA: {edu.grade}</li>}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS */}
        {skillItems.length > 0 && (
          <div className="resume-section mb-5">
            <SectionTitle text="Skills" light />
            <ul className="space-y-1.5">
              {skillItems.map((skill, i) => (
                <li
                  key={i}
                  className="text-xs flex items-center gap-2"
                  style={{ color: "#d1e8ff" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: colors[3] }}
                  />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* LANGUAGES */}
        {languageItems.length > 0 && (
          <div className="resume-section mb-5">
            <SectionTitle text="Languages" light />
            <ul className="space-y-1.5">
              {languageItems.map((lang, i) => (
                <li
                  key={i}
                  className="text-xs flex items-center gap-2"
                  style={{ color: "#d1e8ff" }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: colors[3] }}
                  />
                  {lang}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* INTERESTS */}
        {interestItems.length > 0 && interestItems.some((i) => i) && (
          <div className="resume-section">
            <SectionTitle text="Interests" light />
            <ul className="space-y-1.5">
              {interestItems.map(
                (int, i) =>
                  int && (
                    <li
                      key={i}
                      className="text-xs flex items-center gap-2"
                      style={{ color: "#d1e8ff" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: colors[3] }}
                      />
                      {int}
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="w-[70%] p-8 space-y-5">
        {/* Header */}
        <div className="resume-section mb-2">
          <h1 className="text-4xl font-black uppercase tracking-tight leading-tight">
            <span style={{ color: colors[1] }} className="font-black">
              {profileInfo.fullName?.split(" ")[0]}
            </span>{" "}
            <span className="font-light text-gray-600">
              {profileInfo.fullName?.split(" ").slice(1).join(" ")}
            </span>
          </h1>
          <p
            className="text-sm font-semibold uppercase tracking-widest mt-1 mb-2"
            style={{ color: colors[2] }}
          >
            {profileInfo.designation}
          </p>
          <div
            className="w-10 h-[3px] rounded"
            style={{ backgroundColor: colors[1] }}
          />
        </div>

        {/* PROFILE / SUMMARY */}
        {profileInfo.summary && (
          <div className="resume-section">
            <SectionTitle text="Profile" />
            <p className="text-sm leading-relaxed text-gray-700 text-justify">
              {profileInfo.summary}
            </p>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {workItems.length > 0 && (
          <div className="resume-section">
            <SectionTitle text="Work Experience" />
            <div className="space-y-5">
              {workItems.map((exp, i) => (
                <div key={i} className="flex gap-3">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center mt-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: colors[1] }}
                    />
                    {i < workItems.length - 1 && (
                      <div
                        className="w-[1.5px] flex-1 mt-1"
                        style={{ backgroundColor: colors[4] }}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-bold text-gray-900">
                        {exp.company}
                      </p>
                      <span
                        className="text-xs font-medium"
                        style={{ color: colors[2] }}
                      >
                        {exp.duration ||
                          `${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1 italic">
                      {exp.role}
                    </p>
                    {Array.isArray(exp.description) ? (
                      <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside text-justify">
                        {exp.description.map((point, j) => (
                          <li key={j}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-700 text-justify leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {projectItems.length > 0 && (
          <div className="resume-section">
            <SectionTitle text="Projects" />
            <div className="space-y-4">
              {projectItems.map((proj, i) => (
                <ProjectInfo
                  key={i}
                  title={proj.title}
                  description={proj.description}
                  githubLink={proj.gitHub || proj.github}
                  liveDemoUrl={proj.liveLink || proj.liveDemo}
                  bgColor={colors[4]}
                  headingClass="pb-1"
                />
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS */}
        {certificationItems.length > 0 && (
          <div className="resume-section">
            <SectionTitle text="Certifications" />
            <div className="space-y-2">
              {certificationItems.map((cert, i) => (
                <CertificationInfo
                  key={i}
                  title={cert.title}
                  issuer={cert.issuer}
                  year={cert.year}
                  bgColor={colors[4]}
                />
              ))}
            </div>
          </div>
        )}

        {/* REFERENCES */}
        {referenceItems.length > 0 && (
          <div className="resume-section">
            <SectionTitle text="Reference" />
            <div className="grid grid-cols-2 gap-4">
              {referenceItems.map((ref, i) => (
                <div key={i} className="text-xs space-y-0.5">
                  <p className="font-bold text-gray-900 text-sm">{ref.name}</p>
                  <p className="text-gray-500">{ref.position}</p>
                  {ref.phone && (
                    <p>
                      <span className="font-semibold text-gray-700">Phone: </span>
                      {ref.phone}
                    </p>
                  )}
                  {ref.email && (
                    <p>
                      <span className="font-semibold text-gray-700">Email : </span>
                      {ref.email}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateFour;
