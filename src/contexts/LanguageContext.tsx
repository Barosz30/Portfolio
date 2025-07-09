import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "pl";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Hero section
    "hero.greeting": "Hi, I'm",
    "hero.name": "Mirosław Wandyk",
    "hero.title": "Fullstack Engineer",
    "hero.description":
      "Passionate developer specializing in JavaScript/TypeScript, React, Node.js, and mobile applications. I create scalable web solutions and user-friendly mobile experiences.",
    "hero.cta": "View My Work",
    "hero.contact": "Get In Touch",

    // Skills section
    "skills.title": "Technical Expertise",
    "skills.subtitle":
      "Technologies and frameworks I work with to build modern applications",
    "skills.frontend": "Frontend Development",
    "skills.frontend.desc":
      "React, TypeScript, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS, responsive design",
    "skills.backend": "Backend Development",
    "skills.backend.desc":
      "Node.js, Express, NestJS, REST APIs, GraphQL, microservices architecture",
    "skills.mobile": "Mobile Development",
    "skills.mobile.desc":
      "React Native, Expo, iOS/Android deployment, cross-platform solutions",
    "skills.cloud": "Cloud & DevOps",
    "skills.cloud.desc":
      "AWS, Docker, CI/CD pipelines, serverless functions, database management",
    "skills.tools": "Development Tools",
    "skills.tools.desc":
      "Git, Webpack, Vite, ESLint, Prettier, testing frameworks, debugging tools",
    "skills.architecture": "System Architecture",
    "skills.architecture.desc":
      "Scalable applications, design patterns, performance optimization, code quality",
    "skills.ai": "Artificial Intelligence",
    "skills.ai.desc":
      "Integration of AI models and chatbots using OpenAI, LangChain, and ML frameworks.",

    // Projects section
    "projects.title": "Featured Projects",
    "projects.subtitle":
      "A collection of projects showcasing my technical skills and problem-solving abilities",
    "projects.shop.title": "Online Shop",
    "projects.shop.desc":
      "An application developed by a three-person team, where I served as the team lead. We built the project using Next.js, with MongoDB as the database (no-sql) and Clerk for user authentication.",
    "projects.mobile.title": "Games Database - Mobile App",
    "projects.mobile.desc":
      "A mobile application built with React Native / Expo that allows users to browse the latest games from the IGDB database (integrated with Twitch). NativeWind used for styling components (Tailwind for React Native).",
    "projects.bikeshop.title": "Bicycle Shop Landing Page",
    "projects.bikeshop.desc":
      "A bicycle store landing page built based on a Figma design. The page was developed using a mobile-first approach and scales seamlessly across mobile, tablet, and desktop devices.",
    "projects.matchgame.title": "Match 3 Game",
    "projects.matchgame.desc":
      "The Match-3 game project. The app follows a mobile-first approach and seamlessly adapts to various screen sizes — from smartphones and tablets to desktop computers.",

    "projects.code": "View Code",
    "projects.demo": "Live Demo",

    // About section
    "about.title": "About Me",
    "about.p1":
      "I'm a full-stack developer focused on React, Next.js, Node.js, and TypeScript, with experience in building both web and mobile apps. I’ve worked commercially on SPAs and PWAs using Context, Redux, Capacitor, and a broad range of front-end and back-end tools.",
    "about.p2":
      "I turn Figma designs into fully functional UIs, ensuring performance and clean code. I’ve collaborated on projects from e-commerce platforms to mobile game catalogs, using modern technologies such as Tailwind, Material UI, and PostgreSQL.",
    "about.p3":
      "Outside of coding, I improve my skills by solving algorithmic challenges (200+) and sharing knowledge. My background in event management taught me teamwork and creative problem-solving.",
    "about.experience": "Years of Experience",
    "about.projects": "Completed Projects",
    "about.technologies": "Technologies in Stack",
    "about.contributions": "Algorithmic Tasks",

    // Contact section
    "contact.title": "Let's Work Together",
    "contact.phone": "Phone",
    "contact.location": "Location",
    "contact.email.placeholder": "Your Email Adress",
    "contact.subtitle":
      "Ready to bring your ideas to life? Let's discuss your next project.",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.success": "Message sent successfully!",
    "contact.error": "Failed to send message. Please try again.",

    // Chatbot
    "chatbot.title": "Ask About My Skills",
    "chatbot.subtitle": "I'm here to help!",
    "chatbot.placeholder": "Type your question...",
    "chatbot.welcome":
      "Hi! I'm here to answer questions about my skills, experience, and projects. What would you like to know?",
    "chatbot.skills":
      "I specialize in JavaScript/TypeScript, React, Node.js, and mobile development with React Native. I also work with modern tools like Next.js, Express, AWS, and various databases.",
    "chatbot.experience":
      "I have over 5 years of experience in frontend and fullstack development, working on everything from enterprise SaaS platforms to mobile applications.",
    "chatbot.projects":
      "I've built various projects including enterprise web applications, e-commerce mobile apps, and real-time collaboration tools. Check out my portfolio section for more details!",
    "chatbot.contact":
      "You can reach me through the contact form below or connect with me on professional networks. I'm always open to discussing new opportunities!",
    "chatbot.mobile":
      "I develop cross-platform mobile applications using React Native and Expo, with experience in iOS/Android deployment and app store optimization.",
    "chatbot.greeting":
      "Hello! I'm excited to chat with you about my development skills and experience. What interests you most?",
    "chatbot.default":
      "That's an interesting question! Feel free to ask me about my technical skills, work experience, projects, or how we can work together.",
  },
  pl: {
    // Hero section
    "hero.greeting": "Cześć, jestem",
    "hero.name": "Mirosław Wandyk",
    "hero.title": "Fullstack Developer",
    "hero.description":
      "Pasjonat programowania specjalizujący się w JavaScript/TypeScript, React, Node.js i aplikacjach mobilnych. Tworzę skalowalne rozwiązania webowe i przyjazne użytkownikowi aplikacje mobilne.",
    "hero.cta": "Zobacz Moje Prace",
    "hero.contact": "Skontaktuj Się",

    // Skills section
    "skills.title": "Umiejętności Techniczne",
    "skills.subtitle":
      "Technologie i frameworki, których używam do budowania nowoczesnych aplikacji",
    "skills.frontend": "Frontend Development",
    "skills.frontend.desc":
      "React, TypeScript, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS, responsive design",
    "skills.backend": "Backend Development",
    "skills.backend.desc":
      "Node.js, Express, NestJS, REST API, GraphQL, architektura mikroserwisów",
    "skills.mobile": "Rozwój Mobilny",
    "skills.mobile.desc":
      "React Native, Expo, wdrażanie iOS/Android, rozwiązania wieloplatformowe",
    "skills.cloud": "Cloud & DevOps",
    "skills.cloud.desc":
      "AWS, Docker, CI/CD pipelines, funkcje bezserwerowe, zarządzanie bazami danych",
    "skills.tools": "Narzędzia Deweloperskie",
    "skills.tools.desc":
      "Git, Webpack, Vite, ESLint, Prettier, frameworki testowe, narzędzia debugowania",
    "skills.architecture": "Architektura Systemów",
    "skills.architecture.desc":
      "Skalowalne aplikacje, wzorce projektowe, optymalizacja wydajności, jakość kodu",
    "skills.ai": "Sztuczna Inteligencja",
    "skills.ai.desc":
      "Integracja modeli AI oraz chatbotów z wykorzystaniem OpenAI, LangChain i frameworków ML.",

    // Projects section
    "projects.title": "Wybrane Projekty",
    "projects.subtitle":
      "Kolekcja projektów pokazujących moje umiejętności techniczne i zdolności rozwiązywania problemów",
    "projects.shop.title": "Sklep Internetowy",
    "projects.shop.desc":
      "Aplikacja stworzona w trzyosobowym zespole, w którym pełniłem rolę lidera zespołu. Projekt zrealizowaliśmy w technologii Next.js, wykorzystując MongoDB jako bazę danych (no-sql) oraz Clerk do obsługi autentycacji.",
    "projects.mobile.title": "Baza Gier - Aplikacja Mobilna",
    "projects.mobile.desc":
      "Aplikacja mobilna stworzona w React Native / Expo, umożliwiająca przeglądanie najnowszych gier z bazy danych IGDB (zintegrowanej z Twitch). Do stylowania komponentów użyłem NativeWind (Tailwind do React Native).",
    "projects.bikeshop.title": "Landing Page Sklepu Rowerowego",
    "projects.bikeshop.desc":
      "Landing page sklepu rowerowego stworzony na podstawie projektu z Figma. Strona została zaprojektowana w podejściu mobile-first i płynnie dostosowuje się do urządzeń mobilnych, tabletów oraz komputerów stacjonarnych.",
    "projects.matchgame.title": "Gra Match 3",
    "projects.matchgame.desc":
      "Projekt gry Match 3. Aplikacja została zaprojektowana w podejściu mobile-first i płynnie dostosowuje się do różnych rozdzielczości — od smartfonów, przez tablety, aż po komputery stacjonarne.",
    "projects.code": "Zobacz Kod",
    "projects.demo": "Zobacz Aplikację",

    // About section

    "about.title": "O Mnie",
    "about.p1":
      "Jestem fullstack developerem specjalizującym się w React, Next.js, Node.js i TypeScript, z doświadczeniem w budowie aplikacji webowych i mobilnych. Pracowałem komercyjnie nad SPA i PWA, wykorzystując Context, Redux, Capacitor oraz wiele narzędzi frontendowych i backendowych.",
    "about.p2":
      "Tłumaczę projekty z Figma na w pełni funkcjonalne interfejsy użytkownika, dbając o wydajność i czystość kodu. Współpracowałem przy wielu projektach – od aplikacji e-commerce po katalogi gier – stosując nowoczesne technologie jak Tailwind, Material UI czy PostgreSQL.",
    "about.p3":
      "Poza kodowaniem rozwijam się przez rozwiązywanie zadań algorytmicznych (200+) i dzielenie się wiedzą z innymi. Z doświadczenia event managera wyniosłem umiejętności pracy zespołowej i rozwiązywania problemów.",
    "about.experience": "Lat Doświadczenia",
    "about.projects": "Zrealizowanych Projektów",
    "about.technologies": "Technologii w Stacku",
    "about.contributions": "Zadania Algorytmicznych",

    // Contact section
    "contact.title": "Współpracujmy Razem",
    "contact.phone": "Telefon",
    "contact.email.placeholder": "Twój Adres Email",
    "contact.location": "Lokacja",
    "contact.subtitle":
      "Gotowy wcielić Twoje pomysły w życie? Porozmawiajmy o Twoim następnym projekcie.",
    "contact.name": "Twoje Imię",
    "contact.email": "Twój Email",
    "contact.message": "Twoja Wiadomość",
    "contact.send": "Wyślij Wiadomość",
    "contact.success": "Wiadomość wysłana pomyślnie!",
    "contact.error": "Nie udało się wysłać wiadomości. Spróbuj ponownie.",

    // Chatbot
    "chatbot.title": "Zapytaj o Moje Umiejętności",
    "chatbot.subtitle": "Jestem tutaj, żeby pomóc!",
    "chatbot.placeholder": "Wpisz swoje pytanie...",
    "chatbot.welcome":
      "Cześć! Jestem tutaj, żeby odpowiedzieć na pytania o moje umiejętności, doświadczenie i projekty. Co chciałbyś wiedzieć?",
    "chatbot.skills":
      "Specjalizuję się w JavaScript/TypeScript, React, Node.js i rozwoju mobilnym z React Native. Pracuję też z nowoczesnymi narzędziami jak Next.js, Express, AWS i różnymi bazami danych.",
    "chatbot.experience":
      "Mam ponad 5 lat doświadczenia w rozwoju frontend i fullstack, pracując nad wszystkim od platform SaaS dla przedsiębiorstw po aplikacje mobilne.",
    "chatbot.projects":
      "Zbudowałem różne projekty, w tym aplikacje webowe dla przedsiębiorstw, aplikacje mobilne e-commerce i narzędzia do współpracy w czasie rzeczywistym. Sprawdź sekcję portfolio po więcej szczegółów!",
    "chatbot.contact":
      "Możesz skontaktować się ze mną przez formularz kontaktowy poniżej lub połączyć się ze mną w sieciach profesjonalnych. Zawsze jestem otwarty na dyskusję o nowych możliwościach!",
    "chatbot.mobile":
      "Rozwijam wieloplatformowe aplikacje mobilne używając React Native i Expo, z doświadczeniem we wdrażaniu iOS/Android i optymalizacji sklepów z aplikacjami.",
    "chatbot.greeting":
      "Cześć! Cieszę się, że mogę porozmawiać z Tobą o moich umiejętnościach programistycznych i doświadczeniu. Co Cię najbardziej interesuje?",
    "chatbot.default":
      "To ciekawe pytanie! Śmiało pytaj mnie o moje umiejętności techniczne, doświadczenie zawodowe, projekty lub jak możemy współpracować.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem(
      "portfolio-language"
    ) as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
