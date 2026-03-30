import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import womanImg from '../assets/woman.jpg'
import { landingPageStyles } from '../assets/style'

const About = () => {
  const navigate = useNavigate()
  const handleCTA = () => {
    navigate('/')
    window.dispatchEvent(new CustomEvent('open-auth-modal'))
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] overflow-x-hidden">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-8">
        {/* Tag */}
        <div className="mb-2">
          <span className="text-sm font-medium text-[#3276FD] bg-blue-50 px-3 py-1 rounded-full">
            / About
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <h1 className="text-5xl font-bold text-[#191919] whitespace-nowrap leading-tight">
            The <i className="text-[#3276FD]">WHY</i>
          </h1>
        </div>

        {/* Vision + Mission */}
        <div className="flex flex-col md:flex-row gap-16 mb-20 mt-8">
          <div className="flex-1 h-full bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-1 w-10 bg-[#3276FD] rounded-full mb-4"></div>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[#191919] leading-snug">Our Vision</h2>
            <p className="mt-3 text-[15px] text-[#6F7580] leading-relaxed max-w-md">
              To redefine how students build resumes by making the process intelligent,
              personalized, and aligned with real-world hiring expectations.
            </p>
          </div>
          <div className="flex-1 h-full bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-1 w-10 bg-[#3276FD] rounded-full mb-4"></div>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[#191919] leading-snug">Our Mission</h2>
            <p className="mt-3 text-[15px] text-[#6F7580] leading-relaxed max-w-md">
              To enable students to create role-specific, high-impact resumes by leveraging
              AI-driven job description analysis and guided content generation.
            </p>
          
          </div>
        </div>
      </main>


      <main className="max-w-5xl mx-auto px-6 pb-4 -mt-4">
        {/* The WHAT section */}
        <div className="mb-4">
          <h1 className="text-5xl font-bold text-[#191919] whitespace-nowrap leading-tight mb-6">
            The <i className="text-[#3276FD]">WHAT</i>
          </h1>
          
          <div className="w-full bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 p-8 mb-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-1 w-10 bg-[#3276FD] rounded-full mb-3"></div>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[#191919] leading-snug">The Problem</h2>
            
            <p className="mt-3 text-[15px] text-[#6F7580] leading-relaxed ">
            Students struggle to build role-specific resumes, often relying on generic templates and copy-paste methods without understanding recruiter expectations. </p>

          </div>
          <div className="w-full bg-blue-50 rounded-2xl border border-blue-100 p-5 text-md text-[#3276FD] font-medium mb-8 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            ResumeGuide identifies and bridges this gap
          </div>
          <div className="w-full bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 p-8 mt-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-1 w-10 bg-[#3276FD] rounded-full mb-3"></div>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-[#191919] leading-snug">The Solution</h2>
           
            <p className="mt-3 text-[15px] text-[#6F7580] leading-relaxed ">
            An AI-powered platform that analyzes job descriptions to provide targeted keywords, structured guidance, and actionable insights for building tailored, high-impact resumes. </p>

          </div>
        </div>

        {/* The Story section */}
        <div className="border-t border-gray-100 pt-16 mt-16">

          {/* Center Heading */}
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-[#3276FD] bg-blue-50 px-3 py-1 rounded-full">
              / The Story
            </span>

            <h2 className="mt-4 text-5xl font-bold text-[#191919] leading-snug">
              It started with a <i className="text-[#3276FD]">blank page</i>
            </h2>

            <p className="mt-1 text-base text-gray-400 leading-relaxed">
              And a deadline that wouldn't wait.
            </p>
          </div>

          {/* Content Row */}
          <div className="flex flex-col md:flex-row md:items-stretch gap-12">

            {/* Left Image */}
            <div className="flex-1 w-full">
              <img src={womanImg} alt="Story visual" className="w-full h-full object-cover rounded-lg" />
            </div>

            {/* Right Content */}
            <div className="flex-1 w-full flex flex-col text-lg text-[#6F7580] leading-relaxed text-justify">

              <div className="flex flex-col gap-5">
                <p>Every great product starts with a reason. Ours started with a student staring at a blank page, unsure what to write, how to format it, or whether it even mattered.</p>
                <p>Most resume builders are built for professionals with years of experience. Students are left to figure it out on their own copying templates that don't fit, writing bullet points that don't land, and sending resumes that never come back.</p>
                <p>ResumeGuide was built to change that. A simpler flow, student-friendly guidance, and AI that helps you say the right things so <span className="text-[#191919] font-semibold">you can focus on building your future, not formatting your past.</span></p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="w-full min-h-[36vh] bg-[#1a1a1a] px-6 py-14 md:py-18 flex flex-col items-center justify-center text-center gap-4 mt-24">
        <h2 className="max-w-3xl text-4xl md:text-5xl font-bold text-white leading-snug">
          Let&apos;s take your first step.<br />Shall we?
        </h2>
        <p className="max-w-xl text-xs md:text-base text-gray-400 italic leading-relaxed">
          You don&apos;t need everything{' '}
          <span className="font-medium text-white">figured out</span>{' '}to begin with.
        </p>
        <button onClick={handleCTA} className={`${landingPageStyles.primaryButton} mt-8`}>
          <div className={landingPageStyles.primaryButtonOverlay}></div>
          <span className={landingPageStyles.primaryButtonContent}>Start Building</span>
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full px-10 pt-10 pb-6">
        <div className="max-w-7xl mx-auto border-t border-gray-200 pt-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">Copyright © 2026 Resume Guide. All rights reserved.</p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <a href="#" className="hover:text-[#191919] transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-[#191919] transition-colors">Terms Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default About
