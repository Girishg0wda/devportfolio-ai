import { motion } from "framer-motion";

function Skills() {
  const skills = [
  // Frontend
  "React",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Responsive Design",

  // Backend
  "Python",
  "FastAPI",
  "Node.js",
  "REST APIs",
  "JWT Authentication",

  // Databases
  "PostgreSQL",
  "MongoDB",
  "SQL",
  "SQLAlchemy",

  // Data Science & ML
  "Machine Learning",
  "Scikit-learn",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Data Analysis",
  "Data Visualization",

  // Tools
  "Git",
  "GitHub",
  "VS Code",
  "Postman",

  // Deployment
  "Vercel",
  "Render",
  "Neon PostgreSQL",

  // Concepts
  "CRUD Operations",
  "Authentication",
  "Full Stack Development"
];

  return (
    <section className="bg-black text-white py-16">

  <div className="max-w-6xl mx-auto px-6">

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >

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
        My Expertise
      </span>

      <h2
        className="
        text-4xl
        md:text-5xl
        font-bold
        mt-6
        "
      >
        Technologies I Work With
      </h2>

      <p
        className="
        text-gray-400
        mt-4
        max-w-2xl
        mx-auto
        "
      >
        Full Stack Development, Backend APIs,
        Databases, Cloud Deployment and
        Machine Learning.
      </p>

    </motion.div>

    <div
      className="
      flex
      flex-wrap
      justify-center
      gap-4
      "
    >

      {skills.map((skill, index) => (

        <motion.div
          key={skill}
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: index * 0.05,
          }}
          viewport={{ once: true }}
          className="
          px-5
          py-3
          rounded-full
          border
          border-blue-500/20
          bg-blue-500/5
          text-blue-300
          hover:bg-blue-500/10
          hover:border-blue-400
          hover:scale-105
          transition-all
          duration-300
          cursor-default
          "
        >
          {skill}
        </motion.div>

      ))}

    </div>

  </div>

</section>
  );
}

export default Skills;