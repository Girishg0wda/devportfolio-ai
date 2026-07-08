import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, MessageCircle, Send, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Config                                                             */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "portfolio_chat_v1";
const MAX_STORED_MESSAGES = 40;
const TYPING_DELAY = [500, 900]; // min, max ms — feels less mechanical than a fixed delay

const WELCOME_MESSAGE = {
  sender: "bot",
  text:
    "Hi, I can help you find projects, skills, or the fastest way to get in touch. What are you looking for?",
  action: null,
};

const STARTER_SUGGESTIONS = [
  "What have you built?",
  "What's your stack?",
  "How do I reach you?",
];

/**
 * Intent table. Each entry is tried in order; the first regex match wins.
 * `suggestions` are shown after this intent replies, so the conversation
 * keeps offering relevant next steps instead of repeating the starters.
 */
const INTENTS = [
  {
    id: "projects-all",
    test: /\b(all|every|full|complete)\b.*\bproject/i,
    reply:
      "The projects page has the full archive — descriptions, stacks, and links for everything.",
    action: { label: "View all projects", to: "/projects" },
    suggestions: ["What's your stack?", "What are you proudest of?"],
  },
  {
    id: "projects",
    test: /project|portfolio|built|showcase/i,
    reply:
      "Recent work spans full-stack apps, data pipelines, and a few AI-assisted tools — mostly React front ends over FastAPI/Python back ends.",
    action: { label: "Browse projects", to: "/projects" },
    suggestions: ["Show me everything", "What's your stack?"],
  },
  {
    id: "stack",
    test: /skill|stack|technology|framework|react|fastapi|python|sql/i,
    reply:
      "React and Tailwind on the front end, FastAPI and PostgreSQL on the back end, plus Python for data and ML work. Deployed mostly on Vercel.",
    action: { label: "More about the work", to: "/about" },
    suggestions: ["What have you built?", "How do I reach you?"],
  },
  {
    id: "about",
    test: /about|who are you|background|experience|journey/i,
    reply:
      "Full-stack engineer, currently freelance — building analytics pipelines, APIs, and web apps, with an eye for clean design.",
    action: { label: "Read more", to: "/about" },
    suggestions: ["What's your stack?", "How do I reach you?"],
  },
  {
    id: "contact",
    test: /contact|hire|collab|reach|email|availability|rate/i,
    reply:
      "Open to freelance work and collaborations. The contact page is the quickest way to start a conversation.",
    action: { label: "Get in touch", to: "/contact" },
    suggestions: ["What have you built?", "What's your stack?"],
  },
];

const FALLBACK_REPLY = {
  text:
    "I can point you to projects, skills, or contact details. What would help most?",
  action: null,
  suggestions: STARTER_SUGGESTIONS,
};

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function safeParse(raw, fallback) {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadStoredMessages() {
  const stored = safeParse(localStorage.getItem(STORAGE_KEY), null);
  if (Array.isArray(stored) && stored.length > 0) return stored;
  return [{ id: 0, ...WELCOME_MESSAGE }];
}

/**
 * Resolves a reply for the given message.
 *
 * Kept synchronous-shaped (returns a Promise) on purpose: swap the body
 * for a real API call later, e.g.
 *
 *   const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ message, history }),
 *   });
 *   return res.json();
 *
 * without touching any component code.
 */
async function resolveReply(message) {
  const match = INTENTS.find((intent) => intent.test.test(message));
  if (!match) return FALLBACK_REPLY;
  return {
    text: match.reply,
    action: match.action,
    suggestions: match.suggestions,
  };
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(loadStoredMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(STARTER_SUGGESTIONS);
  const [hasUnread, setHasUnread] = useState(false);

  const navigate = useNavigate();
  const nextId = useRef(messages.length);
  const typingTimeout = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const launcherRef = useRef(null);

  /* Persist, capped so localStorage doesn't grow without bound */
  useEffect(() => {
    const trimmed = messages.slice(-MAX_STORED_MESSAGES);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch {
      // storage full or unavailable — conversation still works in-memory
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  /* Cleanup any pending "typing" timer on unmount */
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  /* Escape to close, click outside to close */
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeChat();
    };
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closeChat();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setHasUnread(false);
    // wait for the panel to mount before focusing
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    launcherRef.current?.focus();
  }, []);

  const appendMessage = useCallback((partial) => {
    nextId.current += 1;
    setMessages((prev) => [...prev, { id: nextId.current, ...partial }]);
  }, []);

  const sendMessage = useCallback(
    (raw) => {
      const text = raw.trim();
      if (!text || isTyping) return;

      appendMessage({ sender: "user", text, action: null });
      setInputValue("");
      setIsTyping(true);

      const delay =
        TYPING_DELAY[0] + Math.random() * (TYPING_DELAY[1] - TYPING_DELAY[0]);

      typingTimeout.current = setTimeout(async () => {
        const reply = await resolveReply(text);
        appendMessage({
          sender: "bot",
          text: reply.text,
          action: reply.action,
        });
        setSuggestions(reply.suggestions ?? STARTER_SUGGESTIONS);
        setIsTyping(false);
        if (!isOpen) setHasUnread(true);
      }, delay);
    },
    [appendMessage, isOpen, isTyping],
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="launcher"
            ref={launcherRef}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={openChat}
            aria-label="Open chat"
            className="relative flex items-center gap-2.5 rounded-full bg-neutral-900 px-5 py-3 text-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_32px_rgba(0,0,0,0.16)]"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            <span className="text-sm font-medium tracking-tight">
              Ask me anything
            </span>
            {hasUnread && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-neutral-900 ring-2 ring-white">
                <span className="absolute inset-0 rounded-full bg-neutral-400 animate-ping" />
              </span>
            )}
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Chat assistant"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex h-[32rem] w-[min(92vw,23rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.14)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3.5">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                  Assistant
                </div>
                <div className="text-sm font-medium text-neutral-900">
                  Ask about the work
                </div>
              </div>
              <button
                type="button"
                onClick={closeChat}
                aria-label="Close chat"
                className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                      message.sender === "user"
                        ? "bg-neutral-900 text-white"
                        : "border border-neutral-100 bg-neutral-50 text-neutral-800"
                    }`}
                  >
                    {message.text}
                    {message.action && (
                      <button
                        type="button"
                        onClick={() => {
                          closeChat();
                          navigate(message.action.to);
                        }}
                        className="mt-2 flex items-center gap-1 text-[13px] font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2 transition hover:decoration-neutral-900"
                      >
                        {message.action.label}
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-xl border border-neutral-100 bg-neutral-50 px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-neutral-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions + input */}
            <div className="border-t border-neutral-100 px-4 py-3.5">
              {!isTyping && suggestions.length > 0 && (
                <div className="mb-2.5 flex flex-wrap gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-neutral-200 px-2.5 py-1 text-[12px] font-medium text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3.5 py-2 transition focus-within:border-neutral-900">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      sendMessage(inputValue);
                    }
                  }}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-neutral-400"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  aria-label="Send message"
                  className="rounded-full bg-neutral-900 p-1.5 text-white transition disabled:opacity-30"
                >
                  <Send className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}