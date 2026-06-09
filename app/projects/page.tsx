import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our recent projects in mobile app development, e-commerce, and community portals across Nigeria.",
};

const ProjectsPage = () => {
  return <ProjectsClient />;
};

export default ProjectsPage;
