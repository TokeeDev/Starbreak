'use client'

import { HeroSection } from "@/components/blocks/hero-section";
import { Services } from "@/components/blocks/services";
import { Demo } from "@/components/demo";
import { Cta } from "@/components/blocks/cta";
export default function Home() {
  return (
    <div>
      <HeroSection />
        <Services />
        <Demo />
        <Cta />
    </div>
  );
}
