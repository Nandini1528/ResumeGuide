import React, { useEffect, useRef, useState } from "react";
import { LuMail, LuPhone, LuGithub, LuGlobe } from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import {
  EducationInfo,
  WorkExperience,
  ProjectInfo,
  CertificationInfo,
} from "./ResumeSection";
import { formatYearMonth } from "../utils/helper";

const DEFAULT_THEME = ["#ffffff", "#0d47a1", "#1e88e5", "#64b5f6", "#bbdefb"];

const Title = ({ text, color }) => (
  <div className="relative w-fit mb-2 resume-section-title">
    <h2 className="relative text-base font-bold uppercase tracking-wide pb-2" style={{ color }}>
      {text}
    </h2>
    <div className="w-full h-[2px] mt-1" style={{ backgroundColor: color }} />
  </div>
);

const TemplateOne = ({ resumeData = {}, colorPalette, containerWidth }) => {
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
      className="p-6 bg-white font-sans text-gray-800"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : undefined,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : undefined,
      }}
    >
      {/* Header */}
      <div className="resume-section flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold pb-2" >
            {profileInfo.fullName}
          </h1>
          <p className="text-lg font-medium pb-2">{profileInfo.designation}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            {contactInfo.email && (
              <div className="flex items-center">
                <LuMail className="mr-1" />
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">
                  {contactInfo.email}
                </a>
              </div>
            )}
            {contactInfo.phone && (
              <div className="flex items-center">
                <LuPhone className="mr-1" />
                <a href={`tel:${contactInfo.phone}`} className="hover:underline">
                  {contactInfo.phone}
                </a>
              </div>
            )}
            {contactInfo.location && (
              <div className="flex items-center">
                <span>{contactInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end text-sm">
          {linkedInUrl && (
            <div className="flex items-center mb-1">
              <RiLinkedinLine className="mr-1" />
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </div>
          )}
          {gitHubUrl && (
            <div className="flex items-center mb-1">
              <LuGithub className="mr-1" />
              <a href={gitHubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </div>
          )}
          {contactInfo.website && (
            <div className="flex items-center">
              <LuGlobe className="mr-1" />
              <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {profileInfo.summary && (
        <div className="resume-section mb-3">
          <Title text="Professional Summary" />
          <p className="text-sm leading-relaxed">{profileInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-4">
          {workItems.length > 0 && (
            <div className="resume-section">
              <Title text="Work Experience" />
              <div className="space-y-6">
                {workItems.map((exp, i) => (
                  <WorkExperience
                    key={i}
                    company={exp.company}
                    role={exp.role}
                    duration={exp.duration || `${formatYearMonth(exp.startDate)} - ${formatYearMonth(exp.endDate)}`}
                    description={exp.description}
                    durationColor={[2]}
                    
                  />
                ))}
              </div>
            </div>
          )}

          {projectItems.length > 0 && (
            <div className="resume-section">
              <Title text="Projects" />
              <div className="space-y-4">
                {projectItems.map((proj, i) => (
                  <ProjectInfo
                    key={i}
                    title={proj.title}
                    description={proj.description}
                    githubLink={proj.gitHub || proj.github}
                    liveDemoUrl={proj.liveLink || proj.liveDemo}
                    bgColor={[4]}
                    headingClass="pb-2" // Added pb-2 to subheadings
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-1 space-y-6">
          {skillItems.length > 0 && (
            <div className="resume-section">
              <Title text="Skills" />
              <div className="flex flex-wrap gap-2">
                {skillItems.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{ backgroundColor: [4] }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {educationItems.length > 0 && (
            <div className="resume-section">
              <Title text="Education" />
              <div className="space-y-4 pb-2">
                {educationItems.map((edu, i) => (
                  <EducationInfo
                    key={i}
                    degree={edu.degree}
                    institution={edu.institution}
                    duration={`${formatYearMonth(edu.startDate)} - ${formatYearMonth(
                      edu.endDate
                    )}`}
                  
                  />
                ))}
                <br />
              </div>
            </div>
          )}

          {certificationItems.length > 0 && (
            <div className="resume-section">
              <Title text="Certifications" />
              <div className="space-y-2">
                {certificationItems.map((cert, i) => (
                  <CertificationInfo
                    key={i}
                    title={cert.title}
                    issuer={cert.issuer}
                    year={cert.year}
                    bgColor={[4]}
                   
                  />
                ))}
              </div>
            </div>
          )}

          {languageItems.length > 0 && (
            <div className="resume-section">
              <Title text="Languages" />
              <div className="flex flex-wrap gap-2">
                {languageItems.map((lang, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2 py-1 rounded"
                    style={{ backgroundColor: [4] }}
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {interestItems.length > 0 && interestItems.some((i) => i) && (
            <div className="resume-section">
              <Title text="Interests" />
              <div className="flex flex-wrap gap-2">
                {interestItems.map((int, i) =>
                  int ? (
                    <span
                      key={i}
                      className="text-xs font-medium px-2 py-1 rounded"
                      style={{ backgroundColor: [4] }}
                    >
                      {int}
                    </span>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;
