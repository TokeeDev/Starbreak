import { IconBrandInstagram, IconBrandTelegram } from '@tabler/icons-react';

export function Contact() {
  return (
    <section id="contact" className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Contact</h2>
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-16">
          {/* ... existing code ... */}
        </div>

        {/* Contact Details */}
        <div className="text-center md:text-left">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">Tovi</h3>
          <p className="text-neutral-400 mb-8">Founder & Lead Developer</p>
          <div className="flex items-center justify-center md:justify-start space-x-4">
            <a href="#" className="text-white hover:text-blue-500 transition-colors">
              {/* ... existing code ... */}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
