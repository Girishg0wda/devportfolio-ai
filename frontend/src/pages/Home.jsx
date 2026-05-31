import MainLayout from "../layouts/MainLayout";

import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import FeaturedProjects from "../components/FeaturedProjects";
import ContactCTA from "../components/ContactCTA";

function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <ContactCTA />
    </MainLayout>
  );
}

export default Home;