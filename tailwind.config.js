/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{html,ts}'],
    theme: {
        colors: {
            primary: {
                700: '#FBFBFB',
                600: '#F6F6F6',
                500: '#EFEFEF',
                400: '#E3E3E3',
                300: '#D2D2D2',
                200: '#C2C2C2',
                100: '#A8A8A8',
                50: '#999999',
            },
            secondary: {
                700: '#050505',
                600: '#0A0A0A',
                500: '#111111',
                400: '#1E1E1E',
                300: '#2F2F2F',
                200: '#3F3F3F',
                100: '#494949',
                50: '#555555',
            },
            warning: {
                700: '#FE9B0E',
                600: '#FFAD0D',
                500: '#FFC62B',
                400: '#FFDD82',
                300: '#FFE5AA',
                200: '#FFEEBB',
            },
            danger: {
                700: '#EC2D30',
                600: '#F64C4C',
                500: '#EB6F70',
                400: '#F49898',
                300: '#F4AAAA',
                200: '#F4B8BB',
            },
            info: {
                900: '#2050E2',
                800: '#2D60E2',
                700: '#3A70E2',
                600: '#3B82F6',
                500: '#4BA1FF',
                400: '#93C8FF',
            },
            success: {
                700: '#0C9D61',
                600: '#47B881',
                500: '#6BC497',
                400: '#97D4B4',
            },
        },
        opacity: {
            50: '0.50',
            10: '0.10',
        },
        screens: {
            tablet: '768px',
            desktop: '1440px',
        },
        fontSize: {
            body: ['14px', { lineHeight: '22px' }],
            title: ['18px', { lineHeight: '26px' }],
            h3: ['20px', { lineHeight: '28px' }],
            h2: ['24px', { lineHeight: '32px' }],
            h1: ['30px', { lineHeight: '38px' }],
        },
        fontFamily: {
            ui: 'Roboto Condensed, sans-serif',
        },
        fontWeight: {
            regular: '400',
            medium: '500',
            bold: '700',
        },
        boxShadow: {
            card_white:
                '0 -2px 5px 0 rgba(255, 255, 255, 0.25), 0 2px 5px 0 rgba(255, 255, 255, 0.25)',
            card_black: '0 -2px 5px 0 rgba(0, 0, 0, 0.25), 0 2px 5px 0 rgba(0, 0, 0, 0.25)',
            slide_white:
                '0 1px 5px 0 rgba(255, 255, 255, 0.12), 0 2px 2px 0 rgba(255, 255, 255, 0.14), 0 1px 1px 0 rgba(255, 255, 255, 0.20)',
            slide_black:
                '0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.20)',
            footer_white: '0 -2px 5px 0 rgba(255, 255, 255, 0.25)',
            footer_black: '0 -2px 5px 0 rgba(0, 0, 0, 0.25)',
            header_white: '0 2px 5px 0 rgba(255, 255, 255, 0.25)',
            header_black: '0 2px 5px 0 rgba(0, 0, 0, 0.25)',
        },
        borderRadius: {
            normal: '0.75rem',
            semi: '0.375rem',
            full: '9999px',
        },
        extend: {
            spacing: {
                outside_desktop: '2rem',
                outside_tablet: '1rem',
                normal: '1rem',
                demi: '0.5rem',
            },
            borderWidth: {
                1: '1px',
            },
        },
    },
    plugins: [
        require('tailwindcss'),
        require('@tailwindcss/container-queries'),
        require('prettier-plugin-tailwindcss'),
        require('autoprefixer'),
    ],
};
