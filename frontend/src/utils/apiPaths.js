export const BASE_URL = 'https://resumeguide.onrender.com'

// Routes used for frontend
export const API_PATHS = {

    AUTH: {
        REGISTER: '/api/auth/register',
        LOGIN: '/api/auth/login',
        GET_PROFILE: '/api/auth/profile',
    },
    RESUME: {
        CREATE: '/api/resume',
        GET_ALL: '/api/resume',
        GET_BY_ID: (id) => `/api/resume/${id}`,

        UPDATE: (id) => `/api/resume/${id}`,
        DELETE: (id) => `/api/resume/${id}`,
        UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
    },
    AI: {
        ANALYZE_JOB_DESCRIPTION: '/api/job-description/analyze',
    },
    image: {
        UPLOAD_IMAGE: 'api/auth/uplaod-image'
    }
}
