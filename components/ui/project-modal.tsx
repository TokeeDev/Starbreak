import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  ratio?: number;
}

interface Project {
  title: string;
  status: "In progress" | "Completed";
  about: string;
  scope: string[];
  meta: {
    cost: string;
    year: string;
  };
  images: ImageProps[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: modalRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black/80 backdrop-blur-2xl border border-neutral-700 text-white w-full h-full md:max-h-[90vh] md:max-w-5xl rounded-2xl shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
          >
            <motion.div className="sticky top-0 h-1 bg-[#F4A261] origin-left z-20" style={{ scaleX }} />
            <div className="flex-shrink-0 p-4 flex justify-end">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm rounded-full py-2 px-4 bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Close project details"
              >
                <ArrowLeft size={16} />
                <span>Close</span>
              </button>
            </div>
            <div ref={modalRef} className="flex-1 overflow-y-auto no-scrollbar">
              <div className="p-8 md:p-12 pt-0">
                  {/* Header */}
                  <div className="text-left mb-12">
                      <h1 id="project-title" className="text-4xl md:text-6xl font-bold mb-2 text-white">{project.title}</h1>
                      <span className="font-semibold text-[#F4A261]">{project.status}</span>
                  </div>
                  
                  {/* Details Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                      <div className="md:col-span-2">
                          <h2 className="text-2xl font-bold mb-4 text-white">About the Project</h2>
                          <p className="text-neutral-300 leading-relaxed">{project.about}</p>
                      </div>
                      <div className="flex flex-col gap-6">
                          <div>
                              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Project Scope</h3>
                              <p className="text-neutral-300">{project.scope.join(', ')}</p>
                          </div>
                          <div>
                              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Year</h3>
                              <p className="font-semibold text-white">{project.meta.year}</p>
                          </div>
                      </div>
                  </div>

                  {/* Image Gallery */}
                  {project.images && project.images.length > 0 && (
                      <div>
                          <h2 className="text-2xl font-bold mb-8 text-white text-center">Gallery</h2>
                          <div className="flex flex-col gap-6">
                              {project.images.map((image, imgIndex) => (
                                  <div key={imgIndex} className="w-full">
                                      <div className="bg-neutral-900 rounded-2xl overflow-hidden">
                                          <Image 
                                              src={image.src} 
                                              alt={image.alt} 
                                              width={1200} 
                                              height={800}
                                              className="w-full h-auto object-contain transition-transform hover:scale-[1.02] duration-300"
                                              style={{ maxHeight: '600px' }}
                                          />
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 