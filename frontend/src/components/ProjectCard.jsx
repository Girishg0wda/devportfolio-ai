function ProjectCard({ project }) {
  return (
    <div
      className="
bg-gray-900
border border-gray-800
rounded-2xl
p-6
hover:border-blue-500
hover:-translate-y-2
transition-all
duration-300
"
    >
      <h2 className="text-2xl font-bold mb-4">
        {project.title}
      </h2>

      <p className="text-gray-400 mb-6">
        {project.description}
      </p>

      <div className="mb-6">
        <span className="text-blue-400">
          {project.tech_stack}
        </span>
      </div>

      <div className="flex gap-3">

        <a
          href={project.github_link}
          target="_blank"
          rel="noreferrer"
          className="
            px-4
            py-2
            bg-blue-600
            rounded-lg
            hover:bg-blue-700
          "
        >
          GitHub
        </a>

      </div>
    </div>
  );
}

export default ProjectCard;