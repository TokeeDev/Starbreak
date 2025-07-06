'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

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

interface FileWithPreview extends File {
    preview: string;
    ratio?: number;
}

interface ImageRecord {
    id?: string;
    image_url: string;
    alt_text?: string;
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
    const [files, setFiles] = useState<FileWithPreview[]>([]);
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
            setFiles([]);
            setImagesToDelete([]);
        }
    }, [projectToEdit, isEditMode]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFilesArray = Array.from(e.target.files);
            
            newFilesArray.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const fileWithPreview: FileWithPreview = Object.assign(file, {
                            preview: img.src,
                            ratio: img.width / img.height
                        });
                        setFiles(prev => [...prev, fileWithPreview]);
                    };
                    img.src = e.target?.result as string;
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleDeleteExistingImage = (imageId: string) => {
        setImagesToDelete(prev => [...prev, imageId]);
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isEditMode && files.length === 0) {
            setMessage("Please upload at least one image for a new project.");
            return;
        }
        setIsLoading(true);
        setMessage('');

        const submissionData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            submissionData.append(key, value);
        });

        // Append new files
        files.forEach(file => {
            submissionData.append('newFiles', file);
            if (file.ratio) {
                submissionData.append('ratios', file.ratio.toString());
            }
        });

        // Append IDs of images to delete
        if (isEditMode) {
            submissionData.append('imagesToDelete', JSON.stringify(imagesToDelete));
        }

        try {
            if (isEditMode && !projectToEdit?.id) {
                throw new Error("Project ID is missing for edit.");
            }
            const endpoint = isEditMode ? `/api/projects/${projectToEdit!.id}` : '/api/projects';
            const method = isEditMode ? 'PUT' : 'POST';

            const response = await fetch(endpoint, {
                method: method,
                body: submissionData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.details || 'Something went wrong');
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
                                <img src={image.image_url} alt={image.alt_text || 'existing image'} className="rounded-lg object-cover w-full h-full" />
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
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-700 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-neutral-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <div className="flex text-sm text-neutral-400">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-neutral-900 rounded-md font-medium text-[#F4A261] hover:text-[#AD6331] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900 focus-within:ring-[#F4A261]">
                                <span>Upload files</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
            </div>
            
            {files.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-neutral-300 mb-2">Image Previews</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {files.map((file, index) => (
                            <div key={index} className="relative">
                                <img src={file.preview} alt={`Preview ${index}`} className="rounded-lg object-cover w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

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