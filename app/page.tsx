'use client'

import { useState } from 'react';

import { HeroSection } from "@/components/blocks/hero-section";
import About from "@/components/blocks/about";
import { Services } from "@/components/blocks/services";
import { Work } from "@/components/blocks/work";
import CTASection from "@/components/blocks/cta-section";
import ProjectModal from '@/components/ui/project-modal';

interface Project {
  id: string;
  title: string;
  status: "In progress" | "Completed";
  about: string;
  scope: string[];
  meta: {
    cost: string;
    year: string;
  };
  images: {
    src: string;
    alt: string;
    ratio?: number;
  }[];
  text: string;
  image: string;
  link: string;
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div>
      <HeroSection />
      <About />
      <Services />
      <Work onProjectSelect={openModal}/>
      <CTASection />
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
      
    </div>
  );
}
