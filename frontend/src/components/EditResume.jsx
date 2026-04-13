import React, { useCallback, useEffect, useRef, useState } from 'react'
import DashboardLayout from './DashboardLayout'
import { buttonStyles, containerStyles, iconStyles, statusStyles } from '../assets/style'
import { TitleInput } from './Inputs'
import StepProgress from './StepProgress'
import {
  AdditionalInfoForm,
  CertificationInfoForm,
  ContactInfoForm,
  EducationDetailsForm,
  InternshipExperienceForm,
  ProfileInfoForm,
  ProjectDetailForm,
  SkillsInfoForm,
} from './Forms'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertCircle, ArrowLeft, Check, Download, Loader, Loader2, Palette, Save, Trash2 } from 'lucide-react'
import { API_PATHS } from '../utils/apiPaths'
import axiosInstance from '../utils/axiosinstance'
import toast from 'react-hot-toast'
import { captureElementAsImage, dataURLtoFile } from '../utils/helper'
import html2canvas from 'html2canvas'

import html2pdf from 'html2pdf.js'
import Modal from './Modal'
import ThemeSelector from './ThemeSelector'
import RenderResume from './RenderResume'

// RESIZE OBSERVER HOOK
const useResizeObserver = () => {
    const [size, setSize] = useState({ width: 0, height: 0});
    const ref = useCallback((node) => {
        if(node) {
            const resizeObserver = new ResizeObserver((entries) => {
                const { width, height } = entries[0].contentRect;
                setSize({ width, height });
            })

            resizeObserver.observe(node)
        }
    }, [])
    return { ...size, ref }
}

const EditResume = () => {

  const { resumeId } = useParams()
  const navigate = useNavigate()
  const resumeDownloadRef = useRef(null)
  const thumbnailRef = useRef(null)

  const [openThemeSelector, setOpenThemeSelector] = useState(false)
  const [openPreviewModal, setOpenPreviewModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("profile-info")
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [completionPercentage, setCompletionPercentage] = useState(0)

  const { width: previewWidth, ref: previewContainerRef } = useResizeObserver();

  const [resumeData, setResumeData] = useState({
    title: "Professional Resume",
    thumbnailLink: "",
    profileInfo: {
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "modern",
      colorPalette: []
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      gitHub: "",
      website: "",
    },
    summary: "",

    education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
    
      skills: {
        technical: [""],
        soft: [""],
      },
    
      projects: [
        {
          title: "",
          description: "",
          gitHub: "",
          liveLink: "",
        },
      ],
    
      internshipExperience: [
        {
          role: "",
          company: "",
          duration: "",
          description: "",
        },
      ],
    
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
    
      extraCurricular: [
        {
          activity: "",
          description: "",
        },
      ],
    
      languages: [""],
    
      interests: [""],
    })
  

  // Calculate completion percentage
  const calculateCompletion = () => {
    let completedFields = 0;
    let totalFields = 0;
  
    // Profile Info
    totalFields += 4;
    if (resumeData.profileInfo?.profilePreviewUrl) completedFields++;
    if (resumeData.profileInfo?.fullName) completedFields++;
    if (resumeData.profileInfo?.designation) completedFields++;
    if (resumeData.profileInfo?.summary) completedFields++;
  
    // Contact Info
    totalFields += 6;
    if (resumeData.contactInfo?.email) completedFields++;
    if (resumeData.contactInfo?.phone) completedFields++;
    if (resumeData.contactInfo?.location) completedFields++;
    if (resumeData.contactInfo?.linkedIn) completedFields++;
    if (resumeData.contactInfo?.gitHub) completedFields++;
    if (resumeData.contactInfo?.website) completedFields++;
  
    // Main Summary
    totalFields += 1;
    if (resumeData.summary?.trim() !== "") completedFields++;
  
    // Education
    resumeData.education?.forEach((edu) => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });
  
    // Skills (NEW STRUCTURE)
    const technicalSkills = resumeData.skills?.technical || [];
    const softSkills = resumeData.skills?.soft || [];
  
    totalFields += technicalSkills.length + softSkills.length;
  
    completedFields += technicalSkills.filter(
      (skill) => skill?.trim() !== ""
    ).length;
  
    completedFields += softSkills.filter(
      (skill) => skill?.trim() !== ""
    ).length;
  
    // Projects
    resumeData.projects?.forEach((project) => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.gitHub) completedFields++;
      if (project.liveLink) completedFields++;
    });
  
    // Internship Experience
    resumeData.internshipExperience?.forEach((intern) => {
      totalFields += 4;
      if (intern.role) completedFields++;
      if (intern.company) completedFields++;
      if (intern.duration) completedFields++;
      if (intern.description) completedFields++;
    });
  
    // Certifications
    resumeData.certifications?.forEach((cert) => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });
  
    // Extra Curricular
    resumeData.extraCurricular?.forEach((activity) => {
      totalFields += 2;
      if (activity.activity) completedFields++;
      if (activity.description) completedFields++;
    });
  
    // Languages (Now String Array)
    const languages = resumeData.languages || [];
    totalFields += languages.length;
    completedFields += languages.filter(
      (lang) => lang?.trim() !== ""
    ).length;
  
    // Interests
    const interests = resumeData.interests || [];
    totalFields += interests.length;
    completedFields += interests.filter(
      (interest) => interest?.trim() !== ""
    ).length;
  
    const percentage =
      totalFields === 0
        ? 0
        : Math.round((completedFields / totalFields) * 100);
  
    setCompletionPercentage(percentage);
    return percentage;
  };

  useEffect(() => {
    calculateCompletion();
  }, [resumeData]);

   // Validate Inputs
   const validateAndNext = (e) => {
    const errors = []

    switch (currentPage) {
      case "profile-info":
        const { fullName, designation, summary } = resumeData.profileInfo
        if (!fullName.trim()) errors.push("Full Name is required")
        if (!designation.trim()) errors.push("Designation is required")
        if (!summary.trim()) errors.push("Summary is required")
        break

      case "contact-info":
        const { email, phone } = resumeData.contactInfo
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Valid email is required.")
        if (!phone.trim() || !/^\d{10}$/.test(phone)) errors.push("Valid 10-digit phone number is required")
        break

      case "work-experience":
        resumeData.internshipExperience.forEach(({ company, role, duration, description }, index) => {
          const hasAnyValue = [company, role, duration, description].some((value) => value?.trim())

          if (!hasAnyValue) return

          if (!company || !company.trim()) errors.push(`Company is required in experience ${index + 1}`)
          if (!role || !role.trim()) errors.push(`Role is required in experience ${index + 1}`)
          if (!duration || !duration.trim()) errors.push(`Duration is required in experience ${index + 1}`)
        })
        break

      case "education-info":
        resumeData.education.forEach(({ degree, institution, startDate, endDate }, index) => {
          if (!degree.trim()) errors.push(`Degree is required in education ${index + 1}`)
          if (!institution.trim()) errors.push(`Institution is required in education ${index + 1}`)
          if (!startDate || !endDate) errors.push(`Start and End dates are required in education ${index + 1}`)
        })
        break

      case "skills":
        if (!resumeData.skills?.technical?.some((skill) => skill?.trim() !== "")) {
          errors.push("At least one technical skill is required")
        }
        if (!resumeData.skills?.soft?.some((skill) => skill?.trim() !== "")) {
          errors.push("At least one soft skill is required")
        }
        break

      case "projects":
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim()) errors.push(`Project Title is required in project ${index + 1}`)
          if (!description.trim()) errors.push(`Project description is required in project ${index + 1}`)
        })
        break

      case "certifications":
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim()) errors.push(`Certification Title is required in certification ${index + 1}`)
          if (!issuer.trim()) errors.push(`Issuer is required in certification ${index + 1}`)
        })
        break

      case "additionalInfo":
        if (resumeData.languages.length === 0 || !resumeData.languages[0]?.trim()) {
          errors.push("At least one language is required")
        }
        if (resumeData.interests.length === 0 || !resumeData.interests[0]?.trim()) {
          errors.push("At least one interest is required")
        }
        break

      default:
        break
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "))
      return
    }

    setErrorMsg("")
    goToNextStep()
  }

  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ]

    if (currentPage === "additionalInfo") setOpenPreviewModal(true)

    const currentIndex = pages.indexOf(currentPage)
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1
      setCurrentPage(pages[nextIndex])

      const percent = Math.round((nextIndex / (pages.length - 1)) * 100)
      setProgress(percent)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ]

    if (currentPage === "profile-info") navigate("/dashboard")

    const currentIndex = pages.indexOf(currentPage)
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentPage(pages[prevIndex])

      const percent = Math.round((prevIndex / (pages.length - 1)) * 100)
      setProgress(percent)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => updateSection("profileInfo", key, value)}
            onNext={validateAndNext}
          />
        )

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => updateSection("contactInfo", key, value)}
          />
        )

      case "work-experience":
        return (
          <InternshipExperienceForm
            internshipExperience={resumeData?.internshipExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("internshipExperience", index, key, value)
            }}
            addArrayItem={(newItem) => addArrayItem("internshipExperience", newItem)}
            removeArrayItem={(index) => removeArrayItem("internshipExperience", index)}
          />
        )

      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value)
            }}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        )

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateSkillArrayItem={(section, index, value) => {
              const updated = [...(resumeData.skills?.[section] || [])]
              updated[index] = value
              updateSection("skills", section, updated)
            }}
            addSkillItem={(section, value) => {
              const updated = [...(resumeData.skills?.[section] || []), value]
              updateSection("skills", section, updated)
            }}
            removeSkillItem={(section, index) => {
              const updated = [...(resumeData.skills?.[section] || [])]
              updated.splice(index, 1)
              updateSection("skills", section, updated.length ? updated : [""])
            }}
          />
        )

      case "projects":
        return (
          <ProjectDetailForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value)
            }}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        )

      case "certifications":
        return (
          <CertificationInfoForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("certifications", index, key, value)
            }}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) => removeArrayItem("certifications", index)}
          />
        )

      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={(section, index, key, value) => updateArrayItem(section, index, key, value)}
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) => removeArrayItem(section, index)}
          />
        )

      default:
        return null
    }
  }

  // UPDATE THE SECTION
  const updateSection = (section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
  }

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]]

      if (key === null) {
        updatedArray[index] = value
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        }
      }

      return {
        ...prev,
        [section]: updatedArray,
      }
    })
  }

  // ADDING NEW ITEM IE INFO
  const addArrayItem = (section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }))
  }

  // REMOVING THE INFO USING INDEX
  const removeArrayItem = (section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]]
      updatedArray.splice(index, 1)
      return {
        ...prev,
        [section]: updatedArray,
      }
    })
  }

  // FETCHING THE RESUME DETAILS USING BACKEND URL
  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId))

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data

        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          internshipExperience: resumeInfo?.internshipExperience || prevState?.internshipExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }))
      }
    } catch (error) {
      console.error("Error fetching resume:", error)
      toast.error("Failed to load resume data")
    }
  }

  const uploadResumeThumbnail = async () => {
    const thumbnailElement = thumbnailRef.current
    if (!thumbnailElement) {
      return null
    }

    const { width, height } = thumbnailElement.getBoundingClientRect()
    if (!width || !height) {
      return null
    }

    const thumbnailDataUrl = await captureElementAsImage(thumbnailElement)
    const thumbnailFile = dataURLtoFile(
      thumbnailDataUrl,
      `thumbnail-${resumeId}.png`
    )

    const formData = new FormData()
    formData.append("thumbnail", thumbnailFile)

    const uploadResponse = await axiosInstance.put(
      API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )

    return uploadResponse.data?.thumbnailLink || null
  }

  const handleSaveAndExit = async () => {
    try {
      setIsLoading(true)

      const latestCompletion = calculateCompletion()
      await updateResumeDetails(resumeData.thumbnailLink || "", latestCompletion)

      try {
        const thumbnailLink = await uploadResumeThumbnail()

        if (thumbnailLink) {
          await updateResumeDetails(thumbnailLink, latestCompletion)
        }
      } catch (thumbnailError) {
        console.error("Thumbnail upload failed:", thumbnailError)
      }

      toast.success("Resume updated successfully")
      navigate("/dashboard")
    } catch (error) {
      console.error("Error saving resume:", error)
      toast.error("Failed to save resume")
    } finally {
      setIsLoading(false)
    }
  }


  // THIS FUNCTION WILL HELP IN UPDATING THE RESUMES AND HELP UPDATION IN BACKEND
  const updateResumeDetails = async (thumbnailLink, completion = completionPercentage) => {
    try {
      const response = await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), {
        ...resumeData,
        thumbnailLink: thumbnailLink || resumeData.thumbnailLink || "",
        completion,
      })

      return response.data
    } catch (err) {
      console.error("Error updating resume:", err)
      throw err
    }
  }


  // DELETE FUNCTION TO DELETE ANY RESUME

  const handleDeleteResume = async () => {
    try {
      setIsLoading(true)
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId))
      toast.success("Resume deleted successfully")
      navigate("/dashboard")
    } catch (error) {
      console.error("Error deleting resume:", error)
      toast.error("Failed to delete resume")
    } finally {
      setIsLoading(false)
    }
  }

  // DOWNLOAD FUNCTION6
  const downloadPDF = async () => {
    const element = resumeDownloadRef.current;
    if (!element) {
      toast.error("Failed to generate PDF. Please try again.");
      return;
    }
  
    setIsDownloading(true);
    setDownloadSuccess(false);
    const toastId = toast.loading("Generating Pdf!");
  
    try {
      await html2pdf()
        .set({
          margin: 0,
          filename: `${resumeData.title.replace(/[^a-z0-9]/gi, "_")}.pdf`,
          image: { type: "png", quality: 1.0 },
          html2canvas: {
            scale: 5,
            useCORS: true,
            backgroundColor: "#FFFFFF",
            logging: false,
            letterRendering: true,
            windowWidth: 794,
            scrollX: 0,
            scrollY: 0,
            removeContainer: true,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            compress: false,
            putOnlyUsedFonts: true,
          },
          pagebreak: {
            mode: ["css", "legacy"],
          },
        })
        .from(element)
        .save();
  
      toast.success("PDF downloaded successfully!", { id: toastId });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
  
    } catch (err) {
      console.error("PDF error:", err);
      toast.error(`Failed to generate PDF: ${err.message}`, { id: toastId });
  
    } finally {
      setIsDownloading(false);
    }
  };

  // THEME SELECTOR
  const updateTheme = (theme) => {
    setResumeData(prev => ({
      ...prev,
      template: {
        theme: theme,
        colorPalette: []
      }
    }));
  }

  useEffect(() => {
    if (resumeId) {
      fetchResumeDetailsById()
    }
  }, [resumeId])


  return (
    <DashboardLayout>
    <div className={containerStyles.main}>
        <div className={containerStyles.header}>
            <TitleInput title={resumeData.title}
            setTitle={(value) => setResumeData((prev) => ({
                ...prev,
                title: value,
            }))
        }
        />

        <div className=' flex flex-wrap items-center gap-3'>
            <button onClick={() => setOpenThemeSelector(true)} className={buttonStyles.theme}>
                <Palette size={16} />
                <span className='text-sm'>Theme</span>
            </button>

            <button onClick={handleDeleteResume} className={buttonStyles.delete} disabled={isLoading}>
                <Trash2 size={16} />
                <span className='text-sm'>Delete</span>
            </button>

            <button onClick={() => setOpenPreviewModal(true)} className={buttonStyles.download}>
                <Download size={16} />
                <span className='text-sm'>Preview</span>
            </button>
        </div>
        </div>

        {/* STEP PROCESS */}
        <div className={containerStyles.grid}>
            <div className={containerStyles.formContainer}>
                <StepProgress progress={progress}/>
                {renderForm()}
                <div className="p-4 sm:p-6">
                    {errorMsg && (
                        <div className={statusStyles.error}>
                            <AlertCircle size={16} />
                            {errorMsg}
                        </div>
                    )}

                    <div className=" flex flex-wrap items-center justify-end gap-3">
                        <button className={buttonStyles.back} onClick={goBack} disabled={isLoading}>
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        <button className={buttonStyles.save} onClick={handleSaveAndExit} disabled={isLoading}>
                            {isLoading ? <Loader2 size={16} className=" animate-spin" />
                            : <Save size={16} />}
                            {isLoading ? "Saving.." : "Save & Exit"} 
                        </button>

                        <button className={buttonStyles.next} onClick={validateAndNext} disabled={isLoading}>
                            {currentPage === "additionalInfo" && <Download size={16} />}
                            {currentPage === "additionalInfo" ? "Preiew & Download" : "Next"}
                            {currentPage === "additionalInfo" && <ArrowLeft size={16} className=" rotate-180" />}
                        </button>
                    </div>
                </div>
            </div>

            <div className=" hidden lg:block">
                <div className={containerStyles.previewContainer}>
                    <div className="text-center mb-4">
                        <div className={statusStyles.completionBadge}>
                            <div className={iconStyles.pulseDot}></div>
                            <span>Preview - {completionPercentage}% Complete</span>
                        </div>
                    </div>

                    <div className="preview-container relative" ref={previewContainerRef}>
                        <div className={containerStyles.previewInner}>
                            <RenderResume key={`preview-${resumeData?.template?.theme}`}
                            templateId={resumeData?.template?.theme || ""}
                            resumeData={resumeData}
                            containerWidth={previewWidth}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* MODAL DATA HERE */}
    <Modal isOpen={openThemeSelector} onClose={() => setOpenThemeSelector(false)}
    title="Change Theme">
        <div className={containerStyles.modalContent}>
            <ThemeSelector selectedTheme={resumeData?.template.theme}
            setSelectedTheme={updateTheme} onClose={() => setOpenThemeSelector(false)}
            />
        </div>
    </Modal>

    <Modal isOpen={openPreviewModal} onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText={isDownloading ? "Generating..."
            : downloadSuccess ? "Downloaded!" : "Download PDF"}
            
            actionBtnIcon={
                isDownloading ? (
                    <Loader2 size={16} className="animate-spin" />
                ) : 
                downloadSuccess ? (
                    <Check size={16} className="text-white" />
                ) : (
                    <Download size={16} />
                )
            }
                onActionClick={downloadPDF}
            >

            <div className="relative">
                <div className="text-center mb-4">
                    <div className={statusStyles.modalBadge}>
                        <div className={iconStyles.pulseDot}></div>
                        <span>Completion: {completionPercentage}%</span>
                    </div>
                </div>

                <div className={containerStyles.pdfPreview}>
                    <div ref={resumeDownloadRef} className="pdf-export-root">
                        <div className="w-full">
                            <RenderResume key={`pdf-${resumeData?.template?.theme}`}
                            templateId={resumeData?.template?.theme || ""}
                            resumeData={resumeData}
                            containerWidth={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
     </Modal>

     {/* THUMBNAIL ERROR FIX */}
     <div
        ref={thumbnailRef}
        style={{ position: "absolute", left: "-9999px", top: 0, opacity: 0, pointerEvents: "none" }}
      >
        <div className={containerStyles.hiddenThumbnail}>
            <RenderResume key={`thumb-${resumeData?.template?.theme}`}
            templateId={resumeData?.template?.theme || ""}
            resumeData={resumeData}
            />
        </div>
     </div>
    </DashboardLayout>
  )
}

export default EditResume
