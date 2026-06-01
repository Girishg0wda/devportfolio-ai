import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function ContactCTA() {
  return (
    <section className="bg-black text-white py-24 px-6">

      <div
        className="
        max-w-5xl
        mx-auto
        text-center
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-12
        relative
        overflow-hidden
        "
      >

        {/* Glow Effect */}

        <div
          className="
          absolute
          -top-10
          -right-10
          w-40
          h-40
          bg-blue-500/20
          blur-3xl
          rounded-full
          "
        />

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
          Let's Connect
        </span>

        <h2
          className="
          text-4xl
          md:text-6xl
          font-bold
          mt-8
          "
        >
          Let's Build Something
          <span
            className="
            bg-gradient-to-r
            from-blue-400
            to-purple-500
            bg-clip-text
            text-transparent
            "
          >
            {" "}Amazing
          </span>
        </h2>

        <p
          className="
          text-gray-400
          mt-6
          max-w-2xl
          mx-auto
          text-lg
          "
        >
          Open to Full Stack Developer,
          Python Developer and Software Engineer
          opportunities. Let's discuss how I can
          contribute to your next project.
        </p>

        <Link
          to="/contact"
          className="
          inline-flex
          items-center
          gap-2
          mt-10
          px-8
          py-4
          rounded-xl
          bg-blue-600
          hover:bg-blue-700
          transition
          "
        >
          Contact Me
          <FaArrowRight />
        </Link>

      </div>

    </section>
  );
}

export default ContactCTA;