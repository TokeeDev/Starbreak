'use client';

import React, { useEffect, useState } from 'react';
import { Square } from 'lucide-react';
import FlowingMenu from '../react-bits/FlowingMenu';


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
            
            // Real projects data
            const mockProjects: Project[] = [
                {
                    id: '1',
                    title: 'Kytelink',
                    status: 'Completed',
                    about: 'Kytelink is a free, open-source link-in-bio platform designed for simplicity and speed. Users can quickly create personalized pages to showcase their links, track analytics, and use custom domains—all features that are paywalled elsewhere. Built for ease of use and fast performance, Kytelink has grown to serve over 10,000 users across 20+ countries.',
                    scope: ['Web Development', 'UI/UX Design', 'Database Architecture', 'Analytics Implementation', 'Custom Domain Integration'],
                    meta: {
                        cost: '$25,000',
                        year: '2024'
                    },
                    images: [
                        {
                            src: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7DcF2StEojfE65u4ULtZG20gO7STvNxqachkHnI',
                            alt: 'Kytelink - Hero Section',
                            ratio: 16/9
                        },
                        {
                            src: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7Dcb4aAts5FgwX4VR5cpQzLxlkfWNdthsHS0ajv',
                            alt: 'Kytelink - Call to Action',
                            ratio: 16/9
                        },
                        {
                            src: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7DcmMBnOt76uENijJ2ZFBA3RQkHeg9SW5TD41I0',
                            alt: 'Kytelink - Platform Overview',
                            ratio: 16/9
                        }
                    ],
                    text: 'Kytelink',
                    image: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7DcF2StEojfE65u4ULtZG20gO7STvNxqachkHnI',
                    link: 'https://kytelink.com/'
                },
                {
                    id: '2',
                    title: 'VERBI.AI',
                    status: 'Completed',
                    about: 'VERBI.AI is an advanced AI-powered writing assistant designed to help users write better, faster, and smarter. The platform transforms your thoughts into polished, professional text with intelligent suggestions for grammar, style, and tone. Whether you need grammar correction, content rephrasing, or SEO optimization, VERBI.AI offers a range of features to simplify and elevate your writing process.',
                    scope: ['AI Integration', 'Natural Language Processing', 'UI/UX Design', 'Real-time Analytics', 'SEO Optimization Tools'],
                    meta: {
                        cost: '$55,000',
                        year: '2024'
                    },
                    images: [
                        {
                            src: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7Dcd0z2V9IXgTeObRl1FwVax7u2LoA0ikpyGHCq',
                            alt: 'VERBI.AI - Hero Section',
                            ratio: 16/9
                        },
                        {
                            src: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7DcH0SBqN6ERrX9xOigJkNTm2AFQsUPcy4dDSle',
                            alt: 'VERBI.AI - Analytics Charts',
                            ratio: 16/9
                        },
                        {
                            src: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7DcGTgVh6Osk7DcoqVuNKeUPh2mS3vpQZIiyMfW',
                            alt: 'VERBI.AI - Call to Action',
                            ratio: 16/9
                        },
                        {
                            src: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7Dcd8uMjVIXgTeObRl1FwVax7u2LoA0ikpyGHCq',
                            alt: 'VERBI.AI - FAQ Section',
                            ratio: 16/9
                        }
                    ],
                    text: 'VERBI.AI',
                    image: 'https://z1yerx063o.ufs.sh/f/GN4ttTOsk7Dcd0z2V9IXgTeObRl1FwVax7u2LoA0ikpyGHCq',
                    link: 'https://verbi.ai'
                }
            ];

            // Simulate loading time
            setTimeout(() => {
                setProjects(mockProjects);
                setIsLoading(false);
            }, 500);
        };

        fetchProjects();
    }, []);

    return (
        <section 
            id="work" 
            className="bg-black text-white py-12 lg:py-16 relative overflow-hidden"
        >
        
           

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
            <div className="flex-grow h-[40vh] sm:h-[50vh] lg:h-[60vh]">
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
