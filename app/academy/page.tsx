import { Metadata } from "next";
import AcademyClient from "./AcademyClient";

export const metadata: Metadata = {
  title: "Academy",
  description: "Browse our courses in Igbo, Hausa, Yoruba, and Pidgin. Master software engineering without language barriers.",
  openGraph: {
    title: "Mother Tongue Tech Academy | PasserTech",
    description: "Learn HTML, CSS, Python and more in your native language.",
  },
};

const AcademyPage = () => {
  return <AcademyClient />;
};

export default AcademyPage;
