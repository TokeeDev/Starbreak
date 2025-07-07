'use client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        // TODO: Implement authentication logic
        router.push('/admin');
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-neutral-800/50 border border-neutral-700 rounded-xl">
                <h1 className="text-2xl font-bold text-white text-center mb-6">Admin Login</h1>
                <button 
                    onClick={handleLogin}
                    className="w-full bg-[#F4A261] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#AD6331] transition-colors"
                >
                    Login
                </button>
            </div>
        </div>
    );
} 