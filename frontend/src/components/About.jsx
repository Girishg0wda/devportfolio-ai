import { motion } from "framer-motion";
import {
  FaCode,
  FaServer,
  FaDatabase,
  FaRocket,
} from "react-icons/fa";

function About() {
  const cards = [
    {
      icon: <FaRocket />,
      title: "5+",
      subtitle: "Projects Built",
    },
    {
      icon: <FaCode />,
      title: "React",
      subtitle: "Frontend Development",
    },
    {
      icon: <FaServer />,
      title: "FastAPI",
      subtitle: "Backend APIs",
    },
    {
      icon: <FaDatabase />,
      title: "PostgreSQL",
      subtitle: "Database Design",
    },
  ];

  return (
    <section className="bg-black text-white pt-20 pb-8 px-6">

      <div className="max-w-6xl mx-auto mb-0">

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
            About Me
          </span>

          <h2
            className="
            text-4xl
            md:text-5xl
            font-bold
            mt-6
            "
          >
            Passionate About Building
            Digital Solutions
          </h2>

          <p
            className="
            text-gray-400
            mt-6
            max-w-3xl
            mx-auto
            leading-8
            "
          >
            I'm a Full Stack Developer specializing in
            React, FastAPI, PostgreSQL and Machine Learning.

            I enjoy building scalable applications,
            solving real-world problems and creating
            modern user experiences through technology.
          </p>

        </div>

        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          "
        >

          {cards.map((card, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="
              bg-white/[0.03]
              border
              border-white/10
              backdrop-blur-xl
              rounded-3xl
              p-8
              hover:scale-105
              hover:border-blue-500/30
              transition-all
              duration-300
              text-center
              "
            >

              <div
                className="
                text-blue-400
                text-3xl
                mb-4
                flex
                justify-center
                "
              >
                {card.icon}
              </div>

              <h3 className="text-3xl font-bold">
                {card.title}
              </h3>

              <p className="text-gray-400 mt-2">
                {card.subtitle}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default About;