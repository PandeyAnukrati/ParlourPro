/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#FFAFCC',
        dashboard: '#FFFFFF',
        'sidebar-text': '#6D214F', // deep plum for contrast
        'dashboard-text': '#22223B', // dark blue-gray for dashboard text
      },
    },
  },
  plugins: [],
};
