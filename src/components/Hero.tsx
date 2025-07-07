import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            {t("hero.greeting")}{" "}
            <span className="theme-text">{t("hero.name")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("hero.title")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="theme-gradient text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg border-0"
              onClick={() => scrollToSection("projects")}
            >
              {t("hero.cta")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 hover:border-blue-500 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              onClick={() => scrollToSection("contact")}
            >
              {t("hero.contact")}
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/barosz30"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Github className="w-6 h-6 text-slate-700" />
            </a>
            <a
              href="https://www.linkedin.com/in/miros%C5%82aw-wandyk-279b9b1a2/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Linkedin className="w-6 h-6 text-slate-700" />
            </a>
            <a
              href="mailto:miroslaw.wandyk@gmail.com"
              className="p-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <Mail className="w-6 h-6 text-slate-700" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection("skills")}
            className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300"
          >
            <ArrowDown className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
