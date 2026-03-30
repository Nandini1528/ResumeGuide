import { useEffect, useRef, useState } from 'react';
import { Bot, MessageSquare, Send, Sparkles, X } from 'lucide-react';
import { BASE_URL } from '../utils/apiPaths';

const SUGGESTED_PROMPTS = [
  'Write a stronger professional summary for a student',
  'Improve my project bullet points for my resume',
  'Suggest technical skills for a computer science resume',
  'Rewrite my internship experience to sound more impactful',
];

function renderInlineMarkdown(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${part}-${index}`} className="font-semibold text-[#191919]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
}

function formatMessage(text) {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const elements = [];
  let bulletItems = [];

  const flushBullets = (keyBase) => {
    if (!bulletItems.length) return;

    elements.push(
      <ul key={`bullets-${keyBase}`} className="mt-2 space-y-2 pl-4 text-slate-700">
        {bulletItems.map((item, index) => (
          <li key={`${item}-${index}`} className="list-disc">
            {renderInlineMarkdown(item)}
          </li>
        ))}
      </ul>
    );

    bulletItems = [];
  };

  lines.forEach((line, index) => {
    const bulletMatch = line.match(/^(\*|-)\s+(.*)$/);

    if (bulletMatch) {
      bulletItems.push(bulletMatch[2]);
      return;
    }

    flushBullets(index);
    elements.push(
      <p key={`line-${index}`} className="mt-2 first:mt-0">
        {renderInlineMarkdown(line)}
      </p>
    );
  });

  flushBullets('end');

  return elements.length ? elements : <p>{text}</p>;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLauncherLabel, setShowLauncherLabel] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Hi! I can help with resume bullets, summaries, skill wording, and interview-ready guidance.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, isOpen]);

  const sendMessage = async (messageOverride) => {
    const nextMessage = typeof messageOverride === 'string' ? messageOverride : input;
    const trimmedInput = nextMessage.trim();
    if (!trimmedInput || loading) return;

    const userMsg = { role: 'user', text: trimmedInput };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch chatbot response');
      }

      setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: err.message || 'Something went wrong while contacting the chatbot.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] max-w-[390px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
          <div className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-[#191919] via-slate-900 to-[#3276FD] px-5 py-4 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 backdrop-blur-sm">
                  <Bot size={20} />
                </div>
                <div>
                  <p className="font-heading text-base font-bold">Raga AI</p>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    Smart help for polishing resumes inside ResumeGuide.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
                aria-label="Close chatbot"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-3">
            <div className="flex items-center gap-2 text-[12px] leading-5 text-slate-600">
              <Sparkles size={14} className="shrink-0 text-[#3276FD]" />
              Ask for stronger bullets, better summaries, project descriptions, or job-ready phrasing.
            </div>
          </div>

          <div className="max-h-[380px] space-y-4 overflow-y-auto bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_32%,#ffffff_100%)] px-4 py-4">
            {messages.length === 1 && (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Suggested prompts
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-[12px] leading-5 text-slate-600 transition hover:border-[#3276FD] hover:bg-[#3276FD]/5 hover:text-[#191919]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[86%] rounded-2xl px-4 py-3 text-[13px] leading-6 shadow-sm ${
                    msg.role === 'user'
                      ? 'rounded-br-md bg-[#3276FD] text-white'
                      : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {msg.role === 'bot' && (
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      <Bot size={12} className="text-[#3276FD]" />
                      Assistant
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{formatMessage(msg.text)}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300 [animation-delay:120ms]" />
                    <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300 [animation-delay:240ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 bg-white p-4">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-2 shadow-inner shadow-slate-100">
              <div className="flex items-end gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[44px] flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  placeholder="Ask about your resume..."
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#191919] text-white transition hover:bg-[#3276FD] disabled:cursor-not-allowed disabled:bg-slate-300"
                  type="button"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setShowLauncherLabel(true)}
        onMouseLeave={() => setShowLauncherLabel(false)}
        className="group flex items-center rounded-full border border-slate-200 bg-white p-2 shadow-[0_14px_40px_rgba(15,23,42,0.14)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
        aria-label={isOpen ? 'Hide chatbot' : 'Open chatbot'}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#191919] text-white transition group-hover:bg-[#3276FD]">
          {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
        </div>

        <div
          className={`overflow-hidden text-left transition-all duration-300 ${
            showLauncherLabel || isOpen ? 'ml-3 max-w-[180px] opacity-100' : 'ml-0 max-w-0 opacity-0'
          }`}
        >
          <p className="font-heading text-sm font-bold text-[#191919]">Raga AI</p>
          <p className="whitespace-nowrap text-xs text-slate-500">Get instant resume help</p>
        </div>
      </button>
    </div>
  );
}
