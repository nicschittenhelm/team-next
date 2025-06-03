/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: [
          "var(--font-lexend)",
          "Lexend",
          "Arial",
          "Helvetica",
          "sans-serif",
        ],
        inter: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
        "share-tech-mono": [
          "var(--font-share-tech-mono)",
          "Share Tech Mono",
          "Fira Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  plugins: [],
};
