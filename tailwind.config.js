const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{html,ts}'],
    theme: {
        colors: {
            primaryLight: '#FFFFFF',
            secondaryLight: '#000000',
            backgroundLight: '#E9E9E9',
            primaryDark: '#000000',
            secondaryDark: '#FFFFFF',
            backgroundDark: '#202020',
            ok: '#51E839',
            ko: '#EE1E1E',
            linkLight: '#0500FF',
            linkDark: '#3733FF',
        },
        screens: {
            tablette: '768px',
            desktop: '1440px',
        },
        fontSize: {
            petit: ['16px'],
            normal: ['20px'],
            title: ['25px'],
        },
        fontFamily: {
            ui: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        },
        extend: {},
    },
    plugins: [
        require('@tailwindcss/container-queries'),
        require('prettier-plugin-tailwindcss'),
    ],
};
