import React, { useContext, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { landingPageStyles } from '../assets/style'
import { Atom, LayoutTemplate, X, Menu, Zap, Download } from 'lucide-react';
import { UserContext } from '../context/UserContext';
import { ProfileInfoCard } from '../components/Cards';
import video from '../assets/video.mp4';
import Navbar from '../components/Navbar';
import internshipImg from '../assets/internshipImg.jpg'
import hackathonImg from '../assets/hackathon.jpg'
import clubsImg from '../assets/clubs.jpg'
import startingImg from '../assets/starting.jpg'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'
import img4 from '../assets/4.jpg'
import img5 from '../assets/5.jpg'
import img6 from '../assets/6.jpg'
import img7 from '../assets/7.jpg'
import { Sparkles } from "lucide-react";

const LandingPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  
  const [isVideoBlurred, setIsVideoBlurred] = useState(false)
  const featuresSectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!featuresSectionRef.current) return

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const { top } = featuresSectionRef.current.getBoundingClientRect()

      const shouldBlur = top < viewportHeight * 0.7
      setIsVideoBlurred(prev => (prev === shouldBlur ? prev : shouldBlur))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      // dispatch a custom event Navbar listens to
      window.dispatchEvent(new CustomEvent('open-auth-modal'))
    }
  }

  return (
    <div className={landingPageStyles.container}>

      <Navbar></Navbar>

      {/* MAIN CONTENT */}
      <main className={landingPageStyles.main}>
        <section className={landingPageStyles.heroSection}>
          <div className={landingPageStyles.heroGrid}>
          {/* LEFT CONTENT */}
          <div className={landingPageStyles.heroLeft}>
            <div className={landingPageStyles.tagline}>
            </div>

            <h1 className={landingPageStyles.heading}>
  <span className={`${landingPageStyles.headingText} block md:whitespace-nowrap`}>
    Everyone starts somewhere.
  </span>

  <span className={`${landingPageStyles.headingText} block`}>
    This is <span className={landingPageStyles.headingGradient}>Yours.</span>
  </span>
</h1>
            <p className={landingPageStyles.description}>
              Made for students who don’t know where to start.
              <br />
              No experience? That’s okay. <span className="font-regular text-[#191919]">We’ve got you.</span>
            </p>

            <div className={landingPageStyles.ctaButtons}>
              <button
                className={`${landingPageStyles.secondaryButton} min-w-[260px] sm:min-w-[300px]`}
                onClick={handleCTA}
              >
                Let’s Build
              </button>

              <button
                className={`${landingPageStyles.secondaryButton} min-w-[260px] sm:min-w-[300px] flex items-center justify-center gap-2`}
                onClick={() => navigate('/analyze-job-description')}
              >
              <Sparkles size={18} />
                 Analyze Job Description
              </button>
            </div>

          </div>

          {/* FANNED CARDS */}
<div className="flex justify-center items-center py-20">
  <style>{`
    .fan-cards {
      position: relative;
      width: 320px;
      height: 300px;
      cursor: pointer;
    }
    .fan-card {
      position: absolute;
      width: 200px;
      height: 260px;
      border-radius: 16px;
      top: 0;
      left: 50%;
      transform-origin: bottom center;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      overflow: hidden;
      box-sizing: border-box;
    }
    .fan-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }

    .fan-card:nth-child(1) { transform: translateX(-50%) rotate(-22deg) translateY(24px); z-index: 1; }
    .fan-card:nth-child(2) { transform: translateX(-50%) rotate(-14deg) translateY(14px); z-index: 2; }
    .fan-card:nth-child(3) { transform: translateX(-50%) rotate(-6deg)  translateY(6px);  z-index: 3; }
    .fan-card:nth-child(4) { transform: translateX(-50%) rotate(0deg)   translateY(0px);  z-index: 7; }
    .fan-card:nth-child(5) { transform: translateX(-50%) rotate(6deg)   translateY(6px);  z-index: 3; }
    .fan-card:nth-child(6) { transform: translateX(-50%) rotate(14deg)  translateY(14px); z-index: 2; }
    .fan-card:nth-child(7) { transform: translateX(-50%) rotate(22deg)  translateY(24px); z-index: 1; }

    .fan-cards:hover .fan-card:nth-child(1) { transform: translateX(calc(-50% - 360px)) rotate(-30deg) translateY(34px); }
    .fan-cards:hover .fan-card:nth-child(2) { transform: translateX(calc(-50% - 240px)) rotate(-20deg) translateY(18px); }
    .fan-cards:hover .fan-card:nth-child(3) { transform: translateX(calc(-50% - 120px)) rotate(-8deg)  translateY(6px); }
    .fan-cards:hover .fan-card:nth-child(4) { transform: translateX(-50%)               rotate(0deg)   translateY(0px); }
    .fan-cards:hover .fan-card:nth-child(5) { transform: translateX(calc(-50% + 120px)) rotate(8deg)   translateY(6px); }
    .fan-cards:hover .fan-card:nth-child(6) { transform: translateX(calc(-50% + 240px)) rotate(20deg)  translateY(18px); }
    .fan-cards:hover .fan-card:nth-child(7) { transform: translateX(calc(-50% + 360px)) rotate(30deg)  translateY(34px); }
  `}</style>

  <div className="fan-cards">
    {[img1, img2, img3, img4, img5, img6, img7].map((src, idx) => (
      <div key={idx} className="fan-card">
        <img src={src} alt={`Resume template ${idx + 1}`} />
      </div>
    ))}
  </div>
</div>
                         
                </div>            
        </section>



        {/* FEATURES SECTION */}
{/* FEATURES SECTION */}
<section
  ref={featuresSectionRef}
  className="relative z-10 px-6 pt-24 pb-16 max-w-7xl mx-auto"
>
  {/* Section Header */}
  <div
    className={`mb-10 lp-features-over-video-title ${isVideoBlurred ? 'lp-features-over-video-title--visible' : ''}`}
  >
    <h2 className="text-3xl md:text-4xl font-bold text-[#191919]">
      Why you should do this NOW?
    </h2>
    <p className="mt-2 text-gray-400 text-base">
      You'll need the resume{' '}
      <span className="font-normal text-[#191919]">sooner than you think.</span>
    </p>
  </div>

  {/* Cards - horizontal scroll with peek */}
  <div className="flex gap-5 overflow-x-auto pb-4 custom-scrollbar snap-x snap-mandatory -mx-6 px-6">
    {[
      {
        icon: <Zap size={15} />,
        title: "Internships &\nTraining Programs",
        description: "Most applications ask for a resume upfront.",
        path: "/internships",
        image: internshipImg
      },
      {
        icon: <LayoutTemplate size={15} />,
        title: "Hackathons &\nCompetitions",
        description: "You'll often need one to register.",
        path: "/hackathons",
        image: hackathonImg
      },
      {
        icon: <Download size={15} />,
        title: "Clubs &\nCollege Opportunities",
        description: "Most applications ask for a resume upfront.",
        path: "/clubs",
        image: clubsImg
      },
      {
        icon: <Zap size={15} />,
        title: "Starting\nHelps Early",
        description: "The earlier you start, the better it gets.",
        path: "/starting-early",
        image: startingImg
      },
    ].map((card, idx) => (
      <div
        key={idx}
        className="
          snap-start shrink-0
          w-[280px] md:w-[320px]
          bg-white border border-gray-200 rounded-3xl
          overflow-hidden flex flex-col
          hover:shadow-lg hover:-translate-y-1
          transition-all duration-200
        "
      >
        {/* Card Top — text content */}
        <div className="p-5 flex flex-col gap-2.5">

          {/* Title row + bookmark */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-normal text-[#191919] text-lg leading-snug whitespace-pre-line">
              {card.title}
            </h3>
            <div className="shrink-0 p-2 rounded-lg bg-gray-100 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15" height="15"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-xs leading-relaxed">
            {card.description}
          </p>

          {/* Action button */}
          <button
            onClick={() => navigate(card.path)}
            className="
              mt-3 w-fit
              px-4 py-1.5 rounded-lg
              bg-[#191919] text-white
              text-xs font-semibold
              hover:bg-gray-800
              transition-colors duration-150
              cursor-pointer
            "
          >
            Learn more
          </button>
        </div>

        {/* Card Bottom — image, flush to edges */}
        <div className="mt-auto mx-3 mb-3 rounded-2xl overflow-hidden h-56">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    ))}
  </div>
</section>

        {/* CTA Section */}
<section className="w-full min-h-[36vh] bg-[#1a1a1a] px-6 py-14 md:py-18 flex flex-col items-center justify-center text-center gap-4">

  <h2 className="max-w-3xl text-4xl md:text-5xl font-bold text-white leading-snug">
    Let's take your first step.
    <br />
    Shall we?
  </h2>

  <p className="max-w-xl text-xs md:text-base text-gray-400 italic leading-relaxed">
    You don't need everything{' '}
    <span className="font-medium text-white">figured out</span>
    {' '}to begin with.
  </p>

  <button
    onClick={handleCTA}
    className={`${landingPageStyles.primaryButton} mt-8`}
  >
    <div className={landingPageStyles.primaryButtonOverlay}></div>
    <span className={landingPageStyles.primaryButtonContent}>Start Building</span>
  </button>

</section>

      </main>

      {/* FOOTER SECTION */}
<footer className="w-full px-10 pt-10 pb-6">
  <div className="max-w-7xl mx-auto border-t border-gray-200 pt-6 flex items-center justify-between">
    <p className="text-xs text-gray-400">
      Copyright © 2026 Resume Guide. All rights reserved.
    </p>
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

export default LandingPage
