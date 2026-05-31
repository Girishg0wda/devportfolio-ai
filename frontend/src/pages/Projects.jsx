import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";

<div className="min-h-screen bg-black p-8"></div>
function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();

  }, []);

  return (
  <div className="pt-36 min-h-screen bg-black text-white px-8 py-16">
    <div className="max-w-7xl mx-auto">

      <h1 className="text-5xl font-bold text-center mb-12">
        My Projects
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>

    </div>
  </div>
);
}

export default Projects;