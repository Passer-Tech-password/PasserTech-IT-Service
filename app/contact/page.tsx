import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with PasserTech IT Service for software development projects or academy enrollments.",
};

const ContactPage = () => {
  return <ContactClient />;
};

export default ContactPage;
