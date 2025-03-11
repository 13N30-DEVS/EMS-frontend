// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Tailwind looks for classes in these files
  ],
  theme: {
    extend: {
      fontFamily :{
        "Pacific" : ["Pacifico","sans-serif"]
      }
    },
  },
  plugins: [],
};
