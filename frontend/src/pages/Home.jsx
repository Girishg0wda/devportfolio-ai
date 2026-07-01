import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Cpu,
  Globe,
  Database,
  Award,
  FileText,
  Brain,
} from "lucide-react";
import ThreeBackground from "../components/ThreeBackground";
import { getProjects } from "../services/projectService";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setFeaturedProjects(data.slice(0, 3));
      } catch (error) {
        console.error("Error loading featured projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const corePillars = [
    {
      icon: <Globe className="w-5 h-5 text-[#FF3311]" />,
      title: "FULL STACK WEB",
      description:
        "Crafting modular, high-performance web systems with React, Node.js, and FastAPI.",
    },
    {
      icon: <Brain className="w-5 h-5 text-[#FF3311]" />,
      title: "AI & MACHINE LEARNING",
      description:
        "Developing intelligent agentic pipelines, generative AI models, predictive regressions, and neural analytics.",
    },
    {
      icon: <Database className="w-5 h-5 text-[#FF3311]" />,
      title: "DATA ARCHITECTURE",
      description:
        "Designing structured database systems with PostgreSQL, SQLite, and MongoDB.",
    },
  ];

  const skillCategories = [
    {
      id: "01",
      name: "FRONTEND",
      skills: [
        "React",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Responsive Design",
      ],
    },
    {
      id: "02",
      name: "BACKEND",
      skills: [
        "Python",
        "FastAPI",
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT Auth",
      ],
    },
    {
      id: "03",
      name: "DATABASES",
      skills: ["PostgreSQL", "MongoDB", "SQLite", "SQL", "SQLAlchemy"],
    },
    {
      id: "04",
      name: "DATA & BI",
      skills: ["Power BI", "Excel", "Pandas", "NumPy", "Seaborn", "Matplotlib"],
    },
    {
      id: "05",
      name: "ML",
      skills: [
        "Scikit-learn",
        "Supervised",
        "Unsupervised",
        "Regressions",
        "Forecasting",
      ],
    },
    {
      id: "06",
      name: "TOOLS",
      skills: ["Git", "GitHub", "Postman", "Vercel", "Jupyter", "Docker"],
    },
  ];

  const experienceList = [
    {
      role: "Full Stack & Machine Learning Engineer",
      company: "Independent / Consultant",
      period: "2026 — PRESENT",
      details:
        "Developing customized analytics pipelines, full-stack REST API architectures, and interactive browser interfaces with elegant layouts and verified security rules.",
    },
    {
      role: "Machine Learning & Data Analytics Intern",
      company: "Unified Mentor",
      period: "2025",
      details:
        "Built machine learning models using Python, Pandas, NumPy, and Scikit-learn. Created Power BI dashboards, performed data preprocessing, clustering, and predictive analytics.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FBF9F6]">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />

      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-36 pb-12 px-6 overflow-hidden border-b border-fine z-10">
        {/* 3D Wireframe backdrop */}
        <ThreeBackground />

        {/* Hero Top Details */}
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col sm:flex-row sm:justify-between items-start gap-4 z-10 font-mono text-xs tracking-widest text-gray-500">
          <div>[ GIRISH GOWDA // CREATIVE DEVELOPER ]</div>
          <div>[ BASED IN INDIA // AVAILABLE GLOBAL ]</div>
        </div>

        {/* Huge Headline */}
        <div className="max-w-screen-2xl mx-auto w-full z-10 my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-2"
          >
            <span className="font-mono text-xs tracking-[0.2em] text-[#FF3311] font-bold">
              [ PORTFOLIO & ARCHIVE ]
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif font-light tracking-tight leading-[0.9] text-gray-900">
              AI, Machine Learning <br />
              <span className="italic font-normal text-[#FF3311]">
                &amp; Full-Stack
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 font-sans text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed"
          >
            I build mathematically sound, highly modular systems. Merging robust
            FastAPI endpoints with high-fidelity React interfaces, AI-driven
            architectures, and machine learning analytics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-10 font-mono text-xs font-bold"
          >
            <Link
              to="/projects"
              className="px-6 py-4 bg-black text-[#FBF9F6] rounded shadow-brutal hover:bg-[#FF3311] hover:text-white transition-all duration-300"
            >
              EXPLORE RECENT PROJECTS
            </Link>
            <Link
              to="/contact"
              className="px-6 py-4 border border-fine rounded hover:border-black hover:bg-black/5 transition-colors"
            >
              HIRE ME
            </Link>
            <a
              href="/resume.pdf"
              download
              rel="noreferrer"
              className="px-6 py-4 border-2 border-[#FF3311] text-[#FF3311] rounded hover:bg-[#FF3311] hover:text-white transition-all duration-300 flex items-center gap-1.5 shadow-sm"
            >
              RESUME <FileText className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Hero Footer Scroll indicator */}
        <div className="max-w-screen-2xl mx-auto w-full flex justify-between items-center z-10 font-mono text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-[#FF3311] rounded-full animate-ping" />
            <span>CONNECTING LOGIC AND DESIGN</span>
          </div>
          <a
            href="#featured-projects"
            className="flex items-center gap-1 hover:text-black transition-colors"
          >
            SCROLL DOWN <ArrowDown className="w-3 h-3 animate-bounce" />
          </a>
        </div>
      </section>

      {/* =====================================================
          FEATURED PROJECTS
          ===================================================== */}
      <section
        id="featured-projects"
        className="py-24 px-6 border-b border-fine bg-[#FBF9F6]"
      >
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4 pb-8 border-b border-fine/50">
            <div>
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF3311] font-bold uppercase">
                [ ARCHIVE SELECTION ]
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mt-2 text-gray-900">
                Featured Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="group flex items-center gap-1.5 font-mono text-xs tracking-widest font-bold hover:text-[#FF3311] transition-colors"
            >
              VIEW THE FULL DIRECTORY{" "}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400 font-mono text-xs gap-3">
              <span className="animate-pulse">
                INDEXING REAL-TIME ARCHIVES...
              </span>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center font-mono py-16 text-gray-400 border border-dashed border-fine rounded bg-[#F1EFEA]/20">
              [ SECURE DATABASE RETURNED 0 INDEXED ROWS ]
            </div>
          ) : (
            <div className="flex flex-col">
              {featuredProjects.map((project, idx) => {
                const firstTech =
                  project.tech_stack.split(",")[0]?.trim() || "FULL STACK";
                return (
                  <div
                    key={project.id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-16 border-b border-fine last:border-b-0 group"
                  >
                    {/* Left Column: Image with zoom and brutalist frame */}
                    <div className="lg:col-span-5">
                      <div className="relative overflow-hidden bg-[#F1EFEA] border-2 border-black rounded p-2 shadow-brutal hover:shadow-brutal-orange transition-all duration-300">
                        <div className="aspect-[16/10] overflow-hidden rounded-sm relative">
                          <img
                            src={
                              project.image ||
                              "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                            }
                            alt={project.title}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-[1.03]"
                            loading="lazy"
                          />
                          {/* Top-Left tag badge */}
                          <div className="absolute top-4 left-4 font-mono text-[9px] font-bold tracking-widest uppercase bg-white text-black border border-black px-2.5 py-1 rounded-sm shadow-sm">
                            {firstTech.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Text block with split columns */}
                    <div className="lg:col-span-7">
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
                        {/* Title, description, tags */}
                        <div className="sm:col-span-8 flex flex-col h-full justify-between">
                          <div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gray-900 group-hover:text-[#FF3311] transition-colors leading-tight mb-4">
                              {project.title}
                            </h3>
                            <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                              {project.description}
                            </p>
                          </div>

                          {/* Tech stack badges */}
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tech_stack.split(",").map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 font-mono text-[9px] font-bold tracking-wider bg-white border border-black/15 text-gray-700 uppercase rounded-none hover:border-black transition-colors"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Metadata vertical strip & Action links */}
                        <div className="sm:col-span-4 flex flex-col justify-between h-full sm:border-l sm:border-fine/50 sm:pl-8 sm:min-h-[180px]">
                          {/* Top Meta stack */}
                          <div className="flex flex-col gap-1 font-mono text-[10px] text-gray-400">
                            <span className="text-[#FF3311] font-bold tracking-widest uppercase">
                              N&#176; {project.project_number || `0${idx + 1}`}{" "}
                              / PROJECT
                            </span>
                            <span className="font-bold">
                              {project.year || "2026"}
                            </span>
                            <span className="uppercase text-[9px] tracking-wider bg-[#F1EFEA] border border-fine px-2 py-0.5 rounded-sm w-max mt-1 text-gray-600 font-bold">
                              {firstTech.toUpperCase()}
                            </span>
                          </div>

                          {/* Bottom Link buttons */}
                          <div className="flex flex-col gap-3 font-mono text-[11px] font-bold tracking-widest mt-8 sm:mt-auto">
                            <a
                              href={project.github_link}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-gray-900 hover:text-[#FF3311] transition-colors group/link"
                            >
                              <span>↳ SOURCE</span>
                              <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                            {project.live_link && (
                              <a
                                href={project.live_link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-gray-900 hover:text-[#FF3311] transition-colors group/link"
                              >
                                <span>LIVE ↗</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          ABOUT & CORE WORK PILLARS
          ===================================================== */}
      <section className="py-24 px-6 border-b border-fine bg-[#F1EFEA]/20">
        <div className="max-w-screen-2xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column (Main description) */}
            <div className="lg:col-span-7">
              <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold">
                [ AI &amp; SYSTEM PHILOSOPHY ]
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mt-2 mb-6">
                Engineered with AI intelligence, <br />
                architected with intent.
              </h2>
              <p className="font-sans text-lg text-gray-700 leading-relaxed mb-6">
                I approach AI design and full-stack software development as a
                premium craft. Every system I architect is optimized for clean
                data ingestion, robust neural state manipulation, agentic
                intelligence, and seamless interface transitions.
              </p>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8">
                With deep competencies spanning Python API development, agentic
                AI workflows, modern Javascript frontends, and advanced
                predictive machine learning models, I build scalable tools that
                translate raw analytical findings and neural reasoning into
                fluid, production-ready UX patterns.
              </p>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-black hover:text-[#FF3311]"
              >
                READ FULL BIOGRAPHY <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Column (Brutalist bento elements) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {corePillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-6 bg-[#FBF9F6] border border-fine rounded shadow-brutal hover:shadow-brutal-orange hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {pillar.icon}
                    <h3 className="font-mono text-xs tracking-wider font-bold">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SKILLS SECTION
          ===================================================== */}
      <section className="py-24 px-6 border-b border-fine bg-[#FBF9F6]">
        <div className="max-w-screen-2xl mx-auto px-6">
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-5">
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF3311] font-bold uppercase flex items-center gap-1.5">
                ↳ 004 / TOOLKIT
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mt-4 text-gray-900 leading-none">
                Things I reach <br className="hidden md:inline" />
                for.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:pt-8">
              <p className="font-mono text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl">
                A working set, not a list of buzzwords — frontend craft, backend
                APIs, data work and machine learning. Picked because they hold
                up in production.
              </p>
            </div>
          </div>
        </div>

        {/* Huge Horizontal Marquee Banner */}
        <div className="w-full overflow-hidden border-y border-fine py-8 my-12 bg-[#FBF9F6] relative">
          <div className="animate-marquee flex gap-12 items-center whitespace-nowrap">
            {/* Set 1 */}
            <div className="flex gap-12 items-center shrink-0">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                React
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                JavaScript
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                HTML5
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                FastAPI
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                Python
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                PostgreSQL
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                Tailwind CSS
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                Vercel
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                Postman
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                Jupyter
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
            </div>
            {/* Set 2 (Identical duplicate for seamless transition) */}
            <div className="flex gap-12 items-center shrink-0">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                React
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                JavaScript
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                HTML5
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                FastAPI
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                Python
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                PostgreSQL
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                Tailwind CSS
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                Vercel
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 tracking-tight">
                Postman
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight [-webkit-text-stroke:1px_#111111] text-transparent">
                Jupyter
              </span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#FF3311] shrink-0" />
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-screen-2xl mx-auto mt-16 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {skillCategories.map((category) => (
              <div key={category.id} className="flex flex-col">
                {/* Header Border & Text */}
                <div className="flex justify-between items-center border-t border-black/30 pt-4 pb-4">
                  <span className="font-mono text-xs tracking-widest text-gray-600 font-bold">
                    {category.id} / {category.name}
                  </span>
                  <span className="w-1.5 h-1.5 bg-[#FF3311] rounded-full" />
                </div>
                {/* Badges Container */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 font-mono text-[10px] tracking-wider font-bold bg-white border border-black/15 text-gray-800 hover:border-[#FF3311] hover:text-[#FF3311] transition-all duration-200 uppercase cursor-default rounded-none shadow-sm hover:shadow-brutal hover:-translate-y-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCE SECTION
          ===================================================== */}
      <section className="py-24 px-6 border-b border-fine bg-[#F1EFEA]/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold">
              [ CHRONOLOGY ]
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight mt-2">
              Professional Experience
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            {experienceList.map((exp, i) => (
              <div
                key={i}
                className="relative pl-8 border-l border-fine/60 flex flex-col md:flex-row md:justify-between md:items-start gap-4"
              >
                {/* Visual marker */}
                <div className="absolute -left-[4.5px] top-1.5 w-2.5 h-2.5 bg-[#FF3311] rounded-full border border-white" />

                <div className="max-w-xl">
                  <h3 className="text-xl font-serif font-light text-gray-900">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-gray-400 block mt-1">
                    {exp.company}
                  </span>
                  <p className="font-sans text-sm text-gray-600 mt-3 leading-relaxed">
                    {exp.details}
                  </p>
                </div>

                <div className="font-mono text-xs text-[#FF3311] font-bold shrink-0">
                  {exp.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CTA SECTION
          ===================================================== */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold">
            [ COLLABORATION ]
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight mt-4 mb-8">
            Let's design software with a purpose.
          </h2>
          <p className="font-sans text-lg text-gray-600 mb-10 leading-relaxed">
            I’m always looking to partner with visionary designers, creative
            agencies, and data analytics groups to assemble high-performance
            user interfaces and advanced systems.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 font-mono text-xs font-bold">
            <Link
              to="/contact"
              className="px-8 py-5 bg-[#FF3311] text-white rounded shadow-brutal hover:bg-black transition-all duration-300"
            >
              INITIATE PROJECT REKUEST
            </Link>
            <a
              href="mailto:girishgowdasr428@gmail.com"
              className="px-8 py-5 bg-white border border-fine rounded hover:border-black transition-colors"
            >
              DIRECT EMAIL CORRESPONDENCE
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
