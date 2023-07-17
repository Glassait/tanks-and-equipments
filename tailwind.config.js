const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{html,ts}"],
    theme: {
        colors: {
            primaryLight: "#FFFFFF",
            secondaryLight: "#000000",
            backgroundLight: "#E9E9E9",
            primaryDark: "#000000",
            secondaryDark: "#FFFFFF",
            backgroundDark: "#131313",
            ok: "#51E839",
            ko: "#EE1E1E",
            link: "#0500FF",
        },
        screens: {
            ssm: "360px",
            ...defaultTheme.screens,
        },
        extend: {},
    },
    plugins: [
        require("@tailwindcss/container-queries"),
        require("prettier-plugin-tailwindcss"),
    ],
};
