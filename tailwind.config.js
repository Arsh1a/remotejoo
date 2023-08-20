/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      yekan: ["var(--font-yekan)"],
    },
    extend: {
      screens: {
        xxl: "1536px",
      },
      borderRadius: {
        primary: "1.2rem",
        secondary: "0.75rem",
      },
      colors: {
        black: "#394A50",
        primary: "#559C84",
        secondary: {
          DEFAULT: "#d16636",
          dark: "#394A50",
        },
      },
      fontFamily: {
        sans: ["var(--font-yekan)"],
      },
      backgroundImage: {
        basic:
          "linear-gradient(180deg, rgba(99,184,144,1) 0%, rgba(74,139,108,1) 100%)",
        "black-gradient":
          "linear-gradient(180deg, rgba(115,115,115,1) 0%, rgba(0,0,0,1) 100%)",
        main: "linear-gradient(52deg, rgba(99,184,144,1) 0%, rgba(74,139,108,1) 100%)",
        "main-orange":
          "linear-gradient(194deg, rgba(99,184,144,1) 33%, rgba(254,126,71,1) 100%)",
        cta: "linear-gradient(30deg, rgba(0,0,0,1) 0%, rgba(72,76,124,1) 64%, rgba(123,97,155,1) 81%)",
        "red-gradient":
          "linear-gradient(180deg, rgba(255,0,0,1) 0%, rgba(204,0,0,1) 100%)",
      },
      boxShadow: {
        main: "0 16px 24px rgba(0, 0, 0, .02)",
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
    },
  },
};
