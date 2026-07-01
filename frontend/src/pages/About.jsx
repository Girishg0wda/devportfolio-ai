import React from "react";
import {
  ArrowUpRight,
  Award,
  Code,
  BookOpen,
  Star,
  Sparkles,
  Mail,
  Linkedin,
  Github,
} from "lucide-react";
import profileImage from "../assets/profile.png";

export default function About() {
  const experiences = [
    {
      title: "Data Analytics Intern",
      institution: "Bluestock Fintech",
      period: "2026 — PRESENT",
      description:
        "Developed interactive Power BI dashboards, performed data cleaning and preprocessing, analyzed datasets to generate business insights, and supported predictive analytics using statistical and machine learning techniques.",
    },
    {
      title: "Web Development Intern",
      institution: "Okulr Techminds",
      period: "2025",
      description:
        "Developed responsive web applications using React, FastAPI, PostgreSQL, and Tailwind CSS. Built REST APIs, implemented JWT authentication, and collaborated on client projects.",
    },
    {
      title: "Machine Learning Intern",
      institution: "Unified Mentor",
      period: "2024",
      description:
        "Built machine learning models using Python, Pandas, NumPy, and Scikit-learn. Designed and deployed supervised ML classification models for predictive analytics, driving data cleaning and advanced feature engineering pipelines.",
    },
  ];

  const educations = [
    {
      title: "Bachelor of Engineering",
      institution: "Don Bosco Institute of Technology (VTU)",
      period: "2022 — 2026",
      description:
        "Focused on Full Stack Development, Artificial Intelligence, Machine Learning, Data Structures, Database Management Systems, and Software Engineering.",
    },
  ];

  const skillCategories = [
    {
      name: "FRONTEND SYSTEMS",
      skills: [
        "React 19",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "HTML5/CSS3",
        "Responsive Systems",
      ],
    },
    {
      name: "BACKEND & MICROSERVICES",
      skills: [
        "FastAPI",
        "Python",
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT Auth",
        "OAuth Flows",
      ],
    },
    {
      name: "DATA SCIENCE & ML",
      skills: [
        "Scikit-learn",
        "K-Means",
        "Random Forest",
        "Pandas",
        "NumPy",
        "Exploratory Analytics",
      ],
    },
    {
      name: "DATABASES & ORMS",
      skills: [
        "PostgreSQL",
        "SQLite",
        "MongoDB",
        "SQLAlchemy",
        "Database Designing",
      ],
    },
    {
      name: "TOOLS & DEPLOYMENT",
      skills: [
        "Git/GitHub",
        "Docker",
        "VS Code",
        "Vercel",
        "Render",
        "Postman",
      ],
    },
  ];

  const statCards = [
    {
      icon: <Code className="w-5 h-5 text-[#FF3311]" />,
      value: "5+",
      label: "Complex Projects Built",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#FF3311]" />,
      value: "React 19",
      label: "Modern Frontend Core",
    },
    {
      icon: <Award className="w-5 h-5 text-[#FF3311]" />,
      value: "FastAPI",
      label: "Performant Backend API",
    },
    {
      icon: <Star className="w-5 h-5 text-[#FF3311]" />,
      value: "100%",
      label: "Secure Auth Pipelines",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-36 pb-24 px-6 relative">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />

      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Page Header */}
        <div className="border-b border-fine pb-12 mb-20">
          <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold">
            [ BIOGRAPHY & EXPERIENCE ]
          </span>
          <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-tight mt-3 mb-4">
            About Girish Gowda
          </h1>
          <p className="font-sans text-lg text-gray-600 max-w-2xl leading-relaxed">
            Full Stack Developer and Machine Learning Engineer focused on
            bridging programmatic intelligence with pristine physical user
            interfaces.
          </p>
        </div>

        {/* Biography Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group bg-[#F1EFEA] border-2 border-black p-2 rounded shadow-brutal hover:shadow-brutal-orange transition-all duration-300 w-full max-w-md">
              <img
                src={profileImage}
                alt="Girish Gowda"
                className="w-full h-auto object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4 bg-black text-white font-mono text-[10px] px-2 py-1 uppercase">
                [ FULL-STACK ENGINEER ]
              </div>
            </div>

            {/* Social Channels inside about */}
            <div className="w-full max-w-md grid grid-cols-3 gap-3 mt-6 font-mono text-xs font-bold text-center">
              <a
                href="https://github.com/Girishg0wda"
                target="_blank"
                rel="noreferrer"
                className="py-3 bg-white border border-fine hover:border-black rounded flex items-center justify-center gap-1 hover:text-[#FF3311] transition-colors shadow-sm"
              >
                GITHUB <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/girisha-s-r/"
                target="_blank"
                rel="noreferrer"
                className="py-3 bg-white border border-fine hover:border-black rounded flex items-center justify-center gap-1 hover:text-[#FF3311] transition-colors shadow-sm"
              >
                LINKEDIN <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:girishgowdasr428@gmail.com"
                className="py-3 bg-white border border-fine hover:border-black rounded flex items-center justify-center gap-1 hover:text-[#FF3311] transition-colors shadow-sm"
              >
                EMAIL <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Biography Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 font-sans text-gray-700 leading-relaxed text-base">
            <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold">
              [ WHO AM I ]
            </span>
            <h3 className="text-3xl font-serif font-light text-gray-900 tracking-tight leading-tight">
              A programmer dedicated to engineering modular code and creative
              analytics.
            </h3>
            <p>
              I am a technology enthusiast who specializes in crafting complex
              full-stack web architectures and training machine learning
              algorithms. I am in the unique position of understanding how data
              moves through servers, databases, and APIs while maintaining an
              intense appreciation for minimalist editorial layout aesthetics.
            </p>
            <p>
              My professional background spans full-stack Python (using FastAPI)
              and JavaScript/TypeScript (using Node.js, Express, and React) as
              well as unsupervised machine learning (clustering), model
              fine-tuning, regression, and data analytics dashboards (Power BI).
            </p>
            <p>
              When I construct software, I aim for structural clarity, high data
              speeds, clean security protocols, and zero performance bloat. I
              believe that web applications can be visually striking, clean, and
              highly sophisticated simultaneously.
            </p>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {statCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F1EFEA]/40 border border-fine rounded flex items-center gap-4"
                >
                  <div className="p-2 bg-white rounded border border-fine">
                    {card.icon}
                  </div>
                  <div>
                    <div className="text-xl font-serif font-bold text-gray-900 leading-none">
                      {card.value}
                    </div>
                    <div className="text-[10px] font-mono text-gray-400 tracking-wider uppercase mt-1">
                      {card.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology breakdown */}
        <div className="border-t border-fine pt-20 mb-24">
          <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold block mb-8 text-center">
            [ EXPERTISE MATRIX ]
          </span>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {skillCategories.map((cat, i) => (
              <div
                key={i}
                className="p-6 bg-white border border-fine rounded shadow-sm hover:shadow-brutal hover:border-black transition-all duration-300"
              >
                <h4 className="font-mono text-xs tracking-wider font-bold text-[#FF3311] mb-4 border-b border-fine/50 pb-2">
                  {cat.name}
                </h4>
                <div className="flex flex-col gap-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="font-sans text-xs text-gray-600 flex items-center gap-1.5"
                    >
                      <span className="w-1 h-1 bg-black rounded-full" />
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline block */}
        <div className="border-t border-fine pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Timeline Experience */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-10">
                <Star className="w-5 h-5 text-[#FF3311]" />
                <h4 className="font-mono text-sm tracking-widest font-bold">
                  PROFESSIONAL CHRONOLOGY
                </h4>
              </div>
              <div className="flex flex-col gap-10">
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="relative pl-6 border-l border-fine/60"
                  >
                    <div className="absolute -left-[3.5px] top-1.5 w-1.5 h-1.5 bg-[#FF3311] rounded-full" />
                    <span className="font-mono text-[10px] text-[#FF3311] font-bold block mb-1">
                      {exp.period}
                    </span>
                    <h5 className="text-lg font-serif font-light text-gray-900 leading-snug">
                      {exp.title}
                    </h5>
                    <span className="font-sans text-xs text-gray-400 block mt-0.5">
                      {exp.institution}
                    </span>
                    <p className="font-sans text-xs text-gray-600 mt-2.5 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Education */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 mb-10">
                <BookOpen className="w-5 h-5 text-[#FF3311]" />
                <h4 className="font-mono text-sm tracking-widest font-bold">
                  ACADEMIC TIMELINE
                </h4>
              </div>
              <div className="flex flex-col gap-10">
                {educations.map((edu, i) => (
                  <div
                    key={i}
                    className="relative pl-6 border-l border-fine/60"
                  >
                    <div className="absolute -left-[3.5px] top-1.5 w-1.5 h-1.5 bg-[#FF3311] rounded-full" />
                    <span className="font-mono text-[10px] text-[#FF3311] font-bold block mb-1">
                      {edu.period}
                    </span>
                    <h5 className="text-lg font-serif font-light text-gray-900 leading-snug">
                      {edu.title}
                    </h5>
                    <span className="font-sans text-xs text-gray-400 block mt-0.5">
                      {edu.institution}
                    </span>
                    <p className="font-sans text-xs text-gray-600 mt-2.5 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
