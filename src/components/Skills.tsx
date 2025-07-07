import {
  Code,
  Database,
  Smartphone,
  Cloud,
  Wrench,
  Layers,
  Brain,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Skills = () => {
  const { t } = useLanguage();

  const skills = [
    {
      icon: Code,
      title: t("skills.frontend"),
      description: t("skills.frontend.desc"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Database,
      title: t("skills.backend"),
      description: t("skills.backend.desc"),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Smartphone,
      title: t("skills.mobile"),
      description: t("skills.mobile.desc"),
      color: "from-purple-500 to-pink-500",
    },
    // {
    //   icon: Cloud,
    //   title: t('skills.cloud'),
    //   description: t('skills.cloud.desc'),
    //   color: "from-orange-500 to-red-500"
    // },
    {
      icon: Wrench,
      title: t("skills.tools"),
      description: t("skills.tools.desc"),
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Layers,
      title: t("skills.architecture"),
      description: t("skills.architecture.desc"),
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Brain,
      title: t("skills.ai"),
      description: t("skills.ai.desc"),
      color: "from-fuchsia-600 to-violet-600",
    },
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("skills.title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <skill.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                {skill.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
