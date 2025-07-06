'use client';

import React, { useEffect, useState } from 'react';
import { Square } from 'lucide-react';
import FlowingMenu from '../react-bits/FlowingMenu';
import { supabase } from '@/lib/supabaseClient';

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
    // For FlowingMenu
    text: string;
    image: string;
    link: string;
}

interface WorkProps {
    onProjectSelect: (project: Project) => void;
}

export const Work: React.FC<WorkProps> = ({ onProjectSelect }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('projects')
                .select(`
                    *,
                    project_images (
                        image_url,
                        alt_text,
                        ratio
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching projects:", error);
                setProjects([]);
            } else {
                const formattedProjects = data.map(p => ({
                    id: p.id,
                    title: p.title,
                    status: p.status,
                    about: p.about,
                    scope: p.scope,
                    meta: {
                        cost: p.cost,
                        year: p.year,
                    },
                    images: p.project_images.map((img: { image_url: string; alt_text: string; ratio: number; }) => ({
                        src: img.image_url,
                        alt: img.alt_text,
                        ratio: img.ratio,
                    })),
                    // Data for the FlowingMenu
                    text: p.title,
                    image: p.project_images[0]?.image_url || '/fallback-image.png',
                    link: `#`,
                }));
                setProjects(formattedProjects);
            }
            setIsLoading(false);
        };

        fetchProjects();
    }, []);

    return (
        <section 
            id="work" 
            className="bg-black text-white py-12 lg:py-16 relative overflow-hidden"
        >
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-contain bg-center opacity-10"
                style={{ backgroundImage: "url('/world-map-dots.png')" }}
            ></div>

            {/* Main Content */}
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="flex items-baseline gap-6 font-mono">
                    <span className="text-6xl lg:text-8xl font-bold text-[#AD6331]">03</span>
                    <span className="text-5xl lg:text-7xl font-bold tracking-wider">WORK*</span>
                    <span className="text-2xl lg:text-3xl text-neutral-400 font-light hidden sm:inline">工作</span>
                  </h2>
                  <div className="text-[#AD6331] border border-[#AD6331] p-2 hidden md:block">
                    <Square size={32} strokeWidth={1} />
                  </div>
                </div>

                {/* Dotted Separator */}
                <div className="w-full border-b border-dashed border-neutral-600 mb-8"></div>
            </div>
            
            {/* FlowingMenu taking full width */}
            <div className="flex-grow h-[60vh]">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <p>Loading projects...</p>
                    </div>
                ) : (
                    <FlowingMenu items={projects} onItemClick={onProjectSelect} />
                )}
            </div>
        </section>
    );
};
