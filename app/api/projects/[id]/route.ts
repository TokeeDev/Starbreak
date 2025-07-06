import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const projectId = params.id;

    if (!projectId) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    try {
        // 1. Get all image paths for the project from the project_images table
        const { data: images, error: imagesError } = await supabaseAdmin
            .from('project_images')
            .select('image_url')
            .eq('project_id', projectId);

        if (imagesError) {
            console.error("Error fetching project images:", imagesError);
            throw new Error(imagesError.message);
        }

        // 2. Delete images from Supabase Storage
        if (images && images.length > 0) {
            // Extract the file path from the full URL
            const filePaths = images.map(img => {
                const url = new URL(img.image_url);
                // The path starts after the bucket name, e.g., 'project-images/public/...'
                // We need the part after '/public'
                const pathParts = url.pathname.split('/');
                return pathParts.slice(pathParts.indexOf('public') + 1).join('/');
            });

            const { error: storageError } = await supabaseAdmin.storage
                .from('project-images')
                .remove(filePaths);

            if (storageError) {
                console.error("Error deleting from storage:", storageError);
                // Don't block deletion from DB if storage fails, but log it.
            }
        }

        // 3. Delete the project from the database
        // RLS is enabled, so this will only work if you set up appropriate policies
        // for authenticated admin users. For now, we assume service_role key is used.
        const { error: dbError } = await supabaseAdmin
            .from('projects')
            .delete()
            .eq('id', projectId);

        if (dbError) {
            console.error("Error deleting project from database:", dbError);
            throw new Error(dbError.message);
        }

        return NextResponse.json({ message: "Project deleted successfully" });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: "Failed to delete project", details: errorMessage }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const projectId = params.id;
    if (!projectId) {
        return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    try {
        const formData = await request.formData();
        
        // --- Handle Text Fields Update ---
        const title = formData.get('title') as string;
        const status = formData.get('status') as string;
        const about = formData.get('about') as string;
        const scope = (formData.get('scope') as string).split(',').map(s => s.trim());
        const cost = formData.get('cost') as string;
        const year = formData.get('year') as string;

        const { data: updatedProjectData, error: updateError } = await supabaseAdmin
            .from('projects')
            .update({ title, status, about, scope, cost, year })
            .eq('id', projectId)
            .select()
            .single();

        if (updateError) throw new Error(updateError.message);

        // --- Handle Image Deletion ---
        const imagesToDelete = JSON.parse(formData.get('imagesToDelete') as string || '[]');
        if (imagesToDelete.length > 0) {
            // In a real app, you'd also delete from storage here
            const { error: deleteImagesError } = await supabaseAdmin
                .from('project_images')
                .delete()
                .in('id', imagesToDelete);
            if (deleteImagesError) console.error("Error deleting images:", deleteImagesError.message);
        }

        // --- Handle New Image Uploads ---
        const newFiles = formData.getAll('newFiles') as File[];
        const newRatios = formData.getAll('ratios') as string[];
        
        for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i];
            const ratio = newRatios[i];
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
            const fileName = `${projectId}/${Date.now()}_${sanitizedFileName}`;

            await supabaseAdmin.storage.from('project-images').upload(fileName, file);
            const { data: { publicUrl } } = supabaseAdmin.storage.from('project-images').getPublicUrl(fileName);

            await supabaseAdmin.from('project_images').insert({
                project_id: projectId,
                image_url: publicUrl,
                alt_text: file.name,
                ratio: parseFloat(ratio) || 1,
            });
        }
        
        return NextResponse.json({ message: "Project updated successfully", project: updatedProjectData });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: "Failed to update project", details: errorMessage }, { status: 500 });
    }
} 