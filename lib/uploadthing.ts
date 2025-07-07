import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const f = createUploadthing();

export const ourFileRouter = {
  projectImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async ({ req }) => {
      try {
        // Check if user is authenticated
        const cookieStore = await cookies();
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              get(name: string) {
                return cookieStore.get(name)?.value;
              },
              set(name: string, value: string, options: any) {
                cookieStore.set({ name, value, ...options });
              },
              remove(name: string, options: any) {
                cookieStore.set({ name, value: '', ...options });
              },
            },
          }
        );

        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Supabase auth error:", error);
          throw new Error("Authentication failed");
        }
        
        if (!session) {
          throw new Error("You must be logged in to upload files");
        }

        return { userId: session.user.id };
      } catch (error) {
        console.error("Middleware error:", error);
        throw new Error(`Upload not authorized: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; 