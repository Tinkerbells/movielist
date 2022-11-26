/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0d0d0d',
                white: '#EAEAEA',
                gray: '#333333',
                darkGray: '#1F1F1F',
                lightGray: '#5C5C5C',
                red: '#F33F3F',
            },
            fontFamily: {
                soureSansPro: ['Source Sans Pro', 'sans-serif'],
            },
        },
        screens: {
            xs: '480px',
            ss: '620px',
            sm: '768px',
            md: '1060px',
            lg: '1200px',
            xl: '1700px',
        },
    },
    plugins: [],
}
