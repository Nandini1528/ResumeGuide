export const landingPageStyles = {
    // Main container
    container: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50",
  
    // Header styles
    header: "fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl",
    headerContainer: "w-full px-4 sm:px-6 lg:px-8 py-2.5 flex justify-between items-center",
    // 
    logoContainer: "flex items-center gap-3",
    logoIcon: "flex items-center justify-center",
    logoIconInner: "w-6 h-6 text-[#191919]",
    logoText: "text-xl font-black bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent",
        // Auth buttons
    desktopAuthButton: "relative group px-3 sm:px-6 py-2 bg-[#191919] rounded-[10px] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20 flex items-center justify-center",
    desktopAuthButtonOverlay: "absolute inset-0 bg-[#3276FD] opacity-0 group-hover:opacity-100 transition-opacity duration-300",    
    desktopAuthButtonText: "text-white text-[13px] sm:text-[14px] font-semibold tracking-wide relative z-10",
    mobileAuthButton: "w-full px-4 py-2 bg-[#191919] text-white text-sm font-semibold rounded-[10px] transition-all duration-300 hover:bg-[#3276FD]",  
    // Mobile menu
    // Mobile menu
    // Mobile menu
    mobileMenu: "md:hidden bg-white/95 backdrop-blur-lg w-full fixed top-16 left-0 right-0 z-40 shadow-lg border-b border-violet-100/50 transition-all duration-300 ease-in-out",
    mobileMenuContainer: "max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4",
    mobileUserInfo: "flex flex-col gap-4 py-2",
    mobileUserWelcome: "text-violet-700 font-medium text-center py-2 text-base sm:text-lg",
    mobileDashboardButton: "w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-200/50 transition-all",
    mobileAuthButton: "w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-200/50 transition-all",
    // Main content
    main: "pt-10",
  
    // Hero section
    heroSection: "w-full px-0 py-8 sm:py-12 text-center",
    heroGrid: "flex flex-col items-center justify-center",
    heroLeft: "space-y-6 max-w-3xl",
    heading: "text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight",
    headingText: "block text-[#191919]",
    headingGradient: "text-[#3276FD] italic",
    description: "text-[14px] sm:text-[20px] text-[#6F7580] leading-snug max-w-3xl mx-auto",
    ctaButtons: "mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6",
  
    // Buttons
    primaryButton: "group relative min-w-[190px] px-12 py-2.5 bg-[#3276FD] text-white font-bold text-[15px] sm:text-[18px] rounded-xl overflow-hidden transition-all hover:brightness-95",
    primaryButtonOverlay: "hidden",
    primaryButtonContent: "relative flex items-center gap-2",
    primaryButtonIcon: "group-hover:translate-x-1 transition-transform",
    secondaryButton: "min-w-[190px] px-8 sm:px-12 py-2.5 bg-[#191919] text-white font-bold text-[15px] sm:text-[18px] rounded-xl text-center transition-all duration-300 hover:bg-[#3276FD] hover:shadow-lg hover:shadow-[#3276FD]/30",
  
    // Stats
    statsContainer: "flex flex-wrap sm:flex-nowrap items-center justify-center gap-6 sm:gap-8 pt-6",
    statItem: "text-center",
    statNumber: "text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r bg-clip-text text-transparent",
    statLabel: "text-xs sm:text-sm text-[#6F7580] font-medium",
  
    // Hero illustration
    heroIllustration: "relative w-full mt-8",
    heroIllustrationBg: "absolute inset-0 bg-gradient-to-r from-violet-100/40 to-fuchsia-100/40",
    heroIllustrationContainer: "relative w-full overflow-hidden",
  
    // SVG styles
    svgContainer: "w-full h-[40vh] sm:h-[50vh] md:h-[58vh] object-cover block",
    svgRect: "fill-[url(#cardGradient)] stroke-[#e2e8f0] stroke-[2]",
    svgCircle: "fill-[url(#bgGradient)]",
    svgRectPrimary: "fill-[#8b5cf6]",
    svgRectSecondary: "fill-[#d946ef]",
    svgRectLight: "fill-[#e2e8f0]",
    svgRectSkill: "fill-[#ddd6fe]",
    svgAnimatedCircle: "fill-[#f97316] opacity-80",
    svgAnimatedRect: "fill-[#10b981] opacity-80",
    svgAnimatedPolygon: "fill-[#ef4444] opacity-80",
  
    // Features section
    featuresSection: "relative z-20 -mt-28 sm:-mt-40 bg-white/60 backdrop-blur-xl py-16 sm:py-24 border-t border-white/50",
    featuresContainer: "w-full px-4 sm:px-6 lg:px-8",
    featuresHeader: "text-left mb-6 sm:mb-8",
    featuresTitle: "text-[28px] sm:text-[34px] lg:text-[40px] font-bold text-[#191919] mb-2",
    featuresDescription: "text-[14px] sm:text-[16px] text-[#6F7580] max-w-2xl font-regular leading-relaxed",
    featuresGrid: "mt-15 flex gap-5 overflow-x-auto pb-3 custom-scrollbar snap-x snap-mandatory",
  
    // Feature cards
    featureCard: "group relative shrink-0 w-[320px] sm:w-[360px] min-h-[470px] sm:min-h-[540px] border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm snap-start",
    featureCardHover: "hidden",
    featureCardContent: "relative p-4 sm:p-5 h-full flex flex-col",
    featureIconContainer: "absolute top-3 right-3 w-7 h-7 bg-slate-100 rounded-full flex items-center justify-center text-slate-600",
    featureIcon: "w-4 h-4",
    featureTitle: "text-[20px] sm:text-[20px] leading-tight font-semibold text-slate-900 mb-2 whitespace-pre-line",
    featureDescription: "text-[13px] sm:text-[12px] text-[#6F7580] leading-relaxed mb-5",
    featureAction: "inline-flex items-center px-4 py-1 rounded-md bg-[#191919] text-white text-[11px] sm:text-[12px] font-semibold mb-3",
    featureImageWrap: "mt-auto -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 rounded-t-[28px] rounded-b-2xl overflow-hidden",
    featureImage: "w-full h-[280px] sm:h-[340px] object-cover block",
  
    // Feature gradients
    featureCardViolet: "from-violet-50 to-purple-50",
    featureCardFuchsia: "from-fuchsia-50 to-pink-50",
    featureCardOrange: "from-orange-50 to-red-50",
    featureIconViolet: "from-violet-500 to-purple-600",
    featureIconFuchsia: "from-fuchsia-500 to-pink-600",
    featureIconOrange: "from-orange-500 to-red-600",
  
    // CTA section
    ctaSection: "py-16 sm:py-24",
    ctaContainer: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
    ctaCard: "relative",
    ctaCardBg: "absolute -inset-6 sm:-inset-8 bg-gradient-to-r from-violet-200/50 to-fuchsia-200/50 rounded-3xl blur-3xl",
    ctaCardContent: "relative bg-gradient-to-br from-white to-violet-50 border border-violet-100 rounded-3xl p-8 sm:p-16",
    ctaTitle: "text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 sm:mb-6",
    ctaTitleGradient: "bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent",
    ctaDescription: "text-base sm:text-lg text-slate-600 mb-6 sm:mb-10 max-w-2xl mx-auto font-medium",
    ctaButton: "group relative px-8 sm:px-12 py-3 sm:py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-200",
    ctaButtonOverlay: "absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity",
    ctaButtonText: "relative",
  
    // Footer
    footer: "border-t border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 py-6 sm:py-8",
    footerContainer: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
    footerText: "text-sm sm:text-base text-slate-500 font-medium",
    footerHeart: "bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent",
    footerLink: "hover:text-purple-400 underline"
  };
  
  export const dashboardStyles = {
    // Container
    container: "container mx-auto px-4 py-6",
  
    // Header
    headerWrapper: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6",
    headerTitle: "text-2xl font-bold text-gray-900",
    headerSubtitle: "text-gray-600",
  
    // Create Button
    createButton: "group relative px-10 py-4 bg-[#3276FD] text-white font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-200/70",
    createButtonOverlay: "absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity",
    createButtonContent: "relative flex items-center gap-3",
  
    // Loading
    spinnerWrapper: "flex justify-center items-center py-12",
    spinner: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600",
  
    // Empty State
    emptyStateWrapper: "flex flex-col items-center justify-center py-12 text-center",
    emptyIconWrapper: "bg-blue-100 p-4 rounded-full mb-4",
    emptyTitle: "text-xl font-bold text-gray-900 mb-2",
    emptyText: "text-gray-600 max-w-md mb-6",
  
    // Grid
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
  
    // New Resume Card
    newResumeCard: "flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 to-blue-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-lg hover:border-gray-400 h-full",
    newResumeIcon: "w-16 h-16 rounded-full bg-[#3276FD] flex items-center justify-center mb-4 shadow-sm shadow-blue-200/70",
    newResumeTitle: "text-xl font-bold text-gray-900 mb-2 text-center",
    newResumeText: "text-gray-600 text-center",
  
    // Modal
    modalHeader: "flex justify-between items-center mb-4",
    modalTitle: "text-xl font-bold text-gray-900",
    modalCloseButton: "text-gray-500 hover:text-gray-700",
  
    // Delete Confirmation
    deleteIconWrapper: "bg-red-100 p-3 rounded-full mb-4",
    deleteTitle: "text-lg font-bold text-gray-900 mb-2",
    deleteText: "text-gray-600 mb-4",
  };
  
  
  export const cardStyles = {
    // ProfileInfoCard styles
    profileCard: "flex items-center gap-3 p-2 sm:p-3 bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.03]",
    profileInitialsContainer: "w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#3276FD] to-[#5AA0FF] rounded-2xl flex items-center justify-center shadow-md shadow-blue-200/70",
    profileInitialsText: "text-base sm:text-lg font-black text-white",
    profileName: "text-xs sm:text-sm font-bold text-gray-800",
    logoutButton: "text-[#3276FD] text-[10px] sm:text-xs font-bold cursor-pointer hover:text-blue-700 transition-colors",
  
    // ResumeSummaryCard styles
    resumeCard: "group relative h-[360px] sm:h-[380px] lg:h-[400px] flex flex-col bg-white border border-[#3276FD] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:border-[#3276FD]",
    cardBackground: "absolute inset-0 bg-gradient-to-br from-blue-100 via-transparent to-sky-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
    previewArea: "p-4 sm:p-6 flex-1 relative overflow-hidden",
    emptyPreview: "w-full h-[180px] sm:h-[200px] lg:h-[220px] flex flex-col items-center justify-center rounded-2xl",
    emptyPreviewIcon: "w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center mb-4 shadow-md",
    emptyPreviewText: "text-gray-800 text-sm font-bold",
    emptyPreviewSubtext: "text-gray-500 text-xs mt-1",
    infoArea: "bg-gray-50 border-t border-gray-200 p-4 sm:p-6",
    title: "text-sm sm:text-base font-bold text-gray-800 truncate mb-2 group-hover:text-black transition-colors",
    dateInfo: "flex items-center gap-2 text-xs text-gray-500",
  
    // Action buttons
    actionOverlay: "absolute inset-4 sm:inset-6 bg-gradient-to-t from-white/80 via-white/20 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl",
    actionButtonsContainer: "flex gap-3",
    editButton: "group/btn w-12 h-12 flex items-center justify-center bg-[#191919] rounded-2xl shadow-md hover:scale-110 transition-all duration-300",
    deleteButton: "group/btn w-12 h-12 flex items-center justify-center bg-[#191919] rounded-2xl shadow-md hover:scale-110 transition-all duration-300",
    buttonIcon: "text-white group-hover/btn:scale-110 transition-transform",
  
    // Progress and completion styles
    progressBar: "relative w-full h-2 bg-gray-200 rounded-full overflow-hidden",
    progressFill: "h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden",
    progressGlow: "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse",
    progressIndicator: "absolute top-0 h-full w-4 bg-gradient-to-r from-transparent to-white/50 blur-sm transition-all duration-700",
    completionStatus: "flex justify-between items-center mt-2",
    statusText: "text-xs font-medium text-gray-500",
    percentageText: "text-xs font-bold text-gray-700",
  
    // Completion indicator
    completionIndicator: "absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full shadow-sm",
    completionDot: "w-3 h-3 rounded-full flex items-center justify-center",
    completionDotInner: "w-1 h-1 bg-white rounded-full",
    completionPercentageText: "text-xs font-bold text-gray-700",
  
    // Completion color classes
    completionHigh: "from-emerald-500 to-green-600",
    completionMedium: "from-yellow-500 to-orange-500",
    completionLow: "from-red-500 to-pink-600",
  
    // TemplateCard styles
    templateCard: "relative rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer border border-gray-200",
    templateCardSelected: "ring-2 ring-indigo-500 scale-[1.02]",
    templateCardDefault: "hover:shadow-lg hover:border-gray-300",
    templateDesign: "relative h-full w-full aspect-[4/5]",
    templateOverlay: "absolute inset-0 bg-white/10 backdrop-blur-sm",
    selectionIndicator: "absolute top-4 right-4 z-20",
    selectionCircle: "w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-md",
    selectionIcon: "text-white",
    templateHoverEffect: "absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-300",
    templateName: "text-sm font-medium text-gray-800",
    emptyTemplate: "relative h-full w-full rounded-lg overflow-hidden",
    emptyTemplateIcon: "p-3 bg-white/90 rounded-full shadow-sm",
    emptyTemplateText: "text-xs text-gray-600 mt-1"
  };
  
  export const authStyles = {
    container: "w-[90vw] md:w-[400px] p-8 bg-gradient-to-br from-white to-violet-50 rounded-3xl border border-violet-100 shadow-2xl",
    headerWrapper: "text-center mb-8",
    title: "text-2xl font-black text-slate-900 mb-2",
    subtitle: "text-slate-600 font-medium",
    form: "space-y-6",
    errorMessage: "text-red-500 text-sm font-medium bg-red-50 border border-red-200 px-4 py-3 rounded-xl",
    submitButton: "w-full py-4 bg-[#191919] text-white font-black rounded-2xl hover:bg-[#3276FD] hover:scale-105 hover:shadow-xl hover:shadow-[#3276FD]/30 transition-all text-lg",
    switchText: "text-center text-sm text-slate-600 font-medium",
    switchButton: "font-black text-[#3276FD] hover:text-blue-700 transition-colors",
    signupContainer: "w-[90vw] md:w-[400px] p-8 bg-gradient-to-br from-white to-blue-50 rounded-3xl border border-blue-100 shadow-2xl overflow-hidden",
    signupTitle: "text-2xl font-black text-slate-900 mb-2",
    signupSubtitle: "text-slate-600 font-medium",
    signupForm: "space-y-4",
    signupSubmit: "w-full py-4 bg-[#191919] text-white font-black rounded-2xl hover:bg-[#3276FD] hover:scale-105 hover:shadow-xl hover:shadow-[#3276FD]/30 transition-all text-lg",
    signupSwitchButton: "font-black text-[#3276FD] hover:text-blue-700 transition-colors"
  };
  
  export const shimmerStyle = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    @keyframes flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes bubble {
      0% { transform: translateY(0) scale(1); opacity: 0.7; }
      50% { transform: translateY(-10px) scale(1.1); opacity: 0.9; }
      100% { transform: translateY(0) scale(1); opacity: 0.7; }
    }
    
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
      50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
    }
    
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
    
    .animate-flow {
      animation: flow 4s infinite linear;
    }
    
    .animate-bubble {
      animation: bubble 2s infinite ease-in-out;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 2s infinite;
    }
  `
  // Common Styles
  export const commonStyles = {
    trashButton: "absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all",
    addButtonBase: "flex items-center gap-3 px-6 py-3 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg",
  };
  
  // AdditionalInfoForm Styles
  export const additionalInfoStyles = {
    container: "p-8 bg-white",
    heading: "text-2xl font-black text-slate-900 mb-8",
    sectionHeading: "text-lg font-bold text-slate-800 mb-6 flex items-center gap-2",
    dotViolet: "w-2 h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full",
    dotOrange: "w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full",
    languageItem: "relative bg-white border border-violet-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all",
    interestItem: "relative",
    addButtonLanguage: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    addButtonInterest: "bg-gradient-to-r from-orange-500 to-red-500",
  };
  
  // CertificationInfoForm Styles
  export const certificationInfoStyles = {
    container: "p-8 bg-white",
    heading: "text-2xl font-black text-slate-900 mb-8",
    item: "relative bg-white border border-emerald-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all",
    addButton: "bg-gradient-to-r from-emerald-500 to-teal-500",
  };
  
  // ContactInfoForm Styles
  export const contactInfoStyles = {
    container: "p-8 bg-white",
    heading: "text-2xl font-black text-slate-900 mb-8",
  };
  
  // EducationDetailsForm Styles
  export const educationDetailsStyles = {
    container: "p-8 bg-white",
    heading: "text-2xl font-black text-slate-900 mb-8",
    item: "relative bg-white border border-indigo-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all",
    addButton: "bg-gradient-to-r from-indigo-500 to-purple-500",
  };
  
  // ProfileInfoForm Styles
  export const profileInfoStyles = {
    container: "p-8 bg-white",
    heading: "text-2xl font-black text-slate-900 mb-8",
    label: "block text-sm font-bold text-slate-700 mb-3 group-focus-within:text-[#3276FD] transition-colors",
    textarea: "w-full p-4 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-800 placeholder:text-sm placeholder-gray-500 font-medium focus:border-[#3276FD] focus:ring-4 focus:ring-[#3276FD]/20 transition-all outline-none resize-none hover:border-gray-400",
  };
  
  // ProjectDetailForm Styles
  export const projectDetailStyles = {
    container: "p-8 bg-white",
    heading: "text-2xl font-black text-slate-900 mb-8",
    item: "relative bg-white border border-cyan-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all",
    textarea: "w-full p-4 bg-white border border-cyan-200 rounded-xl placeholder:text-sm focus:border-cyan-400 focus:ring-4 focus:ring-cyan-50 transition-all outline-none resize-none",
    addButton: "bg-gradient-to-r from-cyan-500 to-blue-500",
  };
  
  // SkillsInfoForm Styles
  export const skillsInfoStyles = {
    container: "p-8 bg-white",
    heading: "text-2xl font-black text-slate-900 mb-8",
    item: "relative bg-white border border-amber-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all",
    addButton: "bg-gradient-to-r from-amber-500 to-orange-500",
  };
  
  // WorkExperienceForm Styles
  export const workExperienceStyles = {
    container: "p-8 bg-white",
    heading: "text-2xl font-black text-slate-900 mb-8",
    item: "relative bg-white border border-green-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all",
    textarea: "w-full p-4 bg-white border border-green-200 rounded-xl placeholder:text-sm focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all outline-none resize-none",
    addButton: "bg-gradient-to-r from-green-500 to-emerald-500",
  };
  
  export const containerStyles = {
    main: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6",
    header: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-violet-100 rounded-2xl py-4 px-6 mb-6 shadow-sm",
    grid: "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8",
    formContainer: "bg-white border border-violet-100 rounded-2xl overflow-hidden shadow-sm",
    previewContainer: "bg-white border border-violet-100 rounded-2xl overflow-hidden shadow-sm p-4",
    previewInner: "w-full max-w-[800px] mx-auto",
    modalContent: "w-[90vw] h-[80vh]",
    pdfPreview: "w-full p-4 flex justify-center",
    hiddenThumbnail: "bg-white shadow-lg max-w-[400px] mx-auto"
  };
  
  export const buttonStyles = {
    theme: "flex items-center gap-2 px-3 sm:px-4 py-2 bg-violet-100 text-violet-700 font-bold rounded-xl hover:bg-violet-200 transition-all",
    delete: "flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-all",
    download: "flex items-center gap-2 px-3 sm:px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-xl hover:bg-emerald-200 transition-all",
    back: "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all text-sm",
    save: "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-100 text-blue-700 font-bold rounded-xl hover:bg-blue-200 transition-all text-sm",
    next: "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#191919] text-white font-bold rounded-xl hover:bg-black hover:scale-105 transition-all shadow-lg text-sm",
    modalAction: "flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg text-sm"
  };
  
  export const statusStyles = {
    completionBadge: "inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700",
    modalBadge: "inline-flex items-center gap-2 bg-violet-100 px-3 py-1 rounded-full text-sm font-medium text-violet-700",
    error: "flex items-center gap-3 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl mb-4"
  };
  
  export const iconStyles = {
    pulseDot: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
  };
  
  export const inputStyles = {
    wrapper: "mb-6 group",
    label: "block text-sm font-bold text-gray-800 mb-3 group-focus-within:text-[#3276FD] transition-colors",
    inputContainer: focused => `relative flex items-center bg-gray-50 border-2 px-4 py-3 rounded-xl transition-all duration-300 ${focused
      ? 'border-[#3276FD] ring-4 ring-[#3276FD]/20 shadow-lg shadow-[#3276FD]/10'
      : 'border-gray-300 hover:border-gray-400'}`,
    inputField: "w-full bg-transparent outline-none text-gray-800 placeholder:text-sm placeholder-gray-500 font-medium",
    toggleButton: "text-gray-500 hover:text-[#3276FD] transition-colors p-1 rounded-lg hover:bg-blue-50",
  };
  
  export const photoSelectorStyles = {
    container: "flex justify-center mb-8",
    hiddenInput: "hidden",
    placeholder: hovered => `relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-full cursor-pointer transition-all duration-300 ${hovered ? 'hover:border-violet-500 hover:bg-violet-50' : ''}`,
    cameraButton: "absolute -bottom-2 -right-2 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-full transition-all shadow-lg hover:scale-110",
    previewWrapper: "relative group",
    previewImageContainer: hovered => `w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg transition-all duration-300 ${hovered ? 'group-hover:border-violet-400' : ''}`,
    previewImage: "w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-300",
    overlay: "absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
    actionButton: (bg, hoverBg, textColor) => `w-10 h-10 flex items-center justify-center bg-${bg} text-${textColor} rounded-full hover:bg-${hoverBg} transition-all`,
  };
  
  export const titleInputStyles = {
    container: "flex min-w-0 items-center gap-3",
    titleButton: "min-w-0 rounded-xl transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-200",
    titleText: "text-lg sm:text-xl font-bold text-gray-800",
    inputField: focused => `min-w-[220px] max-w-full text-lg sm:text-xl font-bold bg-transparent outline-none text-gray-800 placeholder:text-base border-b-2 pb-2 transition-all duration-300 ${focused ? 'border-violet-500' : 'border-gray-300'}`,
    confirmButton: "p-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white transition-all",
  };
  
  export const modalStyles = {
    overlay: "fixed inset-0 flex items-center justify-center w-full h-full bg-black/60 backdrop-blur-sm z-50",
    container: "relative flex flex-col bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden border border-blue-100 max-w-[95vw] max-h-[95vh]",
    header: "flex items-center justify-between p-6 border-b border-blue-100 bg-gradient-to-r from-white to-blue-50",
    title: "text-xl font-black text-slate-900",
    actionButton: "flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3276FD] to-[#5AA0FF] text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-blue-200/70 mr-12",
    closeButton: "absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-black text-gray-500 hover:text-white rounded-xl transition-all shadow-lg hover:scale-110 z-10",
    body: "flex-1 overflow-y-auto"
  };
  
  export const infoStyles = {
    // Progress
    progressWrapper: "w-20 h-2 rounded-full bg-gray-200",
    progressBar: color => `h-full rounded-full transition-all`,
  
    // ActionLink
    actionWrapper: "flex items-center gap-3",
    actionIconWrapper: "w-6 h-6 flex items-center justify-center rounded-full",
    actionLink: "text-sm font-medium underline cursor-pointer break-all text-gray-600 hover:text-emerald-600 transition-colors",
  
    // CertificationInfo
    certContainer: "mb-4",
    certTitle: "text-base font-semibold text-gray-900",
    certRow: "flex items-center gap-2 mt-1",
    certYear: bgColor => `text-xs font-bold text-white px-3 py-1 rounded-lg`,
    certIssuer: "text-sm text-gray-600 font-medium",
  
    // ContactInfo
    contactRow: "flex items-center gap-3 mb-3",
    contactIconWrapper: "w-8 h-8 flex items-center justify-center rounded-lg",
    contactText: "flex-1 text-sm font-medium break-all text-gray-700",
  
    // EducationInfo
    eduContainer: "mb-5",
    eduDegree: "text-base font-semibold pb-2 text-gray-900",
    eduInstitution: "text-sm text-gray-700 font-medium",
    eduDuration: "text-xs text-gray-500 font-medium italic mt-1",
  
    // Language/Skill Info
    infoRow: "flex items-center justify-between mb-3",
    infoLabel: "text-sm font-semibold text-gray-900",
  
    // Links
    linkRow: "flex items-center space-x-1 text-blue-600 hover:text-blue-700",
  
    // ProjectInfo
    projectContainer: "mb-5",
    projectTitle: isPreview => `${isPreview ? 'text-sm' : 'text-base'} font-semibold text-gray-900`,
    projectDesc: "text-sm text-gray-600 mt-1 leading-relaxed",
    projectLinks: "flex items-center gap-4 font-medium mt-3",
  
    // RatingInput
    ratingWrapper: "flex gap-2 cursor-pointer",
    ratingDot: "w-4 h-4 rounded transition-all hover:scale-110",
  
    // SkillSection
    skillGrid: "grid grid-cols-2 gap-x-6 gap-y-2 mb-5",
  
    // WorkExperience
    workContainer: "mb-6",
    workHeader: "flex items-start justify-between mb-2",
    workCompany: "text-base font-semibold pb-2 text-gray-900",
    workRole: "text-base font-medium text-gray-700",
    workDuration: color => `text-sm font-bold italic`,
    workDesc: "text-sm text-gray-600 font-medium leading-relaxed"
  };
