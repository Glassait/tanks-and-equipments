module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-jasmine-html-reporter',
            'karma-coverage',
            '@angular-devkit/build-angular/plugins/karma',
        ],
        files: [{ pattern: 'src/**/*.spec.ts', type: 'js' }],
        // coverage reporter generates the coverage
        reporters: ['progress', 'kjhtml', 'coverage'],
        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: require('path').join(__dirname, './coverage/'),
            subdir: '.',
            reporters: [{ type: 'html' }, { type: 'text-summary' }],
            check: {
                global: {
                    statements: 90,
                    branches: 90,
                    functions: 90,
                    lines: 90,
                },
            },
        },
    });
};
