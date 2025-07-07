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
            
            // Mock projects data
            const mockProjects: Project[] = [
                {
                    id: '1',
                    title: 'E-Commerce Platform',
                    status: 'Completed',
                    about: 'A modern e-commerce platform built with Next.js and React. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Optimized for performance and SEO with advanced filtering and search capabilities.',
                    scope: ['Web Design', 'Frontend Development', 'Backend Development', 'Database Design', 'Payment Integration'],
                    meta: {
                        cost: '$45,000',
                        year: '2024'
                    },
                    images: [
                        {
                            src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
                            alt: 'E-Commerce Platform - Homepage',
                            ratio: 1.33
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=800&fit=crop',
                            alt: 'E-Commerce Platform - Mobile View',
                            ratio: 0.75
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
                            alt: 'E-Commerce Platform - Dashboard',
                            ratio: 1.33
                        }
                    ],
                    text: 'E-Commerce Platform',
                    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
                    link: '#'
                },
                {
                    id: '2',
                    title: 'SaaS Dashboard',
                    status: 'In progress',
                    about: 'A comprehensive SaaS dashboard for data analytics and business intelligence. Built with React, TypeScript, and D3.js for interactive charts and visualizations. Includes real-time data updates, user management, and advanced reporting features.',
                    scope: ['UI/UX Design', 'React Development', 'Data Visualization', 'API Integration', 'Real-time Features'],
                    meta: {
                        cost: '$35,000',
                        year: '2024'
                    },
                    images: [
                        {
                            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
                            alt: 'SaaS Dashboard - Analytics View',
                            ratio: 1.33
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop',
                            alt: 'SaaS Dashboard - Mobile Analytics',
                            ratio: 0.75
                        }
                    ],
                    text: 'SaaS Dashboard',
                    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
                    link: '#'
                },
                {
                    id: '3',
                    title: 'Mobile Banking App',
                    status: 'Completed',
                    about: 'A secure mobile banking application with biometric authentication, transaction history, bill payments, and money transfers. Built with React Native for cross-platform compatibility and enhanced security features including end-to-end encryption.',
                    scope: ['Mobile App Development', 'UI/UX Design', 'Security Implementation', 'API Development', 'Testing'],
                    meta: {
                        cost: '$60,000',
                        year: '2023'
                    },
                    images: [
                        {
                            src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=800&fit=crop',
                            alt: 'Mobile Banking App - Login Screen',
                            ratio: 0.75
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=800&fit=crop',
                            alt: 'Mobile Banking App - Dashboard',
                            ratio: 0.75
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
                            alt: 'Mobile Banking App - Analytics',
                            ratio: 1.33
                        }
                    ],
                    text: 'Mobile Banking App',
                    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
                    link: '#'
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
