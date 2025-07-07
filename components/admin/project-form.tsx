'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { UploadthingUploader } from '@/components/ui/uploadthing-uploader';
import Image from 'next/image';

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
}

// Reusable Input component
const FormInput: React.FC<FormInputProps> = ({ id, label, type = 'text', value, onChange, placeholder, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#F4A261] focus:border-[#F4A261] transition-all"
        />
    </div>
);

interface FormTextareaProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
}

// Reusable Textarea component
const FormTextarea: React.FC<FormTextareaProps> = ({ id, label, value, onChange, placeholder, required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-neutral-300 mb-2">{label}</label>
        <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={4}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#F4A261] focus:border-[#F4A261] transition-all"
        />
    </div>
);

interface UploadedFile {
    url: string;
    alt: string;
    ratio: number;
}

interface ImageRecord {
    id?: string;
    image_url: string;
    alt_text?: string;
    ratio?: number;
}

interface ProjectData {
    id?: string;
    title: string;
    status: string;
    about: string;
    scope: string[] | string;
    cost: string;
    year: string;
    project_images?: ImageRecord[];
}

interface ProjectFormProps {
    onSuccess: () => void;
    projectToEdit: ProjectData | null;
}

export default function ProjectForm({ onSuccess, projectToEdit }: ProjectFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        status: 'In progress',
        about: '',
        scope: '',
        cost: '',
        year: '',
    });
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [existingImages, setExistingImages] = useState<ImageRecord[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const isEditMode = projectToEdit !== null;

    useEffect(() => {
        if (isEditMode && projectToEdit) {
            setFormData({
                title: projectToEdit.title,
                status: projectToEdit.status,
                about: projectToEdit.about,
                scope: Array.isArray(projectToEdit.scope) ? projectToEdit.scope.join(', ') : projectToEdit.scope,
                cost: projectToEdit.cost,
                year: projectToEdit.year,
            });
            setExistingImages(projectToEdit.project_images || []);
            setUploadedFiles([]);
            setImagesToDelete([]);
        }
    }, [projectToEdit, isEditMode]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUploadComplete = (files: UploadedFile[]) => {
        setUploadedFiles(files);
    };

    const handleUploadError = (error: Error) => {
        setMessage(`Upload error: ${error.message}`);
    };

    const handleDeleteExistingImage = (imageId: string) => {
        setImagesToDelete(prev => [...prev, imageId]);
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isEditMode && uploadedFiles.length === 0) {
            setMessage("Please upload at least one image for a new project.");
            return;
        }
        setIsLoading(true);
        setMessage('');

        const submissionData = {
            title: formData.title,
            status: formData.status,
            about: formData.about,
            scope: formData.scope,
            cost: formData.cost,
            year: formData.year,
            imageUrls: uploadedFiles,
            ...(isEditMode && { imagesToDelete })
        };

        try {
            if (isEditMode && !projectToEdit?.id) {
                throw new Error("Project ID is missing for edit.");
            }
            const endpoint = isEditMode ? `/api/projects/${projectToEdit!.id}` : '/api/projects';
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.details || result.error || 'Something went wrong');
            }

            const successMessage = isEditMode 
                ? `Success! Project "${result.project.title}" updated.`
                : `Success! Project "${result.project.title}" created.`;
            
            setMessage(successMessage);
            onSuccess(); // Return to the list view
        } catch (error) {
            if (error instanceof Error) {
                setMessage(`Error: ${error.message}`);
            } else {
                setMessage('An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Project' : 'Create New Project'}</h2>
            <FormInput id="title" label="Project Title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Starbreak Website" required />
            
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-neutral-300 mb-2">Status</label>
                <select 
                    id="status" 
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#F4A261] focus:border-[#F4A261] transition-all"
                >
                    <option>In progress</option>
                    <option>Completed</option>
                </select>
            </div>

            <FormTextarea id="about" label="About Project" value={formData.about} onChange={handleInputChange} placeholder="A detailed description of the project." required />
            <FormInput id="scope" label="Project Scope" value={formData.scope} onChange={handleInputChange} placeholder="e.g., Web Design, Development, SEO" required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput id="cost" label="Cost" value={formData.cost} onChange={handleInputChange} placeholder="$25,000" />
                <FormInput id="year" label="Year" type="number" value={formData.year} onChange={handleInputChange} placeholder="2024" required />
            </div>

            {isEditMode && existingImages.length > 0 && (
                 <div>
                    <h3 className="text-sm font-medium text-neutral-300 mb-2">Current Images</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {existingImages.map((image) => (
                            <div key={image.id} className="relative group">
                                <Image src={image.image_url} alt={image.alt_text || 'existing image'} className="rounded-lg object-cover w-full h-32" width={128} height={128} />
                                <button
                                    type="button"
                                    onClick={() => handleDeleteExistingImage(image.id!)}
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label="Delete image"
                                >
                                    <Trash2 size={14}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Project Images</label>
                <UploadthingUploader 
                    onUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                />
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#F4A261] hover:bg-[#AD6331] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-[#F4A261] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Add Project')}
                </button>
            </div>
             {message && <p className={`text-center text-sm mt-4 ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{message}</p>}
        </form>
    );
} 