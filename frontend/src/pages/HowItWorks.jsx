import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { landingPageStyles } from '../assets/style'
import { UserContext } from '../context/UserContext'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img7 from '../assets/7.jpg'
import ss1 from '../assets/ss1.png'
import ss2 from '../assets/ss2.png'



const STEPS = [
  {
    num: "01",
    label: "Sign In",
    title: "Get\nstarted.",
    desc: "Sign in to your account and jump right into building resumes tailored to your goals.",
    bg: "#191919",
    accent: "#3276FD",
    color: "#fcfcfc",
    screenshot: ss1,
    // ✅ When ready: import step1Img from '../assets/step1.png' and set screenshot: step1Img
  },
  {
    num: "02",
    label: "Name Resume",
    title: "Create resumes\nfor different roles.",
    desc: "Give each resume a clear name so you can build and manage separate versions for different job roles.",
    bg: "#fcfcfc",
    accent: "#3276FD",
    color: "#191919",
    screenshot: ss2,
  },
  {
    num: "03",
    label: "Enter Details",
    title: "Tell us\nabout you.",
    desc: "Add your name, education, skills, and projects. No experience needed — we guide you every step of the way.",
    bg: "#191919",
    accent: "#3276FD",
    color: "#fcfcfc",
    screenshot: img7,
  },
  {
    num: "04",
    label: "Pick Template",
    title: "Choose\nyour style.",
    desc: "Browse clean, ATS-friendly templates built for students anytime. Minimal, modern, or classic.",
    bg: "#fcfcfc",
    accent: "#3276FD",
    color: "#191919",
    screenshot: img1,
  },
  {
    num: "05",
    label: "Preview & Download",
    title: "See it,\nthen download.",
    desc: "Preview your resume in real time and export a clean, print-ready PDF whenever you're ready.",
    bg: "#191919",
    accent: "#3276FD",
    color: "#fcfcfc",
    screenshot: img7,
  },
]

const POSITIONS = [
  { x: -560, rotate: -28, scale: 0.72, opacity: 0.5 },
  { x: -320, rotate: -15, scale: 0.82, opacity: 0.75 },
  { x: 0,    rotate: 0,   scale: 1,    opacity: 1    },
  { x: 320,  rotate: 15,  scale: 0.82, opacity: 0.75 },
  { x: 560,  rotate: 28,  scale: 0.72, opacity: 0.5  },
]

function getPos(stepIdx, activeIdx) {
  const n = STEPS.length
  let rel = stepIdx - activeIdx
  if (rel < -2) rel += n
  if (rel > 2) rel -= n
  if (rel < -2 || rel > 2) return null
  return POSITIONS[rel + 2]
}

const HowItWorks = () => {
  const { user } = useContext(UserContext)
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const navigate = useNavigate()
  const timerRef = useRef(null)

  const stopTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = null
  }

  const go = (idx) => {
    setActive((idx + STEPS.length) % STEPS.length)
    setAnimKey(k => k + 1)
  }

  const resetTimer = () => {
    stopTimer()
    timerRef.current = setInterval(() => {
      setActive(a => {
        setAnimKey(k => k + 1)
        return (a + 1) % STEPS.length
      })
    }, 4000)
  }

  useEffect(() => {
    resetTimer()
    return () => stopTimer()
  }, [])

  const handleGo = (idx) => {
    go(idx)
    resetTimer()
  }

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      window.dispatchEvent(new CustomEvent('open-auth-modal'))
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] overflow-x-hidden">
      <Navbar />

      <style>{`
        .hiw-card {
          position: absolute;
          border-radius: 20px;
          cursor: pointer;
          overflow: hidden;
          user-select: none;
          display: flex;
          flex-direction: column;
        }
        .hiw-card-inner {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 24px 20px 20px;
          gap: 12px;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.35s ease forwards;
        }
        @keyframes expandIn {
          from { opacity: 0; transform: scaleY(0.9); }
          to { opacity: 1; transform: scaleY(1); }
        }
        .expand-in {
          animation: expandIn 0.35s ease forwards;
          transform-origin: top;
        }
        .hiw-dot {
          height: 6px;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          padding: 0;
        }
      `}</style>

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-16">

        {/* Header */}
        <div className="text-center mb-0">
          <span className="text-xs font-medium text-[#3276FD] bg-blue-50 px-3 py-1 rounded-full">
            / How it Works
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-[#191919] leading-none">
            Five steps.
            <br />
            <span className="text-[#191919]">
  One <i className="text-[#3276FD]">great</i> resume.
</span>
          </h1>
        </div>

        {/* Card stage */}
        <div style={{
          position: 'relative',
          height: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {STEPS.map((step, i) => {
            const pos = getPos(i, active)
            const isActive = i === active
            if (!pos) return null

            return (
              <div
                key={i}
                className="hiw-card"
                onClick={() => handleGo(i)}
                onMouseEnter={stopTimer}
                onMouseLeave={resetTimer}
                style={{
                  width: isActive ? 780 : 220,
                  height: isActive ? 430 : 300,
                  transform: `translateX(${pos.x}px) rotate(${pos.rotate}deg) scale(${pos.scale})`,
                  zIndex: isActive ? 10 : Math.round(pos.opacity * 5),
                  opacity: pos.opacity,
                  filter: isActive ? 'none' : 'grayscale(0.8) brightness(0.9)',
                  boxShadow: isActive ? '0 24px 60px rgba(0,0,0,0.2)' : 'none',
                  transition: 'all 0.5s cubic-bezier(0.34, 1.2, 0.64, 1)',
                }}
              >
                {isActive ? (

                  /* ── EXPANDED: landscape — left text, right screenshot ── */
                  <div
                    className="expand-in"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      background: step.bg,
                    }}
                  >
                    {/* LEFT — text */}
                    <div style={{
                      width: '42%',
                      height: '100%',
                      padding: '34px 30px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14,
                      flexShrink: 0,
                    }}>
                      {/* Step badge */}
                      <div style={{
                        width: 52, height: 52, borderRadius: 14,
                        background: 'rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <span style={{ fontSize: 19, fontWeight: 900, color: step.accent }}>
                          {step.num}
                        </span>
                      </div>

                      {/* Label */}
                      <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: 2,
                        color: step.accent, textTransform: 'uppercase', opacity: 0.8,
                      }}>
                        {step.label}
                      </span>

                      {/* Title */}
                      <div style={{
                        fontSize: 34,
                        fontWeight: 900,
                        lineHeight: 1.15,
                        whiteSpace: 'pre-line',
                        fontFamily: 'DM Sans, sans-serif',
                        color: step.color,
                      }}>
                        {step.title}
                      </div>

                      {/* Accent divider */}
                      <div style={{
                        width: 32, height: 2, borderRadius: 1,
                        background: step.accent, opacity: 0.4,
                      }} />

                      {/* Description */}
                      <p style={{
                        fontSize: 14,
                        color: step.color,
                        opacity: 0.65,
                        lineHeight: 1.7,
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        {step.desc}
                      </p>

                      <div style={{ flex: 1 }} />

                      {/* Step counter */}
                      <span style={{
                        fontSize: 11, color: step.color,
                        opacity: 0.25, fontWeight: 600, letterSpacing: 1,
                      }}>
                        {step.num} / 05
                      </span>
                    </div>

                    {/* RIGHT — screenshot */}
                    <div style={{
                      flex: 1,
                      height: '100%',
                      background: 'rgba(255,255,255,0.08)',
                      borderLeft: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: 10,
                      overflow: 'hidden',
                    }}>
                      {step.screenshot ? (
                        <img
                          src={step.screenshot}
                          alt={`Step ${step.num}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                          }}
                        />
                      ) : (
                        <>
                          <svg
                            width="38" height="38" viewBox="0 0 24 24"
                            fill="none" stroke={step.accent}
                            strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round" opacity="0.4"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <span style={{
                            fontSize: 12,
                            color: step.accent,
                            opacity: 0.45,
                            fontWeight: 600,
                            textAlign: 'center',
                            padding: '0 20px',
                            lineHeight: 1.6,
                            whiteSpace: 'pre-line',
                          }}>
                            {`Step ${step.num} screenshot\ncoming soon`}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                ) : (

                  /* ── COLLAPSED: portrait layout ── */
                  <div
                    className="hiw-card-inner"
                    style={{ background: step.bg, color: step.color }}
                  >
                    {/* Step badge */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: 'rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 16, fontWeight: 900, color: step.accent }}>
                        {step.num}
                      </span>
                    </div>

                    {/* Title */}
                    <div style={{
                      fontSize: 20,
                      fontWeight: 900,
                      lineHeight: 1.2,
                      whiteSpace: 'pre-line',
                      fontFamily: 'DM Sans, sans-serif',
                      marginTop: 'auto',
                    }}>
                      {step.title}
                    </div>

                    {/* Short desc */}
                    <p style={{
                      fontSize: 10,
                      color: step.color,
                      opacity: 0.5,
                      lineHeight: 1.6,
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      {step.desc}
                    </p>
                  </div>

                )}
              </div>
            )
          })}
        </div>

      

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-0">
          {STEPS.map((_, i) => (
            <button
              key={i}
              className="hiw-dot"
              onClick={() => handleGo(i)}
              style={{
                width: active === i ? 20 : 6,
                background: active === i ? '#3b82f6' : '#e5e7eb',
              }}
            />
          ))}
        </div>

        

      </main>

      <section className="w-full min-h-[36vh] bg-[#1a1a1a] px-6 py-14 md:py-18 flex flex-col items-center justify-center text-center gap-4 mt-24">
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

export default HowItWorks
