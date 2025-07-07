import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import SettingsPanel from "@/components/SettingsPanel";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SettingsPanel />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Chatbot />
    </div>
  );
};

export default Index;
