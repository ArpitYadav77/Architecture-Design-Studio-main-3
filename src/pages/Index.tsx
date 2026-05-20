import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Index = ({ isStarted }: { isStarted?: boolean }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div id="hero">
        <Hero isStarted={isStarted} />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
