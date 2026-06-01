import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function FeaturedProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data.slice(0, 3));
  };

  return (
    <section className="bg-black text-white py-20">
      <div className="text-center mb-16">

  <span
    className="
    px-4
    py-2
    rounded-full
    bg-blue-500/10
    border
    border-blue-500/20
    text-blue-400
    text-sm
    "
  >
    Portfolio
  </span>

  <h2
    className="
    text-4xl
    md:text-5xl
    font-bold
    mt-6
    "
  >
    Featured Projects
  </h2>

  <p
    className="
    text-gray-400
    mt-4
    max-w-2xl
    mx-auto
    "
  >
    A selection of full-stack, machine learning
    and data-driven applications I've built.
  </p>

</div>

      <div className="
max-w-7xl
mx-auto
grid
md:grid-cols-2
lg:grid-cols-3
gap-8
px-6
">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="
group
overflow-hidden
rounded-3xl
border
border-white/10
bg-white/[0.03]
backdrop-blur-xl
hover:border-blue-500/30
hover:-translate-y-3
hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]
transition-all
duration-300
flex
flex-col
h-full
"
          >
            <img
  src={project.image}
  alt={project.title}
  className="
    h-52
    w-full
    object-cover
    object-top
    group-hover:scale-110
    transition-all
    duration-700
  "
/>

            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold mb-3">
                {project.title}
              </h3>

              <p
  className="
  text-gray-400
  mb-5
  line-clamp-4
  "
>
  {project.description}
</p>

              <div className="flex flex-wrap gap-2 mb-5">
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

              <div className="mt-auto flex gap-3">
                <a
  href={project.github_link}
  target="_blank"
  rel="noreferrer"
  className="
  flex
  items-center
  gap-2
  px-4
  py-2
  rounded-xl
  bg-blue-600
  hover:bg-blue-700
  transition
  "
>
  <FaGithub />
  GitHub
</a>

                {project.live_link && (
                  <a
  href={project.live_link}
  target="_blank"
  rel="noreferrer"
  className="
  flex
  items-center
  gap-2
  px-4
  py-2
  rounded-xl
  border
  border-white/10
  hover:border-blue-500/30
  transition
  "
>
  <FaExternalLinkAlt />
  Live Demo
</a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-14">

  <Link
    to="/projects"
    className="
    inline-flex
    items-center
    gap-2
    px-8
    py-3
    rounded-xl
    bg-blue-600
    hover:bg-blue-700
    transition
    "
  >
    View All Projects
    <FaExternalLinkAlt />
  </Link>

</div>
    </section>
  );
}

export default FeaturedProjects;