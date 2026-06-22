/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Glory", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        canvas: "#eef1fb",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(15, 23, 42, 0.06), 0 6px 16px -8px rgba(15, 23, 42, 0.12)",
        "card-hover":
          "0 2px 4px 0 rgba(15, 23, 42, 0.08), 0 10px 24px -10px rgba(15, 23, 42, 0.18)",
      },
    },
  },
  plugins: [],
};
