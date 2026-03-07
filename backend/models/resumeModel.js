import mongoose from 'mongoose'

const ResumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnailLink: {
        type: String
    },
    template: {
        theme: String,
        colorPalette: [String]
    },

    profileInfo: {
        profilePreviewUrl: String,
        fullName: String,
        designation: String,
        summary: String,
    },

    contactInfo: {
        email: String,
        phone: String,
        location: String,
        linkedIn: String,
        gitHub: String,
        website: String,
    },

    summary: {
        type: String,
        default: '',
        trim: true,
    },

    education: [
        {
            degree: String,
            institution: String,
            startDate: String,
            endDate: String,
        },
    ],

    skills: {
        technical: [String],
        soft: [String],
    },

    projects: [
        {
            title: String,
            description: String,
            gitHub: String,
            liveLink: String,
        },
    ],

    internshipExperience: [
        {
            role: String,
            company: String,
            duration: String,
            description: String,
        },
    ],

    certifications: [
        {
            title: String,
            issuer: String,
            year: String,
        },
    ],

    extraCurricular: [
        {
            activity: String,
            description: String,
        },
    ],

    languages: [String],


    interests: [String],
},
{
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt" }
}
);

export default mongoose.model("Resume", ResumeSchema)
