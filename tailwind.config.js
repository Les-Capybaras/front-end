/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        bumblebee: {
          ...require("daisyui/src/colors/themes")["[data-theme=bumblebee]"],
          primary: "#52489C",
          secondary: "#59C3C3",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
