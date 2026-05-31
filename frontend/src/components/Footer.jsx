function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">

      <div className="max-w-6xl mx-auto text-center">

        <h3 className="text-2xl font-bold text-white mb-4">
          Girish Gowda
        </h3>

        <p className="text-gray-400 mb-6">
          Full Stack Developer • Python Developer • AI/ML Enthusiast
        </p>

        <div className="flex justify-center gap-6">

          <a
            href="https://github.com/Girishg0wda"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/girisha-s-r"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-400"
          >
            LinkedIn
          </a>

          <a
            href="mailto:girishgowdasr428@gmail.com"
            className="hover:text-blue-400"
          >
            Email
          </a>

        </div>

      </div>

    </footer>
  );
}

export default Footer;