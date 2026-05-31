import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../services/projectService";

function ManageProjects() {
    const [formData, setFormData] =
  useState({
    title: "",
    description: "",
    tech_stack: "",
    github_link: "",
    live_link: "",
    image: "",
  });

  const [editingId, setEditingId] =
  useState(null);

  const [projects, setProjects] = useState([]);
  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]:
      e.target.value,
  });
};


  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editingId) {

      await updateProject(
        editingId,
        formData
      );

    } else {

      await createProject(
        formData
      );

    }

    setFormData({
      title: "",
      description: "",
      tech_stack: "",
      github_link: "",
      live_link: "",
      image: "",
    });

    setEditingId(null);

    loadProjects();

  } catch (error) {
    console.error(error);
  }
};

   const handleDelete = async (id) => {
    try {
      await deleteProject(id);

      loadProjects();

    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project) => {
  setEditingId(project.id);

  setFormData({
    title: project.title,
    description: project.description,
    tech_stack: project.tech_stack,
    github_link: project.github_link,
    live_link: project.live_link,
    image: project.image,
  });
};

  return (
    <DashboardLayout>
        
        <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-8">
            Manage Projects
        </h1>

        <form
    onSubmit={handleSubmit}
    className="
        bg-gray-900
        p-6
        rounded-xl
        mb-8
    "
    >

    <h2 className="text-2xl mb-4">
    {editingId
        ? "Edit Project"
        : "Add Project"}
    </h2>

    <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="
        w-full
        p-3
        mb-3
        bg-gray-800
        rounded
        "
    />

    <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="
        w-full
        p-3
        mb-3
        bg-gray-800
        rounded
        "
    />

    <input
        name="tech_stack"
        placeholder="Tech Stack"
        value={formData.tech_stack}
        onChange={handleChange}
        className="
        w-full
        p-3
        mb-3
        bg-gray-800
        rounded
        "
    />

    <input
        name="github_link"
        placeholder="GitHub Link"
        value={formData.github_link}
        onChange={handleChange}
        className="
        w-full
        p-3
        mb-3
        bg-gray-800
        rounded
        "
    />

    <button
    className="
        bg-green-600
        px-6
        py-3
        rounded
    "
    >
    {editingId
        ? "Update Project"
        : "Add Project"}
    </button>

    </form>

        <div className="space-y-4">
            {projects.map((project) => (
            <div
                key={project.id}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800"
            >
                <h2 className="text-2xl font-bold">
                {project.title}
                </h2>

                <p className="text-gray-400">
                {project.description}
                </p>

                <div className="mt-4 flex gap-3">
                <button
    onClick={() => handleEdit(project)}
    className="bg-yellow-600 px-4 py-2 rounded"
    >
    Edit
    </button>

                <button
                    onClick={() => {
    const confirmed = window.confirm(
        "Delete this project?"
    );

    if (confirmed) {
        handleDelete(project.id);
    }
    }}
                    className="bg-red-600 px-4 py-2 rounded"
                >
                    Delete
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
        </DashboardLayout>
  );
}

export default ManageProjects;