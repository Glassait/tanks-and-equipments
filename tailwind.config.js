/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/app/**/*.component.{html,js,ts}'],
    theme: {
        colors: {
            background: '#1C1C1E',
            neutral: {
                50: '#FFFFFF',
                100: '#FFFBED',
                200: '#F9F5E1',
                300: '#E9E2BF',
                400: '#B8B8A2',
                900: '#000000',
            },
            primary: {
                300: '#BE83D7',
                400: '#A86DC1',
                500: '#A04AC5',
                600: '#9131BA',
                700: '#692487',
                800: '#4A1B5F',
            },
            success: {
                300: '#83C06D',
                400: '#66AF4C',
                500: '#599942',
            },
            warning: {
                300: '#FAB81B',
                400: '#F6861F',
                500: '#F25322',
            },
        },
        fontFamily: {
            'roboto-condensed': ['RobotoCondensed', 'system-ui', 'sans-serif'],
            roboto: ['Roboto', 'system-ui', 'sans-serif'],
        },
        fontSize: {
            'caption-3': [
                '11px',
                {
                    fontWeight: '400',
                    lineHeight: '15px',
                },
            ],
            'caption-2': [
                '12px',
                {
                    fontWeight: '400',
                    lineHeight: '19px',
                },
            ],
            'caption-1': [
                '12px',
                {
                    fontWeight: '400',
                    lineHeight: '19px',
                },
            ],
            'body-2': [
                '16px',
                {
                    fontWeight: '400',
                    lineHeight: '24px',
                },
            ],
            'body-1': [
                '19px',
                {
                    fontWeight: '400',
                    lineHeight: '23px',
                },
            ],
            'subtitle-1': [
                '24px',
                {
                    fontWeight: '400',
                    lineHeight: '24px',
                },
            ],
            'title-3': [
                '32px',
                {
                    fontWeight: '700',
                    lineHeight: '42px',
                },
            ],
            'title-2': [
                '44px',
                {
                    fontWeight: '700',
                    lineHeight: '48px',
                },
            ],
            'title-1': [
                '48px',
                {
                    fontWeight: '700',
                    lineHeight: '53px',
                },
            ],
            'large-title': [
                '55px',
                {
                    fontWeight: '700',
                    lineHeight: '66px',
                },
            ],
            display: [
                '72px',
                {
                    fontWeight: '700',
                    lineHeight: '84px',
                },
            ],
        },
        borderRadius: {
            4: '.25rem',
            8: '.5rem',
            12: '.75rem',
            full: '9999px',
        },
        borderWidth: {
            1: '1px',
            2: '2px',
        },
        boxShadow: {
            /**
             * This box-shadow use {@link theme.colors.primary.800}
             */
            'outer-darker-purple': 'inset 0 3px 3px 0 #692487',
            /**
             * This box-shadow use {@link theme.colors.warning.300}
             */
            'outer-glow-large': 'inset -2px 0 0 0 #FAB81B, inset 2px 0 0 0 #FAB81B',
            'outer-glow-small': 'inset -1px 0 0 0 #FAB81B, inset 1px 0 0 0 #FAB81B',
        },
        screens: {
            tablet: '768px',
            desktop: '1440px',
        },
        extend: {
            spacing: {
                40: '2.5rem',
            },
            backgroundImage: {
                /**
                 * This gradiant go from {@link theme.colors.primary.500} to {@link theme.colors.neutral.900}
                 */
                'deep-purple-fade': 'linear-gradient(#A04AC5, #000000)',
                /**
                 * This gradiant go from {@link theme.colors.primary.700} to {@link theme.colors.primary.600}
                 */
                'royal-purple': 'linear-gradient(to bottom, #692487, #9131BA)',
            },
        },
    },
    corePlugins: {
        preflight: false,
    },
    plugins: ['prettier-plugin-tailwindcss'],
};
