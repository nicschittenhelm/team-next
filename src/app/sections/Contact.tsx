"use client";

export const sectionMeta = {
  id: "contact",
  title: "Contact",
};

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
      <h2 className="section-title text-4xl md:text-5xl font-bold mb-12 text-center">
        Contact Us
      </h2>

      <div className="w-full max-w-6xl text-center">
        <p className="text-lg text-gray-300 mb-8">
          Get in touch with us! Contact information coming soon.
        </p>
      </div>
    </div>
  );
}
