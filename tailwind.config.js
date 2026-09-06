import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      colors: {
        primary: "#49E68A",
        secondary: "#A29529",
        "primary-bg": "#F7FCEB",
        "lisah-green": "#109D3F",
        "dark-blue": "#010D50",
        "light-green": "#26FF72A6",
        "light-lisah-green": "#88B70233",
        "feature-grey": "#0329125E",
        "feature-green": "#055A124A",
        "feature-brown": "#1D0F0F1A",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
