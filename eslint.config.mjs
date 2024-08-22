import tsEslint from 'typescript-eslint';
import pluginJs from '@eslint/js';
import globals from 'globals';
import angularLint from '@angular-eslint/eslint-plugin';
import angularTemplateLint from '@angular-eslint/eslint-plugin-template';

export default tsEslint.config(
    pluginJs.configs.recommended,
    {
        languageOptions: {
            globals: globals.es2022,
            parser: tsEslint.parser,
            sourceType: 'module',
            ecmaVersion: 2022,
            parserOptions: { project: './tsconfig.json' },
        },
        plugins: {
            '@typescript-eslint': tsEslint.plugin,
            '@angular-eslint': angularLint,
            '@angular-eslint-template': angularTemplateLint,
        },
        files: ['**/*.ts'],
        rules: {
            '@typescript-eslint/no-unsafe-call': ['off'],
            '@typescript-eslint/no-var-requires': ['off'],
            '@typescript-eslint/no-inferrable-types': ['off'],
            '@typescript-eslint/consistent-type-definitions': ['off', 'type'],
            '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true, fixToUnknown: true }],
            '@typescript-eslint/adjacent-overload-signatures': ['error'],
            '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
            '@typescript-eslint/no-non-null-assertion': ['off'],
            '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
            '@typescript-eslint/no-unsafe-member-access': ['off'],
            '@typescript-eslint/prefer-nullish-coalescing': ['off'],
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    default: {
                        memberTypes: [
                            // Index signature
                            'signature',
                            'call-signature',

                            // Statics
                            'public-static-field',
                            'protected-static-field',
                            'private-static-field',
                            '#private-static-field',

                            'static-initialization',

                            'public-static-accessor',
                            'protected-static-accessor',
                            'private-static-accessor',
                            '#private-static-accessor',

                            'public-static-method',
                            'protected-static-method',
                            'private-static-method',
                            '#private-static-method',

                            // Fields
                            'public-decorated-field',
                            'protected-decorated-field',
                            'private-decorated-field',

                            'public-instance-field',
                            'protected-instance-field',
                            'private-instance-field',
                            '#private-instance-field',

                            'public-abstract-field',
                            'protected-abstract-field',

                            'public-field',
                            'protected-field',
                            'private-field',
                            '#private-field',

                            'static-field',
                            'instance-field',
                            'abstract-field',

                            'decorated-field',

                            'field',

                            // Constructors
                            'public-constructor',
                            'protected-constructor',
                            'private-constructor',

                            'constructor',

                            // Accessors
                            'public-decorated-accessor',
                            'protected-decorated-accessor',
                            'private-decorated-accessor',

                            'public-instance-accessor',
                            'protected-instance-accessor',
                            'private-instance-accessor',
                            '#private-instance-accessor',

                            'public-abstract-accessor',
                            'protected-abstract-accessor',

                            'public-accessor',
                            'protected-accessor',
                            'private-accessor',
                            '#private-accessor',

                            'static-accessor',
                            'instance-accessor',
                            'abstract-accessor',

                            'decorated-accessor',

                            'accessor',

                            // Methods
                            'public-decorated-method',
                            'protected-decorated-method',
                            'private-decorated-method',

                            'public-instance-method',
                            'protected-instance-method',
                            'private-instance-method',
                            '#private-instance-method',

                            'public-abstract-method',
                            'protected-abstract-method',

                            'public-method',
                            'protected-method',
                            'private-method',
                            '#private-method',

                            'static-method',
                            'instance-method',
                            'abstract-method',

                            'decorated-method',

                            'method',
                        ],
                    },
                },
            ],
            'no-duplicate-imports': ['error'],
            'no-constructor-return': ['error'],
            'object-shorthand': ['error', 'always'],
            'no-useless-rename': ['error'],
            'no-inner-declarations': ['error'],
            'no-self-compare': ['error'],
            'no-template-curly-in-string': ['error'],
            'no-unmodified-loop-condition': ['error'],
            'no-unreachable-loop': ['error'],
            'arrow-body-style': ['error', 'as-needed'],
            'block-scoped-var': ['error'],
            curly: ['error'],
            'no-unused-vars': ['off'],
            'no-undef': ['off'],
            'default-case-last': ['error'],
            'default-param-last': ['error'],
            eqeqeq: ['error'],
            'grouped-accessor-pairs': ['error'],
            'max-classes-per-file': ['error', { max: 1 }],
            'max-depth': ['error', { max: 3 }],
            'max-lines': ['error', { max: 500, skipComments: true, skipBlankLines: true }],
            'no-else-return': ['error', { allowElseIf: true }],
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: '',
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: '',
                    style: 'kebab-case',
                },
            ],
        },
    },
    {
        languageOptions: {
            globals: globals.browser,
            parser: tsEslint.parser,
            sourceType: 'module',
            ecmaVersion: 2022,
            parserOptions: { project: './tsconfig.json' },
        },
        plugins: {
            '@angular-eslint/template/recommended': angularTemplateLint,
            '@angular-eslint/template/accessibility': angularTemplateLint,
        },
        files: ['*.html'],
        rules: {},
    }
);
