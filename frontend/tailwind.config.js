/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx, mdx}"],
  theme: {
    extend: {},
    fontFamily: {
      title: ["Montserrat", "Ubuntu"],
      headline: ["Ubuntu"],
      sans: ["Open Sans", "ui-sans-serif", "system-ui"],
      roboto: ["Roboto", "ui-sans-serif", "system-ui"],
      mono: ["Roboto Mono", "ui-monospace", "SFMono-Regular"],
      body: ["Open Sans", "Roboto"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
