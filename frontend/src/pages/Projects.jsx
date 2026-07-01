import React, { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { ArrowUpRight, Github, ExternalLink, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-36 pb-24 px-6 relative">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />

      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Page Header */}
        <div className="border-b border-fine pb-12 mb-20">
          <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold">
            [ DIRECTORY & REPOSITORIES ]
          </span>
          <h1 className="text-5xl sm:text-7xl font-serif font-light tracking-tight mt-3 mb-4">
            Creative Portfolio
          </h1>
          <p className="font-sans text-lg text-gray-600 max-w-2xl leading-relaxed">
            A chronological compilation of full-stack software development, REST
            API microservices, machine learning analytics platforms, and
            database designs.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500 font-mono text-sm gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#FF3311]" />
            <span>RETRIEVING ENCRYPTED FILE SYSTEM...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center font-mono py-24 text-gray-400 border border-dashed border-fine/60 rounded p-12 bg-[#F1EFEA]/20">
            [ SECURE DATABASE IS CURRENTLY EMPTY ]
          </div>
        ) : (
          <div className="flex flex-col gap-24 md:gap-36">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-fine/30 pb-16 md:pb-24`}
                >
                  {/* Left or Right: Image block */}
                  <div
                    className={`lg:col-span-7 ${isEven ? "lg:order-1" : "lg:order-2"} w-full`}
                  >
                    <div className="relative group bg-[#F1EFEA] border border-fine rounded overflow-hidden aspect-video shadow-brutal hover:shadow-brutal-orange transition-all duration-300">
                      {/* Image tag with dynamic hover effects */}
                      <img
                        src={
                          project.image ||
                          "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                        }
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Accent details overlay */}
                      <div className="absolute top-4 left-4 bg-black text-[#FBF9F6] font-mono text-xs px-2 py-1 rounded">
                        INDEX: {project.project_number || `0${index + 1}`}
                      </div>

                      <div className="absolute top-4 right-4 bg-white/95 border border-fine text-gray-900 font-mono text-[10px] px-2 py-1 rounded">
                        {project.year || "2026"}
                      </div>
                    </div>
                  </div>

                  {/* Left or Right: Content text block */}
                  <div
                    className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"} flex flex-col gap-4 pl-0 lg:pl-4`}
                  >
                    {/* Index header metadata */}
                    <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400">
                      <span>
                        PROJECT N&#176;{" "}
                        {project.project_number || `0${index + 1}`}
                      </span>
                      <span>●</span>
                      <span>{project.year || "2026"}</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 tracking-tight leading-tight hover:text-[#FF3311] transition-colors">
                      {project.title}
                    </h2>

                    {/* Description */}
                    <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Tech tag elements */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech_stack.split(",").map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 font-mono text-[9px] bg-white border border-fine rounded text-gray-600 uppercase tracking-wider"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Interactive anchor buttons */}
                    <div className="flex flex-wrap gap-4 border-t border-fine/40 pt-6 font-mono text-xs font-bold">
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-1.5 px-4 py-2 bg-black text-white hover:bg-[#FF3311] rounded shadow-brutal transition-all"
                      >
                        <Github className="w-4 h-4" />
                        GITHUB REPO
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>

                      {project.live_link && (
                        <a
                          href={project.live_link}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-1.5 px-4 py-2 border border-fine text-gray-900 hover:bg-black/5 rounded transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          LIVE PROJECT
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
