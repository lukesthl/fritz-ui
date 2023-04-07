
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        blink: "blink 1.4s infinite both",
        fade: "fade 1.4s infinite both",
        scale: "scale 2s infinite",
        perspective: "perspective 1.2s infinite",
        fadeIn: "fadeIn 1.2s ease-in-out infinite both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        blink: {
          "0%": {
            opacity: "0.2",
          },
          "20%": {
            opacity: "1",
          },
          "100%": {
            opacity: " 0.2",
          },
        },
        fade: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: " 0.3",
          },
        },
        fadeIn: {
          "0%, 39%, 100%": {
            opacity: "0",
          },
          "40%": {
            opacity: "1",
          },
        },
        scale: {
          "0%, 100%": {
            transform: "scale(1.0)",
          },
          "50%": {
            transform: "scale(0)",
          },
        },
        perspective: {
          "0%": { transform: "perspective(120px)" },
          " 50%": { transform: "perspective(120px) rotateY(180deg)" },
          "100%": {
            transform: "perspective(120px) rotateY(180deg)  rotateX(180deg)",
          },
        },
      },
      colors: {
        black: "#000212",
        white: "#F7F8F8",
        primary: {
          500: "#7877C6",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
};
