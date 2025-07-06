import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options })
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.set({ name, value: '', ...options })
            },
          },
        }
    )

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const status = formData.get('status') as string;
    const about = formData.get('about') as string;
    const scope = (formData.get('scope') as string).split(',').map(s => s.trim());
    const cost = formData.get('cost') as string;
    const year = formData.get('year') as string;
    const files = formData.getAll('files') as File[];
    const ratios = formData.getAll('ratios') as string[];

    // 1. Insert project data into the 'projects' table
    const { data: projectData, error: projectError } = await supabaseAdmin
        .from('projects')
        .insert({ title, status, about, scope, cost, year })
        .select()
        .single();

    if (projectError) {
        console.error("Error inserting project:", projectError);
        return NextResponse.json({ error: "Failed to create project.", details: projectError.message }, { status: 500 });
    }

    const projectId = projectData.id;

    // 2. Upload images and insert into 'project_images' table
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ratio = ratios[i];
        
        // Sanitize the filename to remove special characters and spaces
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
        const fileName = `${projectId}/${Date.now()}_${sanitizedFileName}`;
        
        const { error: uploadError } = await supabaseAdmin.storage
            .from('project-images')
            .upload(fileName, file);

        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            // If an upload fails, we should ideally roll back the project insertion
            await supabaseAdmin.from('projects').delete().eq('id', projectId);
            return NextResponse.json({ error: "Failed to upload image.", details: uploadError.message }, { status: 500 });
        }
        
        const { data: { publicUrl } } = supabaseAdmin.storage.from('project-images').getPublicUrl(fileName);

        const { error: imageError } = await supabaseAdmin
            .from('project_images')
            .insert({ 
                project_id: projectId, 
                image_url: publicUrl,
                alt_text: file.name,
                ratio: parseFloat(ratio) || 1, 
            });

        if (imageError) {
            console.error('Error inserting image metadata:', imageError);
            // Clean up uploaded file and project if DB insert fails
            await supabaseAdmin.storage.from('project-images').remove([fileName]);
            await supabaseAdmin.from('projects').delete().eq('id', projectId);
            return NextResponse.json({ error: "Failed to save image metadata.", details: imageError.message }, { status: 500 });
        }
    }

    return NextResponse.json({ message: "Project created successfully!", project: projectData });
} 