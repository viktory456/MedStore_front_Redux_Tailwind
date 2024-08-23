/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
       colors: {
        "dbeige": "#AD8B73",
        "mbeige": "#CEAB93",
        "lbeige": "#E3CAA5",
        "lyellow": "#FFFBEA",
        // "red": "#EB8F8F",
        "bgmain": "#FAF9F6",
       }
    },
  },
  plugins: [],
}


// Breakpoint prefix Minimum width CSS
// sm	640px	
// md	768px	
// lg	1024px
// xl	1280px
// 2xl	1536px