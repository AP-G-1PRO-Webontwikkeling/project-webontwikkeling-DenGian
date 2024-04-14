/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./node_modules/flowbite/**/*.{js,jsx,ts,tsx,ejs}",
      "./src/views/**/*.ejs",
      "./src/views/*.ejs",
      "./src/views/index.ejs",
      "./src/**/*.{js,jsx,ts,tsx,ejs}",
      "./src/**/*.{html,js,ejs}"
   ],
   theme: {
      extend: {},
   },
   plugins: [
      require('flowbite/plugin')
   ],
}