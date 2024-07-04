/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  variants: {
    extend: {
      animation: ["hover"], // Enable hover variants for animations
    },
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        bg_primary: "#d8dbdc",
        "chat-bakground": "#efeae2",
        "self-message-background": "#d9fdd3",
        header: "#00a884",
        bg_secondary: "#f0f2f5",
        icon: "#54656f",
        green_legend: "#25d366",
        white: "#ffffff",
        active: "#d9dbde",
        hover: "#202c33",
        badge_bg: "#e7fce3",
        badge_text: "#3b9f88",
        card_hover: "#f0f2f5",
        "form-primary": "rgb(38 187 94)",
        "form-secondary": "rgb(7 183 73)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "rotate-right": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        "rotate-left": {
          "0%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "drawer-right": {
          "0%": { width: "0px" },
          "100%": { width: "100%" },
        },
        "drawer-right-close": {
          "100%": { width: "0px" },
        },
        "progress-loading": {
          "0%": { left: "0%" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rotate-left": "rotate-left 0.1s forwards",
        "rotate-right": "rotate-right 0.1s forwards",
        "drawer-right": "drawer-right 0.2s ease-out forwards",
        "drawer-right-close": "drawer-right-close 0.2s ease-out forwards",
        "progress-loading": "progress-loading 1.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
};
