import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import axiosInstance from '../utils/axiosinstance'
import { API_PATHS } from '../utils/apiPaths'
import { Sparkles } from "lucide-react"

const JobDescriptionAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Paste a job description first')
      return
    }

    try {
      setIsAnalyzing(true)

      const response = await axiosInstance.post(
        API_PATHS.AI.ANALYZE_JOB_DESCRIPTION,
        { jobDescription: jobDescription.trim() }
      )

      await new Promise(resolve => setTimeout(resolve, 1200))

      setAnalysis(response.data.analysis || '')
      toast.success('Raga analyzed your job description ✨')
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.error || 'Failed to analyze job description')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-20 pt-28">
        
        {/* HERO */}
        <section>
          <div className="mb-10 text-center">
            <span className="text-xs font-medium text-[#3276FD] bg-blue-50 px-3 py-1 rounded-full">
              / Job Description Analyzer
            </span>

            <h1 className="mt-3 text-4xl font-bold leading-none text-[#191919] md:text-5xl">
              What job are you applying for?
              <br />
              <span>
                <i className="text-[#3276FD]">Paste</i> the role.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6F7580] sm:text-lg">
              Let Raga do the heavy lifting.
            </p>
          </div>

          {/* INPUT CARD */}
          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            
            {/* Raga Branding */}
            <div className="mb-4 flex items-center gap-2 text-sm text-[#6F7580]">
              
              <p>
                Powered by <span className="font-semibold text-[#191919]">Raga AI • Built with Gemini</span>
              </p>
            </div>

            {/* TEXTAREA + BUTTON */}
            <div className="relative">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Ask Raga to analyze a job description..."
                className="min-h-[280px] w-full rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 pr-36 text-sm leading-7 text-[#191919] outline-none transition focus:border-[#3276FD] focus:bg-white"
              />

              {/* BUTTON */}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 justify-center rounded-xl bg-[#191919] px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#3276FD] hover:shadow-lg hover:shadow-[#3276FD]/20 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Sparkles className={`h-4 w-4 ${isAnalyzing ? "animate-pulse" : ""}`} />
                {isAnalyzing ? 'Raga is analyzing...' : 'Analyze'}
              </button>
            </div>

            {/* Helper Text */}
    
          </div>
        </section>

        {/* RESULTS */}
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold text-[#191919]">
              {analysis
                ? 'Your quick breakdown is ready.'
                : 'Results will appear here after you analyze a role.'}
            </h2>

            {analysis && (
              <div className="rounded-2xl bg-blue-50 px-4 py-3 text-sm font-medium text-[#3276FD]">
                ✨ Raga AI Insights
              </div>
            )}
          </div>

          {/* Thinking Animation */}
          {isAnalyzing && (
            <div className="mt-8 rounded-[24px] bg-slate-50 p-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[#3276FD] animate-bounce"></div>
              <div className="h-3 w-3 rounded-full bg-[#3276FD] animate-bounce delay-150"></div>
              <div className="h-3 w-3 rounded-full bg-[#3276FD] animate-bounce delay-300"></div>
              <p className="text-sm text-[#6F7580] ml-2">
                Raga is analyzing the role...
              </p>
            </div>
          )}

          {/* RESULT */}
          {analysis && !isAnalyzing && (
            <div className="mt-8 rounded-[24px] bg-slate-50 p-6">
              <div className="whitespace-pre-line text-sm leading-7 text-slate-700">
                {analysis}
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!analysis && !isAnalyzing && (
            <div className="mt-8 rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
              <p className="text-lg font-semibold text-[#191919]">No analysis yet</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Paste a job description above and let Raga AI provide the breakdown.
              </p>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full px-10 pt-10 pb-6">
        <div className="max-w-7xl mx-auto border-t border-gray-200 pt-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Copyright © 2026 Resume Guide. All rights reserved.
          </p>

          <div className="flex items-center gap-1 text-xs text-gray-400">
            <a href="#" className="hover:text-[#191919] transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#191919] transition-colors">
              Terms Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default JobDescriptionAnalyzer