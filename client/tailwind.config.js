/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#F8FAFC",
        sidebar: "#0B1220",
        "sidebar-elevated": "#0F172A",
        "sidebar-hover": "#151F33",
        card: "#FFFFFF",
        ink: "#0F172A",
        muted: "#6B7280",
        accent: "#4F46E5",
        "accent-soft": "#EEF2FF",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:
          "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)",
        lift: "0 2px 4px rgba(15, 23, 42, 0.04), 0 12px 28px rgba(15, 23, 42, 0.1)",
        glow: "0 0 0 1px rgba(79, 70, 229, 0.12), 0 8px 32px rgba(79, 70, 229, 0.15)",
        "nav-glow":
          "0 0 20px rgba(99, 102, 241, 0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      borderRadius: {
        card: "14px",
        "2xl": "1rem",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "step-dot": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.15)", opacity: "0.85" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.45s ease-out forwards",
        "step-dot": "step-dot 1.2s ease-in-out infinite",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
