import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { landingPageStyles } from '../assets/style'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/UserContext'

const FAQ_DATA = {
  General: [
    {
      q: "What is ResumeGuide?",
      a: "ResumeGuide is a free resume builder to make students learn and understand how to build a resume."
    },
    {
      q: "Do I need an account to use it?",
      a: "You need an account to save and edit your resume. Creating one takes less than 30 seconds, just an email and password."
    },
    {
      q: "Is ResumeGuide free?",
      a: "Yes, completely free. No hidden charges, no credit card required."
    },
    {
      q: "Can I use this if I have no work experience?",
      a: "Absolutely, that's exactly who this is built for. You can add your education, projects, skills, certifications, and extracurriculars. That's more than enough to build a strong resume."
    },
    {
      q: "What makes this different from other resume builders?",
      a: "Most resume builders are built for professionals with years of experience. We're built for students starting from scratch simpler flow, student-friendly templates, and guidance at every step."
    },
    {
      q: "Can I download my resume after creating it?",
      a: "Yes, you can download your resume in a clean, professional format once you're done building it."
    },
    {
      q: "Can I edit my resume later?",
      a: "Absolutely. You can log in anytime and update your resume as you gain new skills, projects, or experience."
    },
    {
      q: "How long does it take to create a resume?",
      a: "Most students can create a complete resume in few  minutes using our guided steps."
    },
    {
      q: "Is ResumeGuide suitable for internships?",
      a: "Yes, it's specifically designed to help students create resumes that are ready for internships, hackathons, and college opportunities."
    },
    {
      q: "Do I need prior knowledge to use ResumeGuide?",
      a: "Not at all. The platform guides you step-by-step, so even if you're building your first resume, you'll know exactly what to include."
    },
  ],
  "Resume Tips": [
    {
      q: "How long should a student resume be?",
      a: "One page. Always. As a student, you don't have enough experience to justify two pages and recruiters prefer concise resumes anyway."
    },
    {
      q: "What should I put if I have no internships?",
      a: "Add personal projects, college projects, hackathon work, freelance work, volunteer experience, certifications, and relevant coursework. These all count."
    },
    {
      q: "Should I add a photo to my resume?",
      a: "In most countries (US, UK, Canada), photos are not recommended. In India and parts of Europe, it's common."
    },
    {
      q: "What skills should I list?",
      a: "List skills you can actually talk about in an interview. Technical skills (languages, tools, frameworks), soft skills (communication, teamwork), and tools (Figma, Excel, Git) are all fair game."
    },
    {
      q: "How do I make my resume ATS-friendly?",
      a: "Use standard section headings (Education, Skills, Projects), avoid tables and graphics, and use keywords from the job description. Our templates are ATS-optimised by default."
    },
    {
      q: "Should I tailor my resume for every application?",
      a: "Yes. Even small tweaks can make a big difference. Match your skills and projects to the role you're applying for."
    },
    {
      q: "How do I write strong bullet points?",
      a: "Focus on impact. Start with action words and show results wherever possible. Avoid vague descriptions."
    },
    {
      q: "Can I include online courses and certifications?",
      a: "Yes. Certifications from platforms like Coursera, Udemy, or Google add credibility, especially if you're a beginner."
    },
    {
      q: "What mistakes should I avoid on my resume?",
      a: "Spelling errors, too much text, irrelevant details, and copying generic templates without customization. Keep it clean and focused."
    },
  ],
  Platform: [
    {
      q: "Can I download my resume as a PDF?",
      a: "Yes. Once you're done building, you can export your resume as a clean, print-ready PDF in one click."
    },
    {
      q: "Can I have multiple resumes?",
      a: "Yes, you can create and save multiple resumes from your dashboard. Useful for tailoring your resume to different opportunities."
    },
    {
      q: "Can I edit my resume after downloading?",
      a: "Yes. Your resume is always saved to your account. Come back anytime, make changes, and re-export."
    },
    {
      q: "How many templates are available?",
      a: "We currently offer multiple templates across different styles minimal, modern, and classic. More are being added regularly."
    },
    {
      q: "Is my data safe?",
      a: "Yes. Your resume data is stored securely and is only accessible when you're logged into your account."
    },
    {
      q: "Can I switch templates after creating my resume?",
      a: "Yes. You can switch between templates anytime without losing your content."
    },
    {
      q: "Can I use ResumeGuide on my phone?",
      a: "Yes. The platform works smoothly on mobile, tablet, and desktop devices."
    },
    {
      q: "Will my resume look professional when downloaded?",
      a: "Yes. All templates are designed to be clean, structured, and recruiter-friendly right out of the box."
    },
    {
      q: "Do I need to install anything to use ResumeGuide?",
      a: "No. Everything runs in your browser no downloads or installations required."
    },
  ],
  "For Students": [
    {
      q: "I'm in my first year is it too early to build a resume?",
      a: "No, it's the perfect time. Starting early means you have time to build it out, add to it, and have it ready when opportunities come up unexpectedly."
    },
    {
      q: "What if I don't have any projects yet?",
      a: "Start with what you have your coursework, any tools you've learned, online courses you've completed. Then use your resume as motivation to build things worth adding."
    },
    {
      q: "Do hackathon projects count on a resume?",
      a: "100%. Hackathon projects show initiative, technical ability, and teamwork. They're some of the best things you can put on a student resume."
    },
    {
      q: "Should I tailor my resume for every application?",
      a: "Ideally yes, especially the skills and summary sections. Our platform lets you create multiple versions so you can tailor without starting over."
    },
    {
      q: "How do I get my first internship with no experience?",
      a: "Focus on building projects, learning relevant skills, and applying consistently. Your first opportunity often comes from showing potential, not experience."
    },
    {
      q: "What kind of projects should I add to my resume?",
      a: "Projects that solve real problems or demonstrate your skills. Even small, well-explained projects are better than complex ones you can't explain."
    },
    {
      q: "How important are extracurricular activities?",
      a: "Very. Clubs, events, and volunteering show teamwork, leadership, and initiative — all things recruiters look for."
    },
    {
      q: "How many internships should I apply to?",
      a: "As many as possible. Applying to multiple roles increases your chances, especially when you're just starting out."
    },
    {
      q: "What if I get rejected from internships?",
      a: "It's normal. Use each rejection as feedback, improve your resume, build more skills, and keep applying. It only takes one yes."
    },
  ],
}

const CATEGORIES = Object.keys(FAQ_DATA)

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left gap-6 cursor-pointer"
      >
        <span className="text-base font-medium text-[#191919]">{question}</span>
        <span className="text-gray-300 text-xl leading-none shrink-0">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="mt-3 text-base text-[#6F7580] leading-relaxed max-w-2xl">
          {answer}
        </p>
      )}
    </div>
  )
}

const Faqs = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('General')
  const [form, setForm] = useState({ name: '', email: '', question: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.question.trim()) return
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      window.dispatchEvent(new CustomEvent('open-auth-modal'))
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Tag */}
        <div className="mb-6">
          <span className="text-sm font-medium text-[#3276FD] bg-blue-50 px-3 py-1 rounded-full">
            / FAQs
          </span>
        </div>

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-14">
          <h1 className="text-5xl font-bold text-[#191919] whitespace-nowrap leading-tight">
          Got questions? <br></br>
          We’ve got <i className=" text-[#3276FD] ">answers.</i>
          </h1>
        </div>

        {/* Body — sidebar + accordion */}
        <div className="flex flex-col md:flex-row gap-10">

          {/* Left — category tabs */}
          <div className="flex flex-row md:flex-col gap-2 md:w-48 shrink-0 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  text-left text-base px-4 py-2 rounded-full transition-colors duration-150 cursor-pointer
                  ${activeCategory === cat
                    ? 'bg-blue-50 text-[#3276FD] font-medium'
                    : 'text-gray-400 hover:text-[#191919]'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right — accordion */}
          <div className="flex-1">
            {FAQ_DATA[activeCategory].map((item, i) => (
              <FAQItem key={`${activeCategory}-${i}`} question={item.q} answer={item.a} />
            ))}
          </div>

        </div>

        {/* ── ASK A QUESTION ── */}
        <div className="mt-24 border-t border-gray-100 pt-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">

            {/* Left — copy */}
            <div className="md:w-72 shrink-0">
              <span className="text-sm font-medium text-[#3276FD] bg-blue-50 px-3 py-1 rounded-full">
                / Ask us
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#191919] leading-snug">
                Didn't find what
                <br />you were looking for?
              </h2>
              <p className="mt-3 text-base text-gray-400 leading-relaxed">
                Ask your question and we'll get back to you.
              </p>
            </div>

            {/* Right — form */}
            <div className="flex-1 max-w-lg">
              {submitted ? (
                <div className="flex flex-col items-start gap-3 py-10">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="text-base font-medium text-[#191919]">Question received!</p>
                  <p className="text-base text-gray-400">
                    Thanks for reaching out. We'll get back to you at <span className="text-[#191919]">{form.email || 'your email'}</span>.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', question: '' }) }}
                    className="mt-2 text-sm text-blue-500 hover:underline cursor-pointer"
                  >
                    Ask another question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name + Email row */}
                  <div className="flex gap-4">
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-sm text-gray-400 font-medium">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="
                          w-full text-base text-[#191919] bg-white
                          border border-gray-200 rounded-lg
                          px-4 py-2.5 outline-none
                          placeholder:text-gray-300
                          focus:border-blue-300
                          transition-colors duration-150
                        "
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <label className="text-sm text-gray-400 font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="
                          w-full text-base text-[#191919] bg-white
                          border border-gray-200 rounded-lg
                          px-4 py-2.5 outline-none
                          placeholder:text-gray-300
                          focus:border-blue-300
                          transition-colors duration-150
                        "
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm text-gray-400 font-medium">Your question <span className="text-[#3276FD]">*</span></label>
                    <textarea
                      name="question"
                      value={form.question}
                      onChange={handleChange}
                      placeholder="What's on your mind?"
                      rows={4}
                      required
                      className="
                        w-full text-base text-[#191919] bg-white
                        border border-gray-200 rounded-lg
                        px-4 py-3 outline-none resize-none
                        placeholder:text-gray-300
                        focus:border-blue-300
                        transition-colors duration-150
                      "
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="
                      self-start px-6 py-2.5 rounded-lg
                      bg-[#191919] text-white
                      text-base font-semibold
                      hover:bg-black
                      transition-colors duration-150
                      cursor-pointer
                    "
                  >
                    Send question
                  </button>
                </form>
              )}
            </div>
          </div>
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

export default Faqs
