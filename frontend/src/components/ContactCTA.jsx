import { Link } from "react-router-dom";

function ContactCTA() {
  return (
    <section className="py-24 bg-black text-white text-center">
      <h2 className="text-5xl font-bold mb-6">
        Let's Build Something Amazing
      </h2>

      <p className="text-gray-400 mb-8">
        Open to Full Stack Developer, Python Developer
        and Software Engineer opportunities.
      </p>

      <Link
        to="/contact"
        className="
          bg-blue-600
          px-8
          py-4
          rounded-xl
          hover:bg-blue-700
          transition
        "
      >
        Contact Me
      </Link>
    </section>
  );
}

export default ContactCTA;