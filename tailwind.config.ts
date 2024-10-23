/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // This makes Poppins the default font
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        /**SDG Colours */ 
        "sdg":{
          "1": "#E5243B",
          "2": "#DDA63A",
          "3": "#4C9F38",
          "4": "#C5192D",
          "5": "#FF3A21",
          "6": "#26BDE2",
          "7": "#FCC30B",
          "8": "#A21942",
          "9": "#FD6925",
          "10": "#DD1367",
          "11": "#FD9D24",
          "12": "#BF8B2E",
          "13": "#3F7E44",
          "14": "#0A97D9",
          "15": "#56C02B",
          "16": "#00689D",
          "17": "#19486A",
        },
      },

      // Text variations
      text: {
        default: 'neutral-900',    // Almost black
        subtle: 'neutral-700',     // Dark gray
        subtler: 'neutral-500',    // Medium gray
        subtlest: 'neutral-400',   // Light gray
        inverse: 'neutral-50',     // Almost white
      },
      // Background variations
      bg: {
        default: 'neutral-50',     // Almost white
        surface: 'neutral-100',    // Very light gray
        outline: 'neutral-200',    // Light gray
      },


    },
  },
  plugins: [],
};
