import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
