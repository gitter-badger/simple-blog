var config = module.exports;

config['My tests'] = {
    environment: 'node',
    rootPath: '../',
    tests: [
        //'all-tests.js'
        'test/**/**/*.js'
    ],

    // buster-istanbul setup
    'buster-istanbul': {
        outputDirectory: 'coverage',
        format: 'lcov'
    },
    sources: [
        'lib/**/**/*.js',
        'app/routes/**/*.js'
    ],
    extensions: [
        require('buster-istanbul')
    ]
};
