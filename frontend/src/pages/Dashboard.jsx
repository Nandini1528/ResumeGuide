import React, { useEffect, useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { dashboardStyles as styles } from '../assets/style'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import { LucideFilePlus, LucideTrash2 } from 'lucide-react'
import { ResumeSummaryCard } from '../components/Cards'

import toast from 'react-hot-toast'
import moment from 'moment'
import Modal from '../components/Modal'
import CreateResumeForm from '../components/CreateResumeForm'

const Dashboard = () => {

    const navigate =  useNavigate();
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [allResumes, setAllResumes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [resumeToDelete, setResumeToDelete] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

        // Calculate completion percentage for a resume
const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;
  
    // Profile Info
    totalFields += 4;
    if (resume.profileInfo?.profilePreviewUrl) completedFields++;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;
  
    // Contact Info
    totalFields += 6;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;
    if (resume.contactInfo?.location) completedFields++;
    if (resume.contactInfo?.linkedIn) completedFields++;
    if (resume.contactInfo?.gitHub) completedFields++;
    if (resume.contactInfo?.website) completedFields++;
  
    // Main Summary (separate field in schema)
    totalFields += 1;
    if (resume.summary?.trim() !== "") completedFields++;
  
    // Education
    resume.education?.forEach((edu) => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });
  
    // Skills
    const technicalSkills = resume.skills?.technical || [];
    const softSkills = resume.skills?.soft || [];
  
    totalFields += technicalSkills.length + softSkills.length;
  
    completedFields += technicalSkills.filter(
      (skill) => skill?.trim() !== ""
    ).length;
  
    completedFields += softSkills.filter(
      (skill) => skill?.trim() !== ""
    ).length;
  
    // Projects
    resume.projects?.forEach((project) => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.gitHub) completedFields++;
      if (project.liveLink) completedFields++;
    });
  
    // Internship Experience
    resume.internshipExperience?.forEach((intern) => {
      totalFields += 4;
      if (intern.role) completedFields++;
      if (intern.company) completedFields++;
      if (intern.duration) completedFields++;
      if (intern.description) completedFields++;
    });
  
    // Certifications
    resume.certifications?.forEach((cert) => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });
  
    // Extra Curricular
    resume.extraCurricular?.forEach((activity) => {
      totalFields += 2;
      if (activity.activity) completedFields++;
      if (activity.description) completedFields++;
    });
  
    // Languages
    const languages = resume.languages || [];
    totalFields += languages.length;
    completedFields += languages.filter(
      (lang) => lang?.trim() !== ""
    ).length;
  
    // Interests
    const interests = resume.interests || [];
    totalFields += interests.length;
    completedFields += interests.filter(
      (interest) => interest?.trim() !== ""
    ).length;
  
    if (totalFields === 0) return 0;
  
    return Math.round((completedFields / totalFields) * 100);
  };
        // IT WILL SHOW IF COMPLETED OR FILLED IT WILL DO ++

        const fetchAllResumes = async () => {
            try {
                setLoading(true)
            const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL)
            // ADD COMPLETION PERCENTAGE TO EACH RESUMES
            const resumesWithCompletion = response.data.map(resume => ({
                ...resume,
                completion: calculateCompletion(resume)
            }))

            setAllResumes(resumesWithCompletion)
                
            } 

            catch (error) {
                console.error('Error fetching resumes:', error)  
            }
            finally {
                setLoading(false)
            }
            
        }

        useEffect(() => {
            fetchAllResumes()
        }, []);

        const handleDeleteResume = async () => {
            if(!resumeToDelete) {
                toast.error('No resume selected for deletion')
                return;
            }

            try {
                await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete))
                toast.success('Resume deleted successfully')
                await fetchAllResumes()
            }

            catch (error) {
                console.error('Error deleting resume:', error)
                toast.error(error.response?.data?.message || 'Failed to delete resume')

            }
            finally{
                setResumeToDelete(null)
                setShowDeleteConfirm(false)
            }
        }

        const handleDeleteClick = (id) => {
            setResumeToDelete(id);
            setShowDeleteConfirm(true);
        }


  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>

            <div>
                <h1 className={styles.headerTitle}>My Resumes</h1>
                <p className={styles.headerSubtitle}>
                    {allResumes.length > 0 ? `You have ${allResumes.length} resumes${allResumes.length !== 1 ? 's' : ''}`
                     : 'Start building your professional resume'}
                </p>
            </div>
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && allResumes.length === 0 && (
        <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
                <LucideFilePlus size={32} className=' text-[#3276FD]' />
            </div>

            <h3 className={styles.emptyTitle}>No Resumes Yet</h3>
            <p className={styles.emptyText}>
                You haven't created any resumes yet. Start building your professional resume to land your
                dream job.
            </p>

            <button className={styles.createButton} onClick={() => setOpenCreateModal(true)}>
                <div className={styles.createButtonOverlay}>
                </div>
                <span className={styles.createButtonContent}>
                    Create Your First Resume
                    <LucideFilePlus size={20} className='group-hover:translate-x-1 transition-transform' />
                </span>
            </button>
        </div>
      )}

      {/* GRID VIEW */}
      {!loading && allResumes.length > 0 && (
        <div className={styles.grid}>
            <div className={styles.newResumeCard} onClick={() => setOpenCreateModal(true)}>
                <div className={styles.newResumeIcon}>
                    <LucideFilePlus size={32} className=' text-white' />
                </div>
                <h3 className={styles.newResumeTitle}>Create New Resume</h3>
                <p className={styles.newResumeText}>Start building your career</p>
            </div>
            {allResumes.map((resume) => (
                <ResumeSummaryCard key={resume._id} imgUrl={resume.thumbnailLink}
                title={resume.title} createdAt={resume.createdAt} updatedAt={resume.updatedAt}
                onSelect={() => navigate(`/resume/${resume._id}`)}
                onDelete={() => handleDeleteClick(resume._id)}
                completion={resume.completion || 0}
                isPremium={resume.isPremium}
                isNew={moment().diff(moment(resume.createdAt), 'days') < 7 }
                />
            ))}
        </div>
      )}

      {/* CREATE MODAL */}
      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)}
      hideHeader maxWidth="max-w-2xl">
        <div className=' p-6 '>
        <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Create New Resume</h3>
        </div>
        <CreateResumeForm onSuccess={() => {
            setOpenCreateModal(false);
            fetchAllResumes();
        }} />
    </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title='Confirm Deletion'
        showActionBtn actionBtnText='Delete' actionBtnClassName = '!bg-none !bg-[#3276FD] hover:!bg-blue-700'
        onActionClick={handleDeleteResume}>

            <div className=' p-4 '>
                <div className=' flex flex-col items-center text-center'>
                    <div className={styles.deleteIconWrapper}>
                        <LucideTrash2 className=' text-orange-600' size={24} />
                    </div>

                    <h3 className={styles.deleteTitle}>Delete Resume?</h3>
                    <p className={styles.deleteText}>
                        Are you sure you want to delete this resume? This action cannot be undone.
                    </p>
                </div>
            </div>
        </Modal>

    
    </DashboardLayout>
  )
}

export default Dashboard
