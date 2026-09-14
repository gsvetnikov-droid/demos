import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Warm cream accent for the public site — background, borders,
        // pills/tags, section dividers. Kept separate from `brand` (still
        // used by the admin tool) so re-theming one never touches the other.
        cream: {
          50: "#fdfbf6",
          100: "#f8f1e2",
          200: "#f0e2c2",
          300: "#e4cd97",
          400: "#d6b56d",
          500: "#c39c4d",
          600: "#a37f3c",
          700: "#816432",
          800: "#69512c",
          900: "#584427",
        },
        brand: {
          50: "#eef3ff",
          100: "#dfe8ff",
          200: "#c2d3ff",
          300: "#9ab3ff",
          400: "#6d8cfb",
          500: "#4667f0",
          600: "#3049dd",
          700: "#2638b3",
          800: "#22318f",
          900: "#1f2c72",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [typography],
};
export default config;
