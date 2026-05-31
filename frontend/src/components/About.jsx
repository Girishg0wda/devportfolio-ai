function About() {
  return (
   <section className="bg-black text-white py-24 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

    <div>
      <h2 className="text-5xl font-bold mb-6">
        About Me
      </h2>

      <p className="text-gray-400 leading-8">
        Full Stack Developer specializing in
        React, FastAPI, PostgreSQL and AI-powered
        applications.

        Passionate about building scalable
        software solutions and solving
        real-world problems using technology.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6">

      <div className="
bg-white/[0.03]
border border-white/10
backdrop-blur-xl
rounded-3xl
p-6
">
        <h3 className="text-3xl font-bold">
          5+
        </h3>
        <p>Projects Built</p>
      </div>

      <div className="
bg-white/[0.03]
border border-white/10
backdrop-blur-xl
rounded-3xl
p-6
">
        <h3 className="text-3xl font-bold">
          React
        </h3>
        <p>Frontend</p>
      </div>

      <div className="
bg-white/[0.03]
border border-white/10
backdrop-blur-xl
rounded-3xl
p-6
">
        <h3 className="text-3xl font-bold">
          FastAPI
        </h3>
        <p>Backend</p>
      </div>

      <div className="
bg-white/[0.03]
border border-white/10
backdrop-blur-xl
rounded-3xl
p-6
">
        <h3 className="text-3xl font-bold">
          PostgreSQL
        </h3>
        <p>Database</p>
      </div>

    </div>

  </div>
</section>
  );
}

export default About;