import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";

import profile from "../assets/profile.png";

function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Glow Background */}
      <div
        className="
        absolute
        top-20
        right-10
        w-[350px]
        h-[350px]
        md:w-[500px]
        md:h-[500px]
        bg-blue-500/20
        blur-[150px]
        rounded-full
        "
      />

      <div className="max-w-7xl mx-auto px-6 pt-32 min-h-screen flex items-center">

        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT */}

          <div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
              inline-block
              px-4
              py-2
              rounded-full
              bg-blue-500/10
              border
              border-blue-500/20
              text-blue-400
              text-sm
              mb-6
              "
            >
              Full Stack Developer | ML Developer
            </motion.span>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-blue-400 mb-4"
            >
              Hi, I'm Girish Gowda
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
              text-5xl
              sm:text-6xl
              md:text-7xl
              font-bold
              leading-tight
              "
            >
              Building scalable
              <br />

              web{" "}

              <span
                className="
                bg-gradient-to-r
                from-blue-400
                to-purple-500
                bg-clip-text
                text-transparent
                "
              >
                applications.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="
              text-gray-400
              text-lg
              mt-6
              max-w-xl
              leading-relaxed
              "
            >
              I build scalable web applications using React,
              FastAPI, PostgreSQL and Machine Learning
              technologies.
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="
              flex
              flex-col
              sm:flex-row
              gap-4
              mt-10
              "
            >
              <Link
                to="/projects"
                className="
                flex
                items-center
                justify-center
                gap-2
                px-7
                py-3
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                transition
                "
              >
                View My Work
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="
                px-7
                py-3
                rounded-xl
                border
                border-gray-700
                hover:border-white
                text-center
                transition
                "
              >
                Contact Me
              </Link>

              <a
                href="/resume.pdf"
                download
                className="
                px-7
                py-3
                rounded-xl
                border
                border-gray-700
                hover:border-white
                text-center
                transition
                "
              >
                Resume
              </a>
            </motion.div>

            {/* Social Icons */}

            <div className="flex gap-5 mt-8">

              <a
                href="https://github.com/Girishg0wda"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaGithub size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/girisha-s-r/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedin size={24} />
              </a>

              <a
                href="mailto:girishgowdasr428@gmail.com"
                className="text-gray-400 hover:text-white"
              >
                <FaEnvelope size={24} />
              </a>

            </div>

          </div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div
              className="
              p-1
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-purple-500
              shadow-[0_0_60px_rgba(59,130,246,0.35)]
              "
            >
              <img
                src={profile}
                alt="Girish Gowda"
                className="
                w-[280px]
                h-[280px]
                md:w-[450px]
                md:h-[450px]
                object-cover
                rounded-full
                bg-black
                "
              />
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}

export default Hero;