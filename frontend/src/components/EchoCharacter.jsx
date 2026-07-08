import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Send, X } from "lucide-react";

/* Config                                                             */

const STORAGE_KEY = "echo_chat_v2";
const MAX_STORED_MESSAGES = 40;
const TYPING_DELAY = [500, 900]; // min, max ms

const WELCOME_MESSAGE = {
  sender: "bot",
  text:
    "Hey, I'm Echo. Ask me about projects, the stack behind them, or the fastest way to get in touch.",
  action: null,
};

const STARTER_SUGGESTIONS = [
  "What have you built?",
  "What's your stack?",
  "How do I reach you?",
];

/**
 * Intent table. First regex match wins. `suggestions` are shown after
 * this intent replies, so the conversation keeps offering relevant next
 * steps instead of looping back to the starters.
 */
const INTENTS = [
  {
    id: "projects-all",
    test: /\b(all|every|full|complete)\b.*\bproject/i,
    reply:
      "The projects page has the full archive — descriptions, stacks, and links for everything I've built.",
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
    test: /skill|stack|technology|framework|react|fastapi|python|sql|ai|ml/i,
    reply:
      "React and Tailwind on the front end, FastAPI and PostgreSQL on the back end, plus Python for data and ML work. Deployed mostly on Vercel.",
    action: { label: "More about the work", to: "/about" },
    suggestions: ["What have you built?", "How do I reach you?"],
  },
  {
    id: "about",
    test: /about|who are you|background|experience|journey/i,
    reply:
      "I'm Echo — here to help you get around. The person behind this site is a full-stack engineer currently freelancing, building analytics pipelines, APIs, and web apps.",
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

/* Roaming behaviour tuning */
const ROAM_Y_FRACTION = [0.52, 0.86]; // vertical band the bot wanders in
const ROAM_X_MARGIN_PX = 24; // keep clear of screen edges
const ROAM_PAUSE_MS = [3200, 6500]; // time bot lingers before picking a new spot
const ROAM_SPEED_PX_MS = 0.075; // walking speed, controls travel duration
const BOT_SIZE = 96; // px, footprint of the avatar for bounds math
const AUTO_WAVE_EVERY_MS = [7000, 13000]; // spontaneous little waves while idle

/* Helpers                                                            */

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

function randBetween(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Resolves a reply for the given message. Returns a Promise on purpose —
 * swap the body for a real call later, e.g.
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

/* Robot avatar — the visual character itself                        */

/**
 * A small, original cream-and-charcoal robot with a glowing amber visor.
 * Pure SVG so it scales crisply and can be recolored via CSS variables.
 * `gesture` drives the arm/eye state: "idle" | "wave" | "greet".
 */
function RobotAvatar({ gesture = "idle", size = BOT_SIZE }) {
  const waving = gesture === "wave" || gesture === "greet";

  return (
    <svg
      viewBox="0 0 120 140"
      width={size}
      height={(size * 140) / 120}
      className="pointer-events-none select-none"
      style={{
        filter:
          "drop-shadow(0 10px 18px rgba(23, 20, 15, 0.16)) drop-shadow(0 1px 1px rgba(23, 20, 15, 0.08))",
      }}
    >
      {/* antenna */}
      <motion.line
        x1="60" y1="12" x2="60" y2="-2"
        stroke="#E8641F" strokeWidth="3" strokeLinecap="round"
      />
      <motion.circle
        cx="60" cy="-6" r="5.5" fill="#FF8A3D"
        animate={{ opacity: [0.55, 1, 0.55], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* left ear ring */}
      <circle cx="13" cy="46" r="11" fill="#F7F1E6" stroke="#E7DFCF" strokeWidth="2" />
      <circle cx="13" cy="46" r="4.5" fill="none" stroke="#FF8A3D" strokeWidth="2" opacity="0.85" />

      {/* right ear ring */}
      <circle cx="107" cy="46" r="11" fill="#F7F1E6" stroke="#E7DFCF" strokeWidth="2" />
      <circle cx="107" cy="46" r="4.5" fill="none" stroke="#FF8A3D" strokeWidth="2" opacity="0.85" />

      {/* head */}
      <rect x="16" y="8" width="88" height="68" rx="32" fill="#F7F1E6" stroke="#E7DFCF" strokeWidth="1.5" />

      {/* visor */}
      <rect x="31" y="27" width="58" height="34" rx="17" fill="#1B1712" />

      {/* eyes — happy closed crescents, matching the glow of the visor */}
      <motion.path
        d="M44 44 Q50 35 56 44"
        stroke="#FF9A4D" strokeWidth="3.2" strokeLinecap="round" fill="none"
        animate={{ scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.85, 0.92, 1], ease: "easeInOut" }}
        style={{ transformOrigin: "50px 40px" }}
      />
      <motion.path
        d="M64 44 Q70 35 76 44"
        stroke="#FF9A4D" strokeWidth="3.2" strokeLinecap="round" fill="none"
        animate={{ scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, times: [0, 0.85, 0.92, 1], ease: "easeInOut" }}
        style={{ transformOrigin: "70px 40px" }}
      />

      {/* mouth */}
      <path d="M52 53 Q60 58 68 53" stroke="#FF9A4D" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.9" />

      {/* torso */}
      <rect x="21" y="72" width="78" height="56" rx="28" fill="#F7F1E6" stroke="#E7DFCF" strokeWidth="1.5" />

      {/* belly chat-bubble badge */}
      <rect x="44" y="94" width="32" height="19" rx="9.5" fill="#1B1712" />
      <circle cx="53" cy="103.5" r="2.3" fill="#FF9A4D" />
      <circle cx="60" cy="103.5" r="2.3" fill="#FF9A4D" />
      <circle cx="67" cy="103.5" r="2.3" fill="#FF9A4D" />

      {/* left (still) arm */}
      <rect x="14" y="86" width="14" height="30" rx="7" fill="#F7F1E6" stroke="#E7DFCF" strokeWidth="1.5" />

      {/* right (waving) arm — rotates from the shoulder */}
      <motion.g
        style={{ transformOrigin: "96px 88px" }}
        animate={
          waving
            ? { rotate: [0, -18, 4, -14, 0] }
            : { rotate: [0, -6, 0] }
        }
        transition={
          waving
            ? { duration: 0.9, ease: "easeInOut" }
            : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <rect x="90" y="70" width="14" height="30" rx="7" fill="#F7F1E6" stroke="#E7DFCF" strokeWidth="1.5" />
        <circle cx="97" cy="68" r="8" fill="#F7F1E6" stroke="#E7DFCF" strokeWidth="1.5" />
      </motion.g>
    </svg>
  );
}

/* Roaming launcher — the bot wandering the page                      */

function RoamingBot({ onOpen, hasUnread }) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true,
  );
  const [pos, setPos] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth - BOT_SIZE - 32 : 0,
    y: typeof window !== "undefined" ? window.innerHeight - BOT_SIZE - 40 : 0,
  }));
  const [duration, setDuration] = useState(0);
  const [facingLeft, setFacingLeft] = useState(false);
  const [gesture, setGesture] = useState("idle");
  const [isHovered, setIsHovered] = useState(false);

  const roamTimer = useRef(null);
  const waveTimer = useRef(null);
  const posRef = useRef(pos);
  posRef.current = pos;

  const stationary = prefersReducedMotion || !isDesktop;

  /* Track viewport size class */
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pickNextSpot = useCallback(() => {
    const maxX = window.innerWidth - BOT_SIZE - ROAM_X_MARGIN_PX;
    const minX = ROAM_X_MARGIN_PX;
    const minY = window.innerHeight * ROAM_Y_FRACTION[0];
    const maxY = window.innerHeight * ROAM_Y_FRACTION[1] - BOT_SIZE;

    const nextX = randBetween(minX, Math.max(minX + 40, maxX));
    const nextY = randBetween(minY, Math.max(minY + 40, maxY));

    const dist = Math.hypot(nextX - posRef.current.x, nextY - posRef.current.y);
    const travelMs = Math.min(4200, Math.max(1100, dist / ROAM_SPEED_PX_MS));

    setFacingLeft(nextX < posRef.current.x);
    setDuration(travelMs / 1000);
    setPos({ x: nextX, y: nextY });

    roamTimer.current = setTimeout(pickNextSpot, travelMs + randBetween(...ROAM_PAUSE_MS));
  }, []);

  /* Kick off roaming (desktop, motion allowed, not hovered) */
  useEffect(() => {
    if (stationary || isHovered) return undefined;
    roamTimer.current = setTimeout(pickNextSpot, randBetween(600, 1800));
    return () => clearTimeout(roamTimer.current);
  }, [stationary, isHovered, pickNextSpot]);

  /* Spontaneous little waves while wandering, purely for personality */
  useEffect(() => {
    if (stationary) return undefined;
    const scheduleWave = () => {
      waveTimer.current = setTimeout(() => {
        setGesture("wave");
        setTimeout(() => setGesture("idle"), 900);
        scheduleWave();
      }, randBetween(...AUTO_WAVE_EVERY_MS));
    };
    scheduleWave();
    return () => clearTimeout(waveTimer.current);
  }, [stationary]);

  const handleEnter = () => {
    setIsHovered(true);
    setGesture("greet");
    clearTimeout(roamTimer.current);
  };
  const handleLeave = () => {
    setIsHovered(false);
    setGesture("idle");
  };

  const commonProps = {
    type: "button",
    onClick: onOpen,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onFocus: handleEnter,
    onBlur: handleLeave,
    "aria-label": "Chat with Echo",
    className: "pointer-events-auto relative flex items-center justify-center focus:outline-none",
  };

  if (stationary) {
    return (
      <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
        <motion.button
          {...commonProps}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
        >
          <RobotAvatar gesture={gesture} size={72} />
          {hasUnread && (
            <span className="absolute right-1 top-2 h-2.5 w-2.5 rounded-full bg-[#E8641F] ring-2 ring-white" />
          )}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        className="pointer-events-none absolute"
        initial={false}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ duration, ease: "easeInOut" }}
        style={{ width: BOT_SIZE }}
      >
        {/* gentle walking bob, independent of the travel animation */}
        <motion.div
          animate={{ y: isHovered ? 0 : [0, -5, 0] }}
          transition={{ duration: 1.1, repeat: isHovered ? 0 : Infinity, ease: "easeInOut" }}
          style={{ scaleX: facingLeft ? -1 : 1 }}
        >
          <button {...commonProps}>
            <RobotAvatar gesture={gesture} />
            {hasUnread && (
              <span className="absolute right-2 top-3 h-2.5 w-2.5 rounded-full bg-[#E8641F] ring-2 ring-white" />
            )}
          </button>
        </motion.div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.94 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-neutral-200 bg-white px-3 py-1 text-[12px] font-medium text-neutral-700 shadow-sm"
              style={{ scaleX: facingLeft ? -1 : 1 }}
            >
              <span style={{ display: "inline-block", transform: facingLeft ? "scaleX(-1)" : "none" }}>
                Chat with Echo
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* Chat panel                                                         */

function ChatPanel({
  messages,
  isTyping,
  suggestions,
  inputValue,
  setInputValue,
  sendMessage,
  closeChat,
  navigate,
  panelRef,
  inputRef,
  messagesEndRef,
}) {
  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Echo"
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex h-[32rem] w-[min(92vw,23rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_48px_rgba(0,0,0,0.14)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden">
              <RobotAvatar gesture="idle" size={38} />
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
                Echo
              </div>
              <div className="text-sm font-medium text-neutral-900">
                Site assistant
              </div>
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
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
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
                    transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.15 }}
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
              placeholder="Ask Echo a question..."
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
    </div>
  );
}

/* Root component                                                     */

export default function EchoCharacter() {
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
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
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
    <>
      <AnimatePresence>
        {!isOpen && <RoamingBot onOpen={openChat} hasUnread={hasUnread} />}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            suggestions={suggestions}
            inputValue={inputValue}
            setInputValue={setInputValue}
            sendMessage={sendMessage}
            closeChat={closeChat}
            navigate={navigate}
            panelRef={panelRef}
            inputRef={inputRef}
            messagesEndRef={messagesEndRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}