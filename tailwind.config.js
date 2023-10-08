/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{html,ts}'],
    theme: {
        opacity: {
            50: '0.50',
            10: '0.10',
        },
        screens: {
            tablette: '768px',
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
                'box-shadow: 0 -2px 5px 0 rgba(255, 255, 255, 0.25), 0 2px 5px 0 rgba(255, 255, 255, 0.25)',
            card_black:
                'box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.25), 0 2px 5px 0 rgba(0, 0, 0, 0.25)',
            slide_white:
                'box-shadow: 0 1px 5px 0 rgba(255, 255, 255, 0.12), 0 2px 2px 0 rgba(255, 255, 255, 0.14), 0 1px 1px 0 rgba(255, 255, 255, 0.20)',
            slide_black:
                'box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 1px 0 rgba(0, 0, 0, 0.20)',
            footer_white: 'box-shadow: 0 -2px 5px 0 rgba(255, 255, 255, 0.25)',
            footer_black: 'box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.25)',
            header_white: 'box-shadow: 0 2px 5px 0 rgba(255, 255, 255, 0.25)',
            header_black: 'box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25)',
        },
        borderRadius: {
            normal: '0.75rem',
            semi: '0.375rem',
            full: '9999px',
        },
        extend: {
            backgroundImage: {
                dark_0: 'url("src/assets/background/bg-dark-0.png")',
                dark_1: 'url("src/assets/background/bg-dark-1.png")',
                dark_2: 'url("src/assets/background/bg-dark-2.png")',
                dark_3: 'url("src/assets/background/bg-dark-3.png")',
                dark_4: 'url("src/assets/background/bg-dark-4.png")',
                dark_5: 'url("src/assets/background/bg-dark-5.png")',
                dark_6: 'url("src/assets/background/bg-dark-6.png")',
                light_0: 'url("src/assets/background/bg-light-0.png")',
                light_1: 'url("src/assets/background/bg-light-1.png")',
                light_2: 'url("src/assets/background/bg-light-2.png")',
                light_3: 'url("src/assets/background/bg-light-3.png")',
                light_4: 'url("src/assets/background/bg-light-4.png")',
                light_5: 'url("src/assets/background/bg-light-5.png")',
                light_6: 'url("src/assets/background/bg-light-6.png")',
            },
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
            spacing: {
                outside_desktop: '2rem',
                outside_tablet: '1rem',
                normal: '1rem',
                demi: '0.5rem',
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
