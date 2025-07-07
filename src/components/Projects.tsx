import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t } = useLanguage();

  const projects = [
    {
      title: t("projects.shop.title"),
      description: t("projects.shop.desc"),
      image:
        "https://plus.unsplash.com/premium_photo-1681488350342-19084ba8e224?q=80&w=1988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=800&h=600&crop=focalpoint&fp-x=0.7&fp-y=0.5&fit=crop",
      tags: [
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
        "Clerk",
      ],
      github: "https://github.com/PL-FE-SEP23-TeamMushrom/ProductCatalog",
      live: "https://catalog-deploy-barosz30s-projects.vercel.app/",
    },
    {
      title: t("projects.mobile.title"),
      description: t("projects.mobile.desc"),
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
      tags: ["React Native", "TypeScript", "Expo", "Nativewind", "REST API"],
      github: "https://github.com/Barosz30/games_database",
      live: "https://expo.dev/preview/update?message=Initial%20publish&updateRuntimeVersion=1.0.1&createdAt=2025-07-07T08%3A47%3A49.992Z&slug=exp&projectId=a02da5dc-75be-45f9-94fb-8ae288463e2e&group=541091ce-6a13-4e65-bb06-95e76d2bef1d",
    },
    {
      title: t("projects.bikeshop.title"),
      description: t("projects.bikeshop.desc"),
      image:
        "https://images.unsplash.com/photo-1521078803125-7efd09b65b8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=800&h=600&fit=crop",
      tags: ["SCSS", "HTML", "Figma", "BEM", "JavaScript"],
      github: "https://github.com/Barosz30/bikestore_layout",
      live: "https://barosz30.github.io/bikestore_layout/",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-white/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  {project.title}
                </h3>

                <p className="text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      {t("projects.code")}
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 theme-gradient text-white border-0"
                    asChild
                  >
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("projects.demo")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
