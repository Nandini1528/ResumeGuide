import Resume from '../models/resumeModel.js'
import fs from 'fs'
import path from 'path';


export const createResume = async (req, res) => {
    try {
       const { title } = req.body;
       
       // DEFAULT TEMPLATE
       const defaultResumeData = {
        profileInfo: {
            profileImg: null,
            profilePreviewUrl: '',
            fullName: '',
            designation: '',
            summary: '',
        },
        contactInfo: {
            email: '',
            phone: '',
            location: '',
            linkedIn: '',
            gitHub: '',
            website: '',
        },
        summary: '',
        education: [
            {
                degree: '',
                institution: '',
                startDate: '',
                endDate: '',
            },
        ],
        skills: {
            technical: [],
            soft: [],
        },
        projects: [
            {
                title: '',
                description: '',
                gitHub: '',
                liveLink: '',
            },
        ],
        internshipExperience: [
            {
                role: '',
                company: '',
                duration: '',
                description: '',
            },
        ],
        certifications: [
            {
                title: '',
                issuer: '',
                year: '',
            },
        ],
        languages: [''],
        interests: [''],
    };

    const newResume = await Resume.create({
        userId: req.user._id,
        title,
        ...defaultResumeData,
        ...req.body
    })
    res.status(201).json(newResume)
    } 
    
    catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message})
        
    }
}

// GET FUNCTION
export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({
            updateAt: -1
        });
        res.json(resumes)
    } 
    
    catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message})  
    }
    
}

// GET RESUME BY ID
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }
        res.json(resume)
    } 
    catch (error) {
        res.status(500).json({ message: "Failed to get resumes", error: error.message})
    }
    
}

// UPADTE RESUMES
export const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!resume) {
            return res.status(404).json({ message: "Resume not found or not authorized" })
        }

        // MERGE UPDATED RESUMES
        Object.assign(resume, req.body)
        // SAVE UPDATED RESUMES
        const savedResume = await resume.save();
        res.json(savedResume)
    } 
    catch (error) {
        res.status(500).json({ message: "Failed to update resumes", error: error.message})
 
    }
    
}

// DELETE RESUME
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!resume) {
            return res.status(404).json({ message: "Resume not found or not authorized" })   
        }

        // CREATE A UPLOADS FOLDER AND STORE THE RESUME THERE
        const uploadsFolder = path.join(process.cwd(), 'uploads')

        // DELETE THUMBNAIL FUNCTION
        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink))
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail)
            }
        }

        if(resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.profilePreviewUrl)
            )
            if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile)
            }
        }

        // DELETE THE RESUME DOCUMENT
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        })
        if (!deleted) {
            return res.status(404).json({ message: "Resume not found or not authorized" })   
        }
        res.json({ message: "Resume deleted successfully "})
    } 
    catch (error) {
        res.status(500).json({ message: "Failed to delete resume", error: error.message})

    }
    
}
