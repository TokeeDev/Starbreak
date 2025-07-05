"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function Cta() {
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
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
                <div className="text-center">
                    <h2 className="text-4xl font-bold">
                        Ready to get started?
                    </h2>
                    <p className="mt-4 text-lg">
                        Schedule a consultation to discuss your project.
                    </p>
                    <button
                        data-cal-link="your-cal-link"
                        className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-white"
                    >
                        Schedule a Consultation
                    </button>
                </div>
            </div>
        </section>
    );
}
