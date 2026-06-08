export type SupportedLanguage = "en" | "ig" | "ha" | "yo" | "pcm";

export const languages = [
  { code: "en", name: "English" },
  { code: "ig", name: "Igbo" },
  { code: "ha", name: "Hausa" },
  { code: "yo", name: "Yoruba" },
  { code: "pcm", name: "Pidgin" },
];

export const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      academy: "Academy",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      joinFree: "Join Free Class",
    },
    hero: {
      title: "Learn Coding in Your Tongue. Build the Future.",
      subtitle: "Empowering marginalized youths to build global careers without language barriers — in Igbo, Hausa, Yoruba, and Pidgin.",
      ctaStart: "Start Learning Free",
      ctaHire: "Hire Our Services",
    },
    services: {
      title: "Our Services",
      software: "Software Development",
      cloud: "Cloud Engineering",
      itSupport: "IT Support",
      customApps: "Custom Apps",
    },
    academy: {
      title: "Multi-Tongue Tech Academy",
      subtitle: "Master high-demand tech skills in your preferred local language.",
      courses: {
        html: "HTML & CSS",
        python: "Python",
        webDev: "Web Development",
        fullStack: "Full-Stack Development",
      },
      enroll: "Enroll Now",
    },
    contact: {
      title: "Contact Us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
    },
  },
  ig: {
    nav: {
      home: "Mbido",
      services: "Ọrụ Anyị",
      academy: "Ụlọ Akwụkwọ",
      projects: "Ihe Anyị Mere",
      blog: "Blọọgụ",
      contact: "Kpọtụrụ Anyị",
      joinFree: "Soro Klas Efere",
    },
    hero: {
      title: "Mụta Ihe Ndị Gbasara Kọmputa n'Asụsụ Gị.",
      subtitle: "Inye ndị ntorobịa ike site n'ịkụziri ha teknụzụ n'asụsụ nne ha — n'asụsụ Igbo, Hausa, Yoruba, na Pidgin.",
      ctaStart: "Malite Ịmụ Ihe Efere",
      ctaHire: "Were Ọrụ Anyị",
    },
    // ... other sections would follow similar pattern
  },
  ha: {
    nav: {
      home: "Gida",
      services: "Ayyukanmu",
      academy: "Makarantar",
      projects: "Ayyukanmu",
      blog: "Blog",
      contact: "Tuntube Mu",
      joinFree: "Shiga Ajin Kyauta",
    },
    hero: {
      title: "Koyi Yin Lambar Kwakwalwa Da Yarenka.",
      subtitle: "Ba matasa damar gina sana'o'in duniya ba tare da shingen harshe ba — a cikin harshen Igbo, Hausa, Yoruba, da Pidgin.",
      ctaStart: "Fara Koyo Kyauta",
      ctaHire: "Hayar Ayyukanmu",
    },
  },
  yo: {
    nav: {
      home: "Ile",
      services: "Awọn Iṣẹ Wa",
      academy: "Ile-ẹkọ",
      projects: "Awọn Iṣẹ",
      blog: "Bulọọgi",
      contact: "Kan si Wa",
      joinFree: "Darapọ mọ Kilasi Ọfẹ",
    },
    hero: {
      title: "Kọ ẹkọ koodu ni ede rẹ. Kọ ọjọ iwaju.",
      subtitle: "Fifi agbara fun awọn ọdọ lati kọ awọn iṣẹ agbaye laisi awọn idena ede — ni Igbo, Hausa, Yoruba, ati Pidgin.",
      ctaStart: "Bẹrẹ Ẹkọ Ọfẹ",
      ctaHire: "Gba Awọn Iṣẹ Wa",
    },
  },
  pcm: {
    nav: {
      home: "Home",
      services: "Our Work",
      academy: "Academy",
      projects: "Project Dem",
      blog: "Blog",
      contact: "Talk to Us",
      joinFree: "Join Free Class",
    },
    hero: {
      title: "Learn Code for your own Language. Build the Future.",
      subtitle: "Empower youths to build global careers without language wahala — for Igbo, Hausa, Yoruba, and Pidgin.",
      ctaStart: "Start Learning for Free",
      ctaHire: "Hire Us",
    },
  },
};

export type TranslationType = typeof translations.en;
