import React, { useEffect, useRef, useState } from "react";
import { formatYearMonth } from "../utils/helper";

const TemplateThree = ({ resumeData = {}, containerWidth }) => {
  const {
    profileInfo = {},
    contactInfo = {},
    education = [],
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

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(1100);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (resumeRef.current) {
      const actualBaseWidth = resumeRef.current.offsetWidth;
      setBaseWidth(actualBaseWidth);
      if (containerWidth > 0) {
        setScale(containerWidth / actualBaseWidth);
      }
    }
  }, [containerWidth]);

  // Group skills by category
  const groupedSkills = {
    "Automation & Test tools": [],
    "Product Management": [],
    Languages: [],
    "Other Skills": []
  };

  skillItems.forEach((skillName) => {
    if (["Selenium/Webdriver", "TestNG", "Jenkins"].includes(skillName)) {
      groupedSkills["Automation & Test tools"].push(skillName);
    } else if (["Agile", "Scrum", "JIRA", "Microsoft TFS"].includes(skillName)) {
      groupedSkills["Product Management"].push(skillName);
    } else if (["Python", "Java", "Javascript", "Databases (MySQL)"].includes(skillName)) {
      groupedSkills.Languages.push(skillName);
    } else {
      groupedSkills["Other Skills"].push(skillName);
    }
  });

  return (
    <div
      ref={resumeRef}
      className="bg-white font-sans text-black"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "210mm",
        minHeight: containerWidth > 0 ? undefined : "296.5mm",
        height: containerWidth > 0 ? undefined : "296.5mm",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Header Section */}
      <header className="px-8 pt-8 pb-4 mb-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase mb-3">{profileInfo.fullName}</h1>

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            {profileInfo.designation}
          </h2>

        </div>

        <p className="text-sm text-gray-700 leading-tight mb-4">
          {profileInfo.summary}
        </p>
      </header>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-12 gap-4 px-8 pb-8">
        {/* LEFT SIDEBAR - 5 columns */}
        <aside className="col-span-5 space-y-5 pr-4 border-r border-gray-300">
          {/* Contact */}
          <section>
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">CONTACT</h2>
            <ul className="text-xs text-gray-700 space-y-2 pb-2">
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Location:</span>
                {contactInfo.location}
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Phone:</span>
                {contactInfo.phone}
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[65px]">Email:</span>
                <a href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 hover:underline">
                  {contactInfo.email}
                </a>
              </li>
              {linkedInUrl && (
                <li className="flex items-start ">
                  <span className="font-semibold min-w-[65px]">LinkedIn:</span>
                  <a href={linkedInUrl}
                    className="text-blue-600 hover:underline truncate pb-1"
                    title={linkedInUrl}>
                    linkedin.com/in/{linkedInUrl.split('/').pop()}
                  </a>
                </li>
              )}
              {gitHubUrl && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[65px] ">GitHub:</span>
                  <a href={gitHubUrl}
                    className="text-blue-600 hover:underline pb-2 truncate"
                    title={gitHubUrl}>
                    github.com/{gitHubUrl.split('/').pop()}
                  </a>
                </li>
              )}
              {contactInfo.website && (
                <li className="flex items-start">
                  <span className="font-semibold min-w-[65px]">Portfolio:</span>
                  <a href={contactInfo.website}
                    className="text-blue-600 hover:underline pb-2 truncate"
                    title={contactInfo.website}>
                    {contactInfo.website.replace(/(^\w+:|^)\/\//, '')}
                  </a>
                </li>
              )}
            </ul>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">SKILLS</h2>
            {Object.entries(groupedSkills).map(([category, skillsList]) => (
              skillsList.length > 0 && (
                <div key={category} className="mb-2">
                  {category !== "Other Skills" && (
                    <h3 className="text-xs font-semibold italic mb-1">{category}:</h3>
                  )}
                  <ul className="text-xs text-gray-700">
                    {skillsList.map((skill, idx) => (
                      <li key={idx} className="mb-1">{skill}</li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </section>

          {/* Education */}
          {educationItems.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider">EDUCATION</h2>
              <div className="space-y-3">
                {educationItems.map((edu, idx) => (
                  <div key={idx} className="text-xs">
                    <h3 className="font-bold pb-2">{edu.institution}</h3>
                    <p className=" pb-2 ">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certificationItems.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">CERTIFICATIONS</h2>
              <ul className="text-xs text-gray-700 space-y-1">
                {certificationItems.map((cert, idx) => (
                  <li key={idx}>{cert.title} ({cert.year})</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests */}
          {interestItems.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-2 tracking-wider">INTERESTS</h2>
              <ul className="text-xs text-gray-700 space-y-1">
                {interestItems.map((interest, idx) => (
                  <li key={idx}>• {interest}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* MAIN CONTENT - 7 columns */}
        <main className="col-span-7 space-y-5 pl-4">
          {/* Work Experience */}
          {workItems.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider border-b border-gray-400 pb-1">WORK EXPERIENCE</h2>
              <div className="space-y-5">
                {workItems.map((exp, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold pb-2">{exp.role}</h3>
                        <p className="italic">{exp.company}{exp.location && `, ${exp.location}`}</p>
                      </div>
                      <div className="text-right italic">
                        {exp.duration || `${formatYearMonth(exp.startDate)} – ${formatYearMonth(exp.endDate)}`}
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-1 mt-1 pl-1">
                      {exp.description?.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                      {!exp.description && idx === 0}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projectItems.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase text-gray-800 mb-3 tracking-wider border-b border-gray-400 pb-1">PROJECTS</h2>
              <div className="space-y-4">
                {projectItems.map((proj, idx) => (
                  <div key={idx} className="text-xs">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">{proj.title}</h3>
                      {proj.startDate && proj.endDate && (
                        <div className="text-right italic">
                          {formatYearMonth(proj.startDate)} – {formatYearMonth(proj.endDate)}
                        </div>
                      )}
                    </div>

                    <p className="mt-1 mb-1">{proj.description}</p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {(proj.gitHub || proj.github) && (
                        <a href={proj.gitHub || proj.github}
                          className="text-blue-600 hover:underline flex items-center text-xs">
                          <span>GitHub</span>
                        </a>
                      )}
                      {(proj.liveLink || proj.liveDemo) && (
                        <a href={proj.liveLink || proj.liveDemo}
                          className="text-blue-600 hover:underline flex items-center text-xs">
                          <span>Live Demo</span>
                        </a>
                      )}
                      {proj.technologies && (
                        <span className="text-gray-600">
                          <strong>Tech:</strong> {Array.isArray(proj.technologies)
                            ? proj.technologies.join(", ")
                            : String(proj.technologies)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TemplateThree;
