import { Code, Award, Coffee, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Code, label: t("about.experience"), value: "2+" },
    { icon: Award, label: t("about.projects"), value: "10+" },
    { icon: Coffee, label: t("about.technologies"), value: "20+" },
    { icon: Github, label: t("about.contributions"), value: "200+" },
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              {t("about.title")}
            </h2>

            <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=600&h=600&fit=crop"
                alt="Developer at work"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl blur-3xl"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 mx-auto mb-4 p-3 rounded-xl theme-gradient">
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              <div className="text-2xl font-bold text-slate-800 mb-1">
                {stat.value}
              </div>

              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
