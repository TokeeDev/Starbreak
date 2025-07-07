'use client';

import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing";
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface UploadedFile {
  url: string;
  alt: string;
  ratio: number;
}

interface UploadthingUploaderProps {
  onUploadComplete: (files: UploadedFile[]) => void;
  onUploadError: (error: Error) => void;
  maxFiles?: number;
}

export function UploadthingUploader({ 
  onUploadComplete, 
  onUploadError,
  maxFiles = 10 
}: UploadthingUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadComplete = (files: any[]) => {
    setIsUploading(false);
    const processedFiles = files.map(file => {
      // Create an image to calculate ratio
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height;
        const updatedFile = {
          url: file.url,
          alt: file.name || 'Project image',
          ratio: ratio
        };
        
        setUploadedFiles(prev => {
          const newFiles = [...prev, updatedFile];
          onUploadComplete(newFiles);
          return newFiles;
        });
      };
      img.src = file.url;
      
      return {
        url: file.url,
        alt: file.name || 'Project image',
        ratio: 1.0 // Default ratio until image loads
      };
    });
    
    setUploadedFiles(prev => [...prev, ...processedFiles]);
  };

  const handleUploadError = (error: Error) => {
    setIsUploading(false);
    onUploadError(error);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index);
      onUploadComplete(newFiles);
      return newFiles;
    });
  };

  return (
    <div className="space-y-4">
      <UploadDropzone<OurFileRouter, "projectImageUploader">
        endpoint="projectImageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
        onUploadBegin={() => setIsUploading(true)}
        appearance={{
          container: "border-2 border-dashed border-neutral-700 bg-neutral-900 rounded-lg",
          uploadIcon: "text-neutral-500",
          label: "text-neutral-300",
          allowedContent: "text-neutral-500",
          button: "bg-[#F4A261] hover:bg-[#AD6331] text-white font-semibold py-2 px-4 rounded-lg transition-colors",
        }}
        config={{
          mode: "auto",
        }}
      />
      
      {isUploading && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F4A261]"></div>
          <span className="ml-2 text-neutral-300">Uploading...</span>
        </div>
      )}
      
      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-2">Uploaded Images</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <img 
                  src={file.url} 
                  alt={file.alt} 
                  className="rounded-lg object-cover w-full h-32" 
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 