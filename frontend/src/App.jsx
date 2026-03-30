import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import EditResume from './components/EditResume'
import UserProvider from './context/UserContext'
import { Toaster } from 'react-hot-toast'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Faqs from './pages/Faqs'
import Internships from './pages/Internships'
import Hackathons from './pages/Hackathons'
import Clubs from './pages/Clubs'
import StartingEarly from './pages/StartingEarly'
import JobDescriptionAnalyzer from './pages/JobDescriptionAnalyzer'
import Chatbot from './components/Chatbot'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <UserProvider>
    <ScrollToTop />
    <Routes>
      <Route path= '/' element={<LandingPage />} />
      <Route path='/about' element={<About />} />
      <Route path='/how-it-works' element={<HowItWorks />} />
      <Route path='/faqs' element={<Faqs />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/resume/:resumeId' element={<EditResume />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/faqs" element={<Faqs />} />
      <Route path="/internships" element={<Internships />} />
      <Route path="/hackathons" element={<Hackathons />} />
      <Route path="/clubs" element={<Clubs />} />
      <Route path="/starting-early" element={<StartingEarly />} />
      <Route path="/analyze-job-description" element={<JobDescriptionAnalyzer />} />
    </Routes>
    <Chatbot />
    <Toaster toastOptions={{
      className: "",
      style: {
        fontSize: "13px"
      }
    }}>
      
    </Toaster>
    </UserProvider>
  )
}

export default App
