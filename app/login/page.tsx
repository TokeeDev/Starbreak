'use client';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabaseClient';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                router.push('/admin');
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-neutral-800/50 border border-neutral-700 rounded-xl">
                <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h1>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    providers={['github']} // Example provider, can be customized
                    socialLayout="horizontal"
                />
            </div>
        </div>
    );
} 