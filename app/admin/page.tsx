'use client';

import { useState, useEffect } from 'react';
import ProjectForm from '@/components/admin/project-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, LogOut } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  status: string;
  about: string;
  scope: string[];
  cost: string;
  year: string;
  project_images: { image_url: string }[];
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'list' | 'form'>('list');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement authentication check
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setIsLoading(true);
    // TODO: Implement project fetching logic
    setProjects([]);
    setIsLoading(false);
  };

  const handleAddNew = () => {
    setSelectedProject(null);
    setView('form');
  };
  
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setView('form');
  }

  const handleDelete = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.details || 'Failed to delete project');
            }

            // Remove the project from the local state to update the UI
            setProjects(prev => prev.filter(p => p.id !== projectId));
            alert('Project deleted successfully.');

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            alert(`Error: ${errorMessage}`);
        }
    }
  }

  const handleFormSuccess = () => {
    setView('list');
  }

  const handleSignOut = () => {
    // TODO: Implement sign out logic
    router.push('/login');
  }


  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-neutral-400 mt-2">Welcome, Admin</p>
          </div>
          <div className="flex items-center gap-4">
              {view === 'list' && (
                 <button onClick={handleAddNew} className="flex items-center gap-2 bg-[#F4A261] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#AD6331] transition-colors">
                    <Plus size={20}/>
                    <span>Add New Project</span>
                 </button>
              )}
               <button onClick={handleSignOut} className="flex items-center gap-2 bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-neutral-600 transition-colors">
                    <LogOut size={20}/>
                    <span>Sign Out</span>
               </button>
          </div>
        </header>

        <main>
          {view === 'list' ? (
            <div className="space-y-4">
              {isLoading ? <p>Loading projects...</p> : projects.map(project => (
                <div key={project.id} className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-neutral-900 rounded-md overflow-hidden">
                          {project.project_images?.[0]?.image_url && (
                              <Image src={project.project_images[0].image_url} alt={project.title} width={64} height={64} className="object-cover w-full h-full" />
                          )}
                      </div>
                      <h2 className="text-lg font-semibold">{project.title}</h2>
                  </div>
                  <div className="flex items-center gap-4">
                      <button onClick={() => handleEdit(project)} className="text-neutral-400 hover:text-white transition-colors"><Edit size={20}/></button>
                      <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-400 transition-colors"><Trash2 size={20}/></button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6 sm:p-8">
                <ProjectForm onSuccess={handleFormSuccess} projectToEdit={selectedProject} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 