import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../services/projectService";
import {
  FolderPlus,
  Trash2,
  Edit2,
  ArrowLeft,
  RefreshCw,
  Eye,
  Code,
  Github,
  ExternalLink,
} from "lucide-react";

export default function ManageProjects() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_link: "",
    live_link: "",
    image: "",
    project_number: "",
    year: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to retrieve projects list from SQLite DB.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.tech_stack ||
      !formData.github_link
    ) {
      setErrorMsg("Please complete all required fields (*).");
      return;
    }

    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (editingId !== null) {
        await updateProject(editingId, formData);
        setSuccessMsg("Project updated successfully in index database.");
      } else {
        await createProject(formData);
        setSuccessMsg("New project added successfully to indices.");
      }

      setFormData({
        title: "",
        description: "",
        tech_stack: "",
        github_link: "",
        live_link: "",
        image: "",
        project_number: "",
        year: "",
      });
      setEditingId(null);
      await loadProjects();
    } catch (error) {
      console.error(error);
      setErrorMsg("Error saving project configuration details.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this project from indices forever?",
    );
    if (!confirmed) return;

    setErrorMsg("");
    setSuccessMsg("");

    try {
      await deleteProject(id);
      setSuccessMsg("Project removed successfully.");
      await loadProjects();
    } catch (error) {
      console.error(error);
      setErrorMsg("Could not purge requested project record.");
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack,
      github_link: project.github_link,
      live_link: project.live_link || "",
      image: project.image || "",
      project_number: project.project_number || "",
      year: project.year || "",
    });
    // Scroll smoothly to form container
    const formElement = document.getElementById("project-form-container");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-36 pb-24 px-6 relative">
      <div className="grain-overlay" />

      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Header Controls */}
        <div className="border-b border-fine pb-12 mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-gray-500 hover:text-[#FF3311] mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> BACK TO DASHBOARD OVERVIEW
            </Link>
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-tight mt-1">
              Project Management
            </h1>
          </div>
          <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            [ PORTFOLIO BUILDER ]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Left Side */}
          <div
            id="project-form-container"
            className="lg:col-span-5 bg-white border-2 border-black rounded p-8 shadow-brutal scroll-mt-36"
          >
            <div className="flex items-center gap-2 mb-6 border-b border-fine pb-4">
              <FolderPlus className="w-5 h-5 text-[#FF3311]" />
              <h2 className="font-mono text-xs tracking-widest font-bold text-gray-900 uppercase">
                {editingId !== null
                  ? "[ EDIT ACTIVE RECORD ]"
                  : "[ REGISTER NEW PROJECT ]"}
              </h2>
            </div>

            {errorMsg && (
              <div className="p-4 mb-6 bg-rose-50 border border-rose-300 rounded text-rose-800 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="p-4 mb-6 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs font-medium">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                    INDEX N&#176;
                  </label>
                  <input
                    type="text"
                    name="project_number"
                    value={formData.project_number}
                    onChange={handleChange}
                    placeholder="01, 02..."
                    className="w-full px-3 py-2 bg-[#F1EFEA]/30 border border-fine rounded outline-none font-sans text-xs focus:border-black transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                    YEAR *
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    placeholder="2026"
                    className="w-full px-3 py-2 bg-[#F1EFEA]/30 border border-fine rounded outline-none font-sans text-xs focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                  PROJECT TITLE *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Predictive Crop Yield Optimization"
                  className="w-full px-4 py-2.5 bg-[#F1EFEA]/30 border border-fine rounded outline-none font-sans text-xs focus:border-black transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                  PROJECT DESCRIPTION *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Provide parameters, metrics, system architectures, and client goals accomplished..."
                  className="w-full px-4 py-2.5 bg-[#F1EFEA]/30 border border-fine rounded outline-none font-sans text-xs focus:border-black transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                  TECH STACK * (Comma separated)
                </label>
                <input
                  type="text"
                  name="tech_stack"
                  value={formData.tech_stack}
                  onChange={handleChange}
                  required
                  placeholder="React, FastAPI, Python, Scikit-learn"
                  className="w-full px-4 py-2.5 bg-[#F1EFEA]/30 border border-fine rounded outline-none font-sans text-xs focus:border-black transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                  IMAGE COVER URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 bg-[#F1EFEA]/30 border border-fine rounded outline-none font-sans text-xs focus:border-black transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                  GITHUB REPOSITORY *
                </label>
                <input
                  type="url"
                  name="github_link"
                  value={formData.github_link}
                  onChange={handleChange}
                  required
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2.5 bg-[#F1EFEA]/30 border border-fine rounded outline-none font-sans text-xs focus:border-black transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                  LIVE SYSTEM URL
                </label>
                <input
                  type="url"
                  name="live_link"
                  value={formData.live_link}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 bg-[#F1EFEA]/30 border border-fine rounded outline-none font-sans text-xs focus:border-black transition-colors"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-grow py-3 bg-black hover:bg-[#FF3311] text-white font-mono text-[10px] font-bold tracking-widest uppercase rounded shadow-brutal hover:shadow-brutal-orange transition-all"
                >
                  {editingId !== null
                    ? "SAVE EDIT PARAMETERS"
                    : "REGISTER TO INDEX"}
                </button>
                {editingId !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        title: "",
                        description: "",
                        tech_stack: "",
                        github_link: "",
                        live_link: "",
                        image: "",
                        project_number: "",
                        year: "",
                      });
                    }}
                    className="px-4 py-3 bg-gray-200 text-gray-700 font-mono text-[10px] rounded hover:bg-gray-300"
                  >
                    CANCEL
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* List Right Side */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-6 border-b border-fine pb-4">
              <span className="font-mono text-xs tracking-widest font-bold text-gray-400">
                [ INDEXED PORTFOLIO CORES ]
              </span>
              <span className="font-mono text-[10px] bg-[#F1EFEA] border border-fine px-2 py-0.5 rounded text-gray-600">
                TOTAL: {projects.length} RECORDS
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400 font-mono text-xs gap-3">
                <RefreshCw className="w-5 h-5 animate-spin text-[#FF3311]" />
                <span>QUERYING DATABASE INDICES...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center font-mono py-16 text-gray-400 border border-dashed border-fine rounded bg-[#F1EFEA]/20">
                [ SECURE DATABASE RETURNED 0 INDEXED ROWS ]
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {projects.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className="p-6 bg-white border border-fine rounded shadow-sm hover:shadow-brutal transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="max-w-md">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-[10px] bg-black text-[#FBF9F6] px-1.5 py-0.5 rounded leading-none">
                          N&#176; {proj.project_number || `0${idx + 1}`}
                        </span>
                        <span className="font-mono text-[10px] text-gray-400">
                          YEAR: {proj.year || "2026"}
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-gray-900 leading-snug">
                        {proj.title}
                      </h3>
                      <p className="font-sans text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Admin quick links */}
                      <div className="flex items-center gap-3 mt-3 font-mono text-[9px] text-gray-400">
                        <a
                          href={proj.github_link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-0.5 hover:text-[#FF3311]"
                        >
                          <Github className="w-3 h-3" /> REPO
                        </a>
                        {proj.live_link && (
                          <a
                            href={proj.live_link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-0.5 hover:text-[#FF3311]"
                          >
                            <ExternalLink className="w-3 h-3" /> DEMO
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-fine/50">
                      <button
                        onClick={() => handleEdit(proj)}
                        className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-1.5 px-4 py-2 border border-fine text-gray-700 hover:border-black hover:text-black rounded font-mono text-[10px] font-bold transition-all"
                      >
                        <Edit2 className="w-3 h-3 text-[#FF3311]" /> EDIT RECORD
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-1.5 px-4 py-2 border border-[#FF3311] text-[#FF3311] hover:bg-[#FF3311] hover:text-white rounded font-mono text-[10px] font-bold transition-all"
                      >
                        <Trash2 className="w-3 h-3" /> PURGE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
