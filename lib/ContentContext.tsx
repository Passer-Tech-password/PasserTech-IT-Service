"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";
import { 
  collection, 
  onSnapshot, 
  doc, 
  getDoc,
  DocumentData 
} from "firebase/firestore";
import { SupportedLanguage } from "./translations";

interface SiteContent {
  hero: {
    title: Record<SupportedLanguage, string>;
    subtitle: Record<SupportedLanguage, string>;
    imageUrl: string;
  };
  services: any[];
  courses: any[];
  projects: any[];
  testimonials: any[];
}

interface ContentContextType {
  content: SiteContent | null;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: null,
  loading: true,
});

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collections = ["courses", "services", "projects", "testimonials"];
    const siteData: any = {
      hero: {
        title: {
          en: "Learn Coding in Your Tongue. Build the Future.",
          ig: "Mụta Ihe Ndị Gbasara Kọmputa n'Asụsụ Gị.",
          ha: "Koyi Yin Lambar Kwakwalwa Da Yarenka.",
          yo: "Kọ ẹkọ koodu ni ede rẹ. Kọ ọjọ iwaju.",
          pcm: "Learn Code for your own Language. Build the Future.",
        },
        subtitle: {
          en: "Empowering marginalized youths to build global careers without language barriers — in Igbo, Hausa, Yoruba, and Pidgin.",
          ig: "Inye ndị ntorobịa ike site n'ịkụziri ha teknụzụ n'asụsụ nne ha — n'asụsụ Igbo, Hausa, Yoruba, na Pidgin.",
          ha: "Ba matasa damar gina sana'o'in duniya ba tare da shingen harshe ba — a cikin harshen Igbo, Hausa, Yoruba, da Pidgin.",
          yo: "Fifi agbara fun awọn ọdọ lati kọ awọn iṣẹ agbaye laisi awọn idena ede — ni Igbo, Hausa, Yoruba, ati Pidgin.",
          pcm: "Empower youths to build global careers without language wahala — for Igbo, Hausa, Yoruba, and Pidgin.",
        },
        imageUrl: "",
      }
    };

    // Listen to global site content
    const unsubHero = onSnapshot(doc(db, "siteContent", "hero"), (doc) => {
      if (doc.exists()) {
        siteData.hero = doc.data();
        setContent({ ...siteData });
      }
    });

    // Listen to collections
    const unsubscribers = collections.map((colName) => {
      return onSnapshot(collection(db, colName), (snapshot) => {
        siteData[colName] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setContent({ ...siteData });
      });
    });

    setLoading(false);

    return () => {
      unsubHero();
      unsubscribers.forEach(unsub => unsub());
    };
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
