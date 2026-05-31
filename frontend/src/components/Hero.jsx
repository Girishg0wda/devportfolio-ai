import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";

function Hero() {
return ( <section className="relative min-h-screen bg-black text-white overflow-hidden">

  <div
    className="
      absolute
      top-20
      right-20
      w-[400px]
      h-[400px]
      bg-blue-500/20
      blur-[120px]
      rounded-full
    "
  />

  <div className="max-w-7xl mx-auto px-6 pt-32 min-h-screen flex items-center">

    <div className="grid md:grid-cols-2 gap-16 items-center w-full">

      {/* Left Side */}

      <div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-blue-400 font-medium mb-4"
        >
          Hi, I'm Girish Gowda
        </motion.p>

        {/* <span className="
px-4 py-2
rounded-full
bg-blue-500/10
border border-blue-500/20
text-blue-400
text-sm
">
Full Stack Developer
</span> */}

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
          "
        >
          Building scalable
          <br />
          web
          <br />
          applications.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="
            text-gray-400
            text-lg
            mt-6
            max-w-xl
          "
        >
          Hi, I'm Girish Gowda. I build scalable web
          applications using React, FastAPI,
          PostgreSQL and Machine Learning technologies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link
            to="/projects"
            className="
              px-7
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              transition
            "
          >
            View My Work
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
              transition
            "
          >
            Resume
          </a>
        </motion.div>

      </div>

      {/* Right Side */}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <img
          src={profile}
          alt="Girish Gowda"
          className="
            w-[350px]
            h-[350px]
            md:w-[400px]
            md:h-[400px]
            object-cover
            rounded-full
            border
            border-white/10
            shadow-2xl
            hover:scale-105
            transition-all
            duration-500
          "
        />
      </motion.div>

    </div>

  </div>
</section>

);
}

export default Hero;
