/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx, mdx}"],
  darkMode: "class", // enable dark mode
  theme: {
    extend: {
      colors: {
        myorange: {
          light: "#feb649",
          DEFAULT: "#fe9900",
          dark: "#d98300",
        },
        mycyan: {
          light: "#5ec7ff",
          DEFAULT: "#26b2fd",
          dark: "#0092e1",
        },
        mygreen: {
          light: "#9eff00",
          DEFAULT: "#81cf01",
          dark: "#69a900",
        },
      },
    },
    fontFamily: {
      title: ["Montserrat", "Ubuntu"],
      headline: ["Ubuntu"],
      sans: ["Open Sans", "ui-sans-serif", "system-ui"],
      roboto: ["Roboto", "ui-sans-serif", "system-ui"],
      mono: ["Roboto Mono", "ui-monospace", "SFMono-Regular"],
      body: ["Open Sans", "Roboto"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
};
