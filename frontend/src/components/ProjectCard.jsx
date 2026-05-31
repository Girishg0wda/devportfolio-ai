function ProjectCard({ project }) {
  return (
    <div
      className="
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.03]
      backdrop-blur-xl
      hover:border-blue-500/30
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >
      {/* Project Image */}

      <img
        src={project.image}
        alt={project.title}
        className="
        w-full
        h-56
        object-cover
        "
      />

      {/* Content */}

      <div className="p-6">

        <h2 className="text-2xl font-bold mb-3">
          {project.title}
        </h2>

        <p className="text-gray-400 mb-5">
          {project.description}
        </p>

        {/* Tech Stack */}

        <div className="flex flex-wrap gap-2 mb-6">

          {project.tech_stack
            ?.split(",")
            .map((tech) => (

              <span
                key={tech}
                className="
                px-3
                py-1
                rounded-full
                bg-blue-500/10
                border
                border-blue-500/20
                text-blue-400
                text-sm
                "
              >
                {tech.trim()}
              </span>

            ))}

        </div>

        {/* Buttons */}

        <div className="flex gap-3">

          <a
            href={project.github_link}
            target="_blank"
            rel="noreferrer"
            className="
            px-4
            py-2
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            transition
            "
          >
            GitHub
          </a>

          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noreferrer"
              className="
              px-4
              py-2
              rounded-xl
              border
              border-white/10
              "
            >
              Live Demo
            </a>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProjectCard;