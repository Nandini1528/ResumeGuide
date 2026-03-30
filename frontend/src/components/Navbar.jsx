import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { UserContext } from '../context/UserContext'
import { ProfileInfoCard } from './Cards'
import Modal from './Modal'
import Login from './Login'
import SignUp from './SignUp'
import { landingPageStyles } from '../assets/style'

const NAV_LINKS = [
  { label: "Home",         path: "/" },
  { label: "About",        path: "/about" },
  { label: "How it Works", path: "/how-it-works" },
  { label: "FAQs",         path: "/faqs" },
]

/* ─── ResumeGuide Logo — DM Sans, 3 dots + 3 lines icon ──────────────── */
const ResumeGuideLogo = () => {
  const rows = [30, 48, 66]

  return (
    <svg
      width="240"
      height="38"
      viewBox="0 0 600 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,900&display=swap');`}</style>
      </defs>

      {/* R */}
      <text
        x="2" y="76"
        fontFamily="'DM Sans', sans-serif"
        fontSize="76"
        fontWeight="900"
        fill="#1a1a1a"
      >R</text>

      {/* 3 dots + 3 lines — rows evenly spaced at y=26,48,70 */}
      {rows.map((cy) => (
        <React.Fragment key={cy}>
          <circle cx="56" cy={cy} r="5" fill="#3276FD" />
          <rect x="68" y={cy - 4} width="40" height="8" rx="4" fill="#3276FD" />
        </React.Fragment>
      ))}

      {/* SUME */}
      <text
        x="116" y="76"
        fontFamily="'DM Sans', sans-serif"
        fontSize="76"
        fontWeight="900"
        fill="#1a1a1a"
      >SUME</text>

      {/* GUIDE */}
      <text
        x="314" y="76"
        fontFamily="'DM Sans', sans-serif"
        fontSize="76"
        fontWeight="900"
        fill="#3276FD"
      >GUIDE</text>
    </svg>
  )
}

/* ─────────────────────────────────────────────────────────────────────── */

const Navbar = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openAuthModal, setOpenAuthModal] = useState(false)
  const [currentPage, setCurrentPage] = useState("login")

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    const handler = () => setOpenAuthModal(true)
    window.addEventListener('open-auth-modal', handler)
    return () => window.removeEventListener('open-auth-modal', handler)
  }, [])

  return (
    <>
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>

          {/* LOGO */}
          <div
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
            className="flex items-center"
          >
            <ResumeGuideLogo />
          </div>

          {/* DESKTOP RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-1 ml-auto">
            {NAV_LINKS.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`
                  px-4 py-2 rounded-lg text-sm transition-colors duration-200
                  ${isActive(path)
                    ? "font-bold text-[#191919]"
                    : "font-normal text-gray-400 hover:text-[#191919]"}
                `}
              >
                {label}
              </button>
            ))}

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                onClick={() => setOpenAuthModal(true)}
                className="ml-2 px-5 py-2 rounded-lg bg-[#191919] text-white text-sm font-semibold hover:bg-[#3276FD] transition-colors duration-200 cursor-pointer"
              >
                Get Started
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className={`${landingPageStyles.mobileMenuButton} md:hidden`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen
              ? <X size={24} className={landingPageStyles.mobileMenuIcon} />
              : <Menu size={24} className={landingPageStyles.mobileMenuIcon} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className={landingPageStyles.mobileMenu}>
            <div className={landingPageStyles.mobileMenuContainer}>

              <div className="flex flex-col gap-1 mb-4">
                {NAV_LINKS.map(({ label, path }) => (
                  <button
                    key={path}
                    onClick={() => {
                      navigate(path)
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium text-left transition-colors duration-200
                      ${isActive(path)
                        ? "bg-black text-white"
                        : "text-gray-600 hover:text-black hover:bg-gray-100"}
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {user ? (
                <div className={landingPageStyles.mobileUserInfo}>
                  <div className={landingPageStyles.mobileUserWelcome}>Welcome Back</div>
                  <button
                    className={landingPageStyles.mobileDashboardButton}
                    onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false) }}
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <button
                  className={landingPageStyles.mobileAuthButton}
                  onClick={() => { setOpenAuthModal(true); setMobileMenuOpen(false) }}
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* AUTH MODAL */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => { setOpenAuthModal(false); setCurrentPage("login") }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  )
}

export default Navbar
