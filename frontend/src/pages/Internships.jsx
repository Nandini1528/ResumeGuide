import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { landingPageStyles } from '../assets/style'

const Internships = () => {
  const navigate = useNavigate()
  const handleCTA = () => {
    window.dispatchEvent(new CustomEvent('open-auth-modal'))
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-sm text-gray-400 hover:text-[#191919] transition-colors flex items-center gap-1 cursor-pointer"
        >
          ← Back
        </button>

        <div className="mb-3">
          <span className="text-sm font-medium text-[#3276FD] bg-blue-50 px-3 py-1 rounded-full">
            / Internships & Training
          </span>
        </div>

        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#191919] leading-tight">
            Your resume is your <i className="text-[#3276FD]">first impression.</i>
          </h1>

          
        </div>

      

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-1 w-10 bg-[#3276FD] rounded-full mb-4"></div>
            <h3 className="mt-2 text-2xl font-semibold text-[#191919] leading-snug">
              What to include
            </h3>
            <p className="mt-3 text-[15px] text-[#6F7580] leading-relaxed">
              Add education, projects, skills, certifications, and coursework.
              That is enough to build a strong student resume.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-1 w-10 bg-[#3276FD] rounded-full mb-4"></div>
            <h3 className="mt-2 text-2xl font-semibold text-[#191919] leading-snug">
              Keep it focused
            </h3>
            <p className="mt-3 text-[15px] text-[#6F7580] leading-relaxed">
              Keep it to one page with clear sections, clean spacing, and only
              relevant details.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-200 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="h-1 w-10 bg-[#3276FD] rounded-full mb-4"></div>
            <h3 className="mt-2 text-2xl font-semibold text-[#191919] leading-snug">
              Tailor the message
            </h3>
            <p className="mt-3 text-[15px] text-[#6F7580] leading-relaxed">
              Match your skills and keywords to the role. A tailored resume always
              feels stronger than a generic one.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-16 mt-16">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-[#3276FD] bg-blue-50 px-3 py-1 rounded-full">
              / Why It Matters
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[#191919] leading-snug">
              Opportunities move <i className="text-[#3276FD]">fast.</i>
            </h2>

            <p className="mt-4 text-sm md:text-base text-[#6F7580] leading-relaxed">
              Sometimes the deadline appears before you feel prepared. Having a
              resume ready means you can apply sooner, tweak faster, and show up
              with more confidence when the right opening appears.
            </p>
          </div>
        </div>

      </main>

      <section className="w-full min-h-[36vh] bg-[#1a1a1a] px-6 py-14 md:py-18 flex flex-col items-center justify-center text-center gap-4 mt-8">
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

export default Internships
