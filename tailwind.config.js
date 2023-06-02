/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}" , './*'],
  theme: {
    extend: {

      colors : {
         ModerateBlue: 'hsl(238, 40%, 52%)' ,
         SoftRed: 'hsl(358, 79%, 66%)',
         LightGrayishBlue: 'hsl(239, 57%, 85%)',
         PaleRed: 'hsl(357, 100%, 86%)',
         GrayishBlue: 'hsl(211, 10%, 45%)',
         Light : '#f5f6fa' , 
         LightBlack : 'rgb(0,0,0,.7)' 
      }
    },
  },
  plugins: [],
}