import React, { useState } from "react";
import { createContact } from "../services/contactService";
import {
  Mail,
  MapPin,
  ArrowUpRight,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");
    setSuccess(false);

    try {
      await createContact(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact:", err);
      const detail =
        err.response?.data?.detail ||
        "An unexpected error occurred. Please try again.";
      setErrorMsg(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-36 pb-24 px-6 relative">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />

      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Page Header */}
        <div className="border-b border-fine pb-12 mb-20">
          <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold">
            [ CORRESPONDENCE & COLLABORATIONS ]
          </span>
          <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-tight mt-3 mb-4">
            Get In Touch
          </h1>
          <p className="font-sans text-lg text-gray-600 max-w-2xl leading-relaxed">
            Have an interesting opportunity, an API integration request, or a
            full-stack system layout to discuss? Drop me a message below.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <span className="font-mono text-[10px] text-gray-400 tracking-wider uppercase block mb-4">
                [ CONTACT DIRECTORY ]
              </span>

              {/* Email Link */}
              <div className="border-b border-fine/50 pb-6 mb-6">
                <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mb-2">
                  <Mail className="w-3.5 h-3.5" /> EMAIL ADDRESS
                </div>
                <a
                  href="mailto:girishgowdasr428@gmail.com"
                  className="text-xl sm:text-2xl font-serif font-light text-gray-900 hover:text-[#FF3311] transition-colors leading-none"
                >
                  girishgowdasr428@gmail.com
                </a>
              </div>

              {/* Location Link */}
              <div className="border-b border-fine/50 pb-6 mb-6">
                <div className="flex items-center gap-2 text-gray-500 font-mono text-xs mb-2">
                  <MapPin className="w-3.5 h-3.5" /> CURRENT LOCATION
                </div>
                <div className="text-xl sm:text-2xl font-serif font-light text-gray-900 leading-none">
                  Karnataka, India
                </div>
              </div>
            </div>

            {/* Social Panel */}
            <div>
              <span className="font-mono text-[10px] text-gray-400 tracking-wider uppercase block mb-4">
                [ SECURE NETWORKS ]
              </span>
              <div className="flex flex-col gap-3 font-mono text-xs font-bold">
                <a
                  href="https://github.com/Girishg0wda"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-white border border-fine rounded hover:border-black transition-all shadow-sm group"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4" /> GITHUB ARCHIVE
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#FF3311]" />
                </a>
                <a
                  href="https://www.linkedin.com/in/girisha-s-r/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-white border border-fine rounded hover:border-black transition-all shadow-sm group"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" /> LINKEDIN NETWORK
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#FF3311]" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#F1EFEA]/30 border border-fine rounded p-8 sm:p-12 shadow-brutal">
            <span className="font-mono text-[10px] text-gray-400 tracking-wider uppercase block mb-8">
              [ ENCRYPTED CORRESPONDENCE ]
            </span>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Alert Notifications */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 flex items-start gap-3 text-sm font-medium"
                    id="contact-success-alert"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold font-serif mb-1">
                        Message Transmitted Successfully!
                      </p>
                      <p className="font-sans text-xs">
                        Thank you, your parameters have been logged into the
                        secure database. I will analyze your inquiry shortly.
                      </p>
                    </div>
                  </motion.div>
                )}

                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-rose-50 border border-rose-300 rounded text-rose-800 flex items-start gap-3 text-sm font-medium"
                    id="contact-error-alert"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold font-serif mb-1">
                        Transmission Refused
                      </p>
                      <p className="font-sans text-xs">{errorMsg}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Girish Gowda"
                  className="w-full px-4 py-3 bg-white border border-fine rounded focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm transition-colors"
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="yourname@domain.com"
                  className="w-full px-4 py-3 bg-white border border-fine rounded focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm transition-colors"
                />
              </div>

              {/* Subject field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Collaborations, Freelance Queries, ML Systems"
                  className="w-full px-4 py-3 bg-white border border-fine rounded focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm transition-colors"
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                  Detailed Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Write details about your vision, technical goals, and scope parameters..."
                  className="w-full px-4 py-3 bg-white border border-fine rounded focus:border-black focus:ring-1 focus:ring-black outline-none font-sans text-sm transition-colors resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 mt-4 bg-black hover:bg-[#FF3311] text-white font-mono text-xs font-bold tracking-widest uppercase rounded shadow-brutal hover:shadow-brutal-orange transition-all duration-300 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>TRANSMITTING DIGITAL ENVOY...</>
                ) : (
                  <>
                    TRANSMIT MESSAGE ENVOY
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
