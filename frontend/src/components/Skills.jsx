import { motion } from "framer-motion";

function Skills() {
  const skills = [
    "React",
    "JavaScript",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Machine Learning",
    "Pandas",
    "NumPy",
    "Git",
    "Docker",
    "Node.js",
  ];

  return (
    <section className="bg-black text-white py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Skills
      </h2>

      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
        {skills.map((skill) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="
              bg-gray-900
              border
              border-gray-800
              px-5
              py-3
              rounded-full
              hover:border-blue-500
              hover:scale-105
              transition
              inline-flex
            "
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;