module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        files: ['src/**/*.spec.ts'],
        // coverage reporter generates the coverage
        reporters: ['progress', 'kjhtml', 'coverage'],
        preprocessors: {
            'src/**/*.spec.ts': ['coverage'],
        },
        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/',
            check: {
                global: {
                    statements: 90,
                    branches: 90,
                    functions: 90,
                    lines: 90
                }
            }
        },
    });
};
