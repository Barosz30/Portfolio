import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Palette, Languages, Settings } from "lucide-react";
import { useState } from "react";

const SettingsPanel = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { name: "blue", colors: "from-blue-500 to-cyan-500" },
    { name: "purple", colors: "from-purple-500 to-pink-500" },
    { name: "green", colors: "from-green-500 to-emerald-500" },
    { name: "orange", colors: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="sm"
        className="rounded-full w-12 h-12 p-0 bg-white/80 backdrop-blur-sm border border-white/20 hover:bg-white/90 text-slate-700 shadow-lg"
        variant="outline"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {isOpen && (
        <div className="absolute top-14 right-0 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl min-w-[280px]">
          <div className="space-y-6">
            {/* Theme Selector */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-slate-700" />
                <h3 className="font-semibold text-slate-800">Theme</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.name}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => setTheme(themeOption.name as any)}
                    className={`w-full h-12 rounded-xl bg-gradient-to-r ${
                      themeOption.colors
                    } transition-all duration-300 hover:scale-105 ${
                      theme === themeOption.name
                        ? "ring-2 ring-slate-400 ring-offset-2"
                        : ""
                    }`}
                  >
                    <span className="sr-only">{themeOption.name} theme</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Languages className="w-4 h-4 text-slate-700" />
                <h3 className="font-semibold text-slate-800">Language</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => setLanguage("en")}
                  size="sm"
                  variant={language === "en" ? "default" : "outline"}
                  className="justify-center"
                >
                  🇺🇸 EN
                </Button>
                <Button
                  onClick={() => setLanguage("pl")}
                  size="sm"
                  variant={language === "pl" ? "default" : "outline"}
                  className="justify-center"
                >
                  🇵🇱 PL
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
