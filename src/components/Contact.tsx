import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    toast({
      title: t("contact.success.title"),
      description: t("contact.success.desc"),
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.email"),
      value: "miroslaw.wandyk@gmail.com",
      href: "mailto:miroslaw.wandyk@gmail.com",
    },
    {
      icon: Phone,
      label: t("contact.phone"),
      value: "+(48) 504 188 172",
      href: "tel:+48504188172",
    },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: "Myszyniec, Poland",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-white/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-center text-slate-800 mb-6">
              {t("hero.contact")}
            </h3>

            <div className="flex flex-col gap-6 lg:flex-row">
              {contactInfo.map((info, index) => (
                <a
                  key={info.label}
                  href={info.href}
                  className="flex items-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-12 h-12 rounded-lg theme-gradient p-3 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <div className="text-sm text-slate-500 mb-1">
                      {info.label}
                    </div>
                    <div className="text-slate-800 font-medium">
                      {info.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
