import Resume1 from "../assets/Resume1.png"
import Resume2 from "../assets/Resume2.png"
import Resume3 from "../assets/Resume3.png"

export const resumeTemplates = [
    {
        id: "01",
        thumbnailImg: Resume1,
        colorPaletteCode: "themeOne"
    },
    {
        id: "02",
        thumbnailImg: Resume2,
        colorPaletteCode: "themeTwo"
    },
    {
        id: "03",
        thumbnailImg: Resume3,
        colorPaletteCode: "themeThree"
    },
]

export const DUMMY_RESUME_DATA = {
    title: "Professional Resume",
    thumbnailLink: "",
    template: {
        theme: "modern",
        colorPalette: [],
    },
    profileInfo: {
        profilePreviewUrl: "",
        fullName: "Alex Johnson",
        designation: "Senior Software Developer",
        summary: "Full-stack developer with 5+ years of experience building scalable web applications using modern JavaScript frameworks. Specialized in React, Node.js, and cloud technologies with a strong focus on clean code architecture and performance optimization.",
    },
    contactInfo: {
        email: "alex.johnson.dev@gmail.com",
        phone: "5551234567",
        location: "San Francisco, CA",
        linkedIn: "https://linkedin.com/in/alexjohnson-dev",   // matches model: linkedIn
        gitHub: "https://github.com/alexjohnson-code",          // matches model: gitHub
        website: "https://alexjohnson.dev",
    },
    summary: "Full-stack developer with 5+ years of experience building scalable web applications.",

    education: [
        {
            degree: "Master of Science in Computer Science",
            institution: "Stanford University",
            startDate: "2016-09",
            endDate: "2018-06",
        },
        {
            degree: "Bachelor of Science in Software Engineering",
            institution: "University of California, Berkeley",
            startDate: "2012-09",
            endDate: "2016-06",
        },
    ],

    // matches model: skills: { technical: [String], soft: [String] }
    skills: {
        technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL"],
        soft: ["Communication", "Team Leadership", "Problem Solving", "Agile", "Mentoring"],
    },

    // matches model: projects[{ title, description, gitHub, liveLink }]
    projects: [
        {
            title: "E-commerce Analytics Dashboard",
            description: "Built a real-time analytics dashboard for e-commerce clients to track sales, inventory, and customer behavior using React and D3.js.",
            gitHub: "https://github.com/alexjohnson-code/ecommerce-analytics",
            liveLink: "https://demo.alexjohnson.dev/analytics",
        },
        {
            title: "AI-Powered Code Review Tool",
            description: "Developed a machine learning tool that analyzes pull requests and suggests code improvements using Python and TensorFlow.",
            gitHub: "https://github.com/alexjohnson-code/ai-code-review",
            liveLink: "",
        },
    ],

    // matches model: internshipExperience[{ role, company, duration, description }]
    internshipExperience: [
        {
            role: "Software Engineering Intern",
            company: "TechSolutions Inc.",
            duration: "Jun 2020 - Dec 2020",
            description: "Led development of a SaaS platform feature serving 50,000+ users. Architected microservices using Node.js and React.",
        },
        {
            role: "Frontend Developer Intern",
            company: "InnovateSoft",
            duration: "Jul 2018 - May 2020",
            description: "Developed RESTful APIs and redesigned legacy frontend using React, improving page load speed by 60%.",
        },
    ],

    // matches model: certifications[{ title, issuer, year }]
    certifications: [
        {
            title: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            year: "2022",
        },
        {
            title: "Google Professional Cloud Architect",
            issuer: "Google",
            year: "2021",
        },
        {
            title: "Certified Scrum Master",
            issuer: "Scrum Alliance",
            year: "2020",
        },
    ],

    // matches model: extraCurricular[{ activity, description }]
    extraCurricular: [
        {
            activity: "Open Source Contributions",
            description: "Actively contribute to open source projects on GitHub, focusing on developer tooling and React libraries.",
        },
        {
            activity: "Tech Community Meetups",
            description: "Organize and speak at local JavaScript meetups, sharing knowledge on modern web development practices.",
        },
    ],

    // matches model: languages: [String]
    languages: ["English", "Spanish", "French"],

    // matches model: interests: [String]
    interests: ["Machine Learning", "Blockchain Technology", "Hiking", "Photography", "Open Source"],
};

// IN THIS FILE YOU WILL HAVE DUMMY DATA ONLY