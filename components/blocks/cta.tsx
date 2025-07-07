"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';

export const Cta = () => {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                "styles": {
                    "branding": {
                        "brandColor": "#000000"
                    }
                },
                "hideEventTypeDetails": false,
                "layout": "month_view"
            });
        })();
    }, []);
    return (
        <div className='bg-black text-white min-h-[50vh] flex flex-col items-center justify-center text-center'>
            <h2 className='text-4xl md:text-6xl font-bold mb-4'>Ready to Start a Project?</h2>
            <p className='text-xl md:text-2xl mb-8'>Let&apos;s build something great together.</p>
            <Button size='lg'>Contact Us</Button>
        </div>
    );
}
