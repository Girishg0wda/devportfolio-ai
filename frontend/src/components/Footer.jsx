import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div
          className="
          grid
          md:grid-cols-3
          gap-12
          "
        >

          {/* Brand */}

          <div>

            <h3
              className="
              text-3xl
              font-bold
              bg-gradient-to-r
              from-blue-400
              to-purple-500
              bg-clip-text
              text-transparent
              "
            >
              Girish.dev
            </h3>

            <p
              className="
              text-gray-400
              mt-4
              leading-7
              "
            >
              Full Stack Developer focused on
              building scalable web applications,
              backend systems and AI-powered
              solutions.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h4 className="font-semibold mb-4">
              Quick Links
            </h4>

            <div className="space-y-3">

              <a
                href="/"
                className="
                block
                text-gray-400
                hover:text-white
                "
              >
                Home
              </a>

              <a
                href="/projects"
                className="
                block
                text-gray-400
                hover:text-white
                "
              >
                Projects
              </a>

              <a
                href="/contact"
                className="
                block
                text-gray-400
                hover:text-white
                "
              >
                Contact
              </a>

            </div>

          </div>

          {/* Socials */}

          <div>

            <h4 className="font-semibold mb-4">
              Connect
            </h4>

            <div className="flex gap-5">

              <a
                href="https://github.com/Girishg0wda"
                target="_blank"
                rel="noreferrer"
                className="
                text-gray-400
                hover:text-blue-400
                transition
                "
              >
                <FaGithub size={22} />
              </a>

              <a
                href="https://www.linkedin.com/in/girisha-s-r"
                target="_blank"
                rel="noreferrer"
                className="
                text-gray-400
                hover:text-blue-400
                transition
                "
              >
                <FaLinkedin size={22} />
              </a>

              <a
                href="mailto:girishgowdasr428@gmail.com"
                className="
                text-gray-400
                hover:text-blue-400
                transition
                "
              >
                <FaEnvelope size={22} />
              </a>

            </div>

          </div>

        </div>

        <div
          className="
          border-t
          border-white/10
          mt-12
          pt-8
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-4
          "
        >

          <p className="text-gray-500 text-sm">
            © 2026 Girish Gowda. All Rights Reserved.
          </p>

          <a
            href="#top"
            className="
            flex
            items-center
            gap-2
            text-gray-400
            hover:text-white
            "
          >
            Back to Top
            <FaArrowUp />
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;