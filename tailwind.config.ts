import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#05005c",
        secondary:"#4f4d65",
        secondaryDark:"#2a2938"
      },
      brightness: {
        25: ".25",
      }
    },
  },
  plugins: [],
} satisfies Config;
