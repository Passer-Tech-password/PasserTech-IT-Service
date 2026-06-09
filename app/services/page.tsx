import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Professional IT services in Nigeria. Software development, Cloud engineering, and IT support tailored for global impact.",
};

const ServicesPage = () => {
  return <ServicesClient />;
};

export default ServicesPage;
