/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        surface: "#111111",
        surface2: "#161615",
        line: "#232320",
        gold: {
          DEFAULT: "#F4C84B",
          soft: "#F7D876",
          dim: "#8A7132",
        },
        ash: "#B4B3AC",
        mist: "#77766E",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(244,200,75,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(244,200,75,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        gold: "0 0 40px -8px rgba(244,200,75,0.35)",
        "gold-sm": "0 0 20px -6px rgba(244,200,75,0.4)",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 30s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
