/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    
    extend: {
      colors:{
        bgPrimary: "rgb(var(--bg-primary)/<alpha-value>)",
        bgSecondary: "rgb(var(--bg-secondary)/<alpha-value>)",
        txtPrimary: "rgb(var(--txt-primary)/<alpha-value>)",
        accent: "rgb(var(--accent)/<alpha-value>)",
      },
    },
  },
  plugins: [],
}