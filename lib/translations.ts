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
      about: "About Us",
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
    about: {
      title: "About PasserTech",
      summary: "PasserTech IT Service is a pioneering technology company dedicated to bridging the digital divide in Africa. We specialize in providing high-quality IT services and technical education in local languages, ensuring that language is never a barrier to global tech opportunities.",
      vision: "To be the leading catalyst for digital inclusion in Africa, where every youth, regardless of their native tongue, can master technology and compete on a global stage.",
      mission: "To empower marginalized African youths through accessible, localized tech education and to deliver innovative IT solutions that drive local and global impact.",
      objectives: [
        "Provide tech education in Igbo, Hausa, Yoruba, and Pidgin.",
        "Deliver world-class software development and IT support services.",
        "Bridge the employment gap for marginalized youths in the tech industry.",
        "Foster a community of localized tech innovators across Africa."
      ],
      values: {
        title: "Our Core Values",
        items: [
          { title: "Inclusion", desc: "Breaking barriers for everyone." },
          { title: "Innovation", desc: "Localized solutions for global problems." },
          { title: "Excellence", desc: "World-class standards in every tongue." }
        ]
      }
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
      communityTitle: "Choose Your Community",
      communitySubtitle: "Join a community to start your learning journey.",
      communities: {
        igbo: "Igbo Community",
        hausa: "Hausa Community",
        yoruba: "Yoruba Community",
        english: "English Community",
        pidgin: "Pidgin Community",
      },
      joinCommunity: "Join Community",
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
      about: "Gbasara Anyị",
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
    about: {
      title: "Gbasara PasserTech",
      summary: "PasserTech IT Service bụ ụlọ ọrụ teknụzụ na-arụ ọrụ iji jikọta ọdịiche dijitalụ n'Africa. Anyị na-arụ ọrụ n'inye ọrụ IT dị elu na agụmakwụkwọ teknụzụ n'asụsụ obodo.",
      vision: "Ịbụ onye isi na-eme ka nsonye dijitalụ n'Africa, ebe onye ọ bụla ntorobịa nwere ike ịmụta teknụzụ n'asụsụ ha.",
      mission: "Inye ndị ntorobịa Africa ike site na agụmakwụkwọ teknụzụ n'asụsụ ha na ịnye ọrụ IT ọhụrụ.",
      objectives: [
        "Inye agụmakwụkwọ teknụzụ n'asụsụ Igbo, Hausa, Yoruba, na Pidgin.",
        "Ịnye ọrụ mmepe ngwanrọ na nkwado IT kachasị mma.",
        "Ijikọta oghere ọrụ maka ndị ntorobịa n'ime ụlọ ọrụ teknụzụ.",
        "Ịzụlite obodo nke ndị na-emepụta teknụzụ n'Africa."
      ],
      values: {
        title: "Ụkpụrụ Anyị",
        items: [
          { title: "Nsonye", desc: "Ịkwụsị ihe mgbochi maka onye ọ bụla." },
          { title: "Ihe Ọhụrụ", desc: "Ngwọta mpaghara maka nsogbu zuru ụwa ọnụ." },
          { title: "Ọmarịcha", desc: "Ụkpụrụ kachasị mma n'asụsụ ọ bụla." }
        ]
      }
    },
    services: {
      title: "Ọrụ Anyị",
      software: "Mmepe Ngwanrọ",
      cloud: "Cloud Engineering",
      itSupport: "Nkwado IT",
      customApps: "Ngwa Ahaziri Onwe",
    },
    academy: {
      title: "Ụlọ Akwụkwọ Nkà na Ụzụ",
      subtitle: "Mụta nkà na ụzụ n'asụsụ kachasị mma n'asụsụ nne gị.",
      communityTitle: "Họrọ Obodo Gị",
      communitySubtitle: "Soro otu obodo malite njem mmụta gị.",
      communities: {
        igbo: "Obodo Igbo",
        hausa: "Obodo Hausa",
        yoruba: "Obodo Yoruba",
        english: "Obodo Bekee",
        pidgin: "Obodo Pidgin",
      },
      joinCommunity: "Soro Obodo",
      courses: {
        html: "HTML na CSS",
        python: "Python",
        webDev: "Mmepe Weebụ",
        fullStack: "Full-Stack Mmepe",
      },
      enroll: "Debanye aha ugbu a",
    },
    contact: {
      title: "Kpọtụrụ Anyị",
      name: "Aha",
      email: "Email",
      message: "Ozi",
      send: "Ziga Ozi",
    },
  },
  ha: {
    nav: {
      home: "Gida",
      services: "Ayyukanmu",
      about: "Game da Mu",
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
    about: {
      title: "Game da PasserTech",
      summary: "PasserTech IT Service babban kamfani ne na fasaha wanda aka sadaukar domin dinke barakar dijital a Afirka. Mun kware wajen samar da ayyukan IT masu inganci da ilimin fasaha a cikin harsunan gida.",
      vision: "Don zama babban jagora ga hadewar dijital a Afirka, inda kowane matashi zai iya ƙwarewar fasaha da yarensu.",
      mission: "Don ba wa matasan Afirka damar samun ilimin fasaha a cikin harsunansu da kuma samar da sabbin hanyoyin IT.",
      objectives: [
        "Samar da ilimin fasaha a harsunan Igbo, Hausa, Yoruba, da Pidgin.",
        "Bayar da ingantaccen software da ayyukan tallafin IT.",
        "Dinke barakar samar da aikin yi ga matasa a fannin fasaha.",
        "Gina al'ummar masu samar da fasaha a Afirka."
      ],
      values: {
        title: "Muhimman Darajojinmu",
        items: [
          { title: "Inclusion", desc: "Breaking barriers for everyone." },
          { title: "Innovation", desc: "Localized solutions for global problems." },
          { title: "Excellence", desc: "World-class standards in every tongue." }
        ]
      }
    },
    services: {
      title: "Ayyukanmu",
      software: "Haɓaka Software",
      cloud: "Cloud Engineering",
      itSupport: "Taimakon IT",
      customApps: "Custom Apps",
    },
    academy: {
      title: "Makarantar Fasaha",
      subtitle: "Koyi fasahar zamani a cikin yaren da ka fi so.",
      communityTitle: "Zabi Al'ummarka",
      communitySubtitle: "Shiga al'umma don fara tafiyar koyo.",
      communities: {
        igbo: "Al'ummar Igbo",
        hausa: "Al'ummar Hausa",
        yoruba: "Al'ummar Yoruba",
        english: "Al'ummar Turanci",
        pidgin: "Al'ummar Pidgin",
      },
      joinCommunity: "Shiga Al'umma",
      courses: {
        html: "HTML & CSS",
        python: "Python",
        webDev: "Web Development",
        fullStack: "Full-Stack Development",
      },
      enroll: "Yi rajista yanzu",
    },
    contact: {
      title: "Tuntube Mu",
      name: "Suna",
      email: "Email",
      message: "Saƙo",
      send: "Aika Saƙo",
    },
  },
  yo: {
    nav: {
      home: "Ile",
      services: "Awọn Iṣẹ Wa",
      about: "Nipa Wa",
      academy: "Ile-ẹkọ",
      projects: "Awọn Iṣẹ",
      blog: "Bulọọgi",
      contact: "Kan si Wa",
      joinFree: "Darapọ mọ Kilasi Ọfẹ",
    },
    hero: {
      title: "Kọ ẹkọ koodu ni ede r rẹ. Kọ ọjọ iwaju.",
      subtitle: "Fifi agbara fun awọn ọdọ lati kọ awọn iṣẹ agbaye laisi awọn idena ede — ni Igbo, Hausa, Yoruba, ati Pidgin.",
      ctaStart: "Bẹrẹ Ẹkọ Ọfẹ",
      ctaHire: "Gba Awọn Iṣẹ Wa",
    },
    about: {
      title: "Nipa PasserTech",
      summary: "PasserTech IT Service jẹ ile-iṣẹ imọ-ẹrọ aṣáájú-ọnà ti a ṣe igbẹhin si didi pipin oni-nọmba ni Afirika. A ṣe amọja ni ipese awọn iṣẹ IT ti o ga ati ẹkọ imọ-ẹrọ ni awọn ede agbegbe.",
      vision: "Lati jẹ ayase asiwaju fun ifisi oni-nọmba ni Afirika, nibiti gbogbo ọdọ le gba imọ-ẹrọ ni ede abinibi wọn.",
      mission: "Lati fun awọn ọdọ Afirika ni agbara nipasẹ ẹkọ imọ-ẹrọ ni ede wọn ati lati fi awọn ojutu IT tuntun han.",
      objectives: [
        "Pese ẹkọ imọ-ẹrọ ni ede Igbo, Hausa, Yoruba, ati Pidgin.",
        "Fi sọfitiwia agbaye ati awọn iṣẹ atilẹyin IT han.",
        "Didi aafo iṣẹ fun awọn ọdọ ni ile-iṣẹ imọ-ẹrọ.",
        "Ṣe abojuto agbegbe ti awọn olupilẹṣẹ imọ-ẹrọ ni Afirika."
      ],
      values: {
        title: "Awọn Iye Pataki Wa",
        items: [
          { title: "Inclusion", desc: "Breaking barriers for everyone." },
          { title: "Innovation", desc: "Localized solutions for global problems." },
          { title: "Excellence", desc: "World-class standards in every tongue." }
        ]
      }
    },
    services: {
      title: "Awọn Iṣẹ Wa",
      software: "Idagbasoke Sọfitiwia",
      cloud: "Cloud Engineering",
      itSupport: "Atilẹyin IT",
      customApps: "Awọn Ohun elo Ti ara ẹni",
    },
    academy: {
      title: "Ile-ẹkọ Imọ-ẹrọ",
      subtitle: "Kọ ẹkọ imọ-ẹrọ ni ede abinibi rẹ.",
      communityTitle: "Yan Agbegbe Rẹ",
      communitySubtitle: "Darapọ mọ agbegbe kan lati bẹrẹ irin-ajo ẹkọ rẹ.",
      communities: {
        igbo: "Agbegbe Igbo",
        hausa: "Agbegbe Hausa",
        yoruba: "Agbegbe Yoruba",
        english: "Agbegbe Gẹẹsi",
        pidgin: "Agbegbe Pidgin",
      },
      joinCommunity: "Darapọ mọ Agbegbe",
      courses: {
        html: "HTML & CSS",
        python: "Python",
        webDev: "Idagbasoke Oju-iwe Ayelujara",
        fullStack: "Full-Stack Idagbasoke",
      },
      enroll: "Forukọsilẹ bayi",
    },
    contact: {
      title: "Kan si Wa",
      name: "Orukọ",
      email: "Email",
      message: "Ifiranṣẹ",
      send: "Fi Ifiranṣẹ Ranṣẹ",
    },
  },
  pcm: {
    nav: {
      home: "Home",
      services: "Our Work",
      about: "About Us",
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
    about: {
      title: "About PasserTech",
      summary: "PasserTech IT Service na technology company way dey help people for Africa. We sabi how to give better IT services and teach tech for our local languages.",
      vision: "To be the leader for digital inclusion for Africa, where every youth fit sabi tech for their own language.",
      mission: "To empower African youths with tech education for their language and give better IT solutions.",
      objectives: [
        "Give tech education for Igbo, Hausa, Yoruba, and Pidgin.",
        "Give world-class software development and IT support services.",
        "Help marginalized youths find work for tech industry.",
        "Build community of tech people for Africa."
      ],
      values: {
        title: "Our Core Values",
        items: [
          { title: "Inclusion", desc: "Breaking barriers for everyone." },
          { title: "Innovation", desc: "Localized solutions for global problems." },
          { title: "Excellence", desc: "World-class standards in every tongue." }
        ]
      }
    },
    services: {
      title: "Our Work",
      software: "Software Development",
      cloud: "Cloud Engineering",
      itSupport: "IT Support",
      customApps: "Custom Apps",
    },
    academy: {
      title: "Better Tech Academy",
      subtitle: "Learn tech for your own language way you like.",
      communityTitle: "Choose Your Community",
      communitySubtitle: "Join one community to start your learning journey.",
      communities: {
        igbo: "Igbo Community",
        hausa: "Hausa Community",
        yoruba: "Yoruba Community",
        english: "English Community",
        pidgin: "Pidgin Community",
      },
      joinCommunity: "Join Community",
      courses: {
        html: "HTML & CSS",
        python: "Python",
        webDev: "Web Development",
        fullStack: "Full-Stack Development",
      },
      enroll: "Register Now",
    },
    contact: {
      title: "Talk to Us",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
    },
  },
};

export type TranslationType = typeof translations.en;
