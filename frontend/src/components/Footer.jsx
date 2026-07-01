import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FBF9F6] border-t border-fine pt-24 pb-12 px-6">
      <div className="max-w-screen-2xl mx-auto">
        {/* Call to Action Banner */}
        <div className="border-b border-fine pb-16 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#FF3311] block mb-4">
              [ GET IN TOUCH ]
            </span>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-tight leading-none text-gray-900">
              Have a vision?
              <br />
              Let's build it.
            </h2>
          </div>

          <Link
            to="/contact"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-black text-white hover:bg-[#FF3311] font-mono text-sm font-bold tracking-widest rounded transition-all duration-300 shadow-brutal hover:shadow-brutal-orange"
          >
            START CONVERSATION
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-mono text-sm tracking-wider font-bold mb-4">
              GIRISH GOWDA
            </h3>

            <p className="font-sans text-sm text-gray-600 max-w-sm leading-relaxed">
              Bespoke web development and machine learning systems. Focused on
              robust full-stack software, data analytics, and interactive client
              experiences.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-4">
              [ NAVIGATION ]
            </h4>

            <div className="flex flex-col gap-3 font-mono text-xs tracking-wider">
              <Link to="/">HOME</Link>
              <Link to="/projects">PROJECTS</Link>
              <Link to="/about">ABOUT ME</Link>
              <Link to="/contact">CONTACT</Link>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-4">
              [ SOCIALS ]
            </h4>

            <div className="flex flex-col gap-3 font-mono text-xs tracking-wider">
              <a
                href="https://github.com/Girishg0wda"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-[#FF3311] transition-colors"
              >
                GITHUB
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href="https://www.linkedin.com/in/girisha-s-r/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-[#FF3311] transition-colors"
              >
                LINKEDIN
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href="mailto:girishgowdasr428@gmail.com"
                className="flex items-center gap-1 hover:text-[#FF3311] transition-colors"
              >
                EMAIL ME
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-fine/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] tracking-wider text-gray-500">
          <div>&copy; {currentYear} GIRISH GOWDA. ALL RIGHTS RESERVED.</div>

          <div className="flex items-center gap-2">
            <span>[ DESIGN BY EMERGENCE LABS ]</span>
            <span>●</span>
            <span>[ STYLED IN BRUTALIST PAPER ]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
