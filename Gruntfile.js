
module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                runnerPort: 9999,
                singleRun: false,
                browsers: ['Chrome']
            },
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
        watch: {
            files: ['<%= jshint.files %>', 'app/**/*.js', 'test/**/*.js'],
            tasks: ['karma:unit']
        },
        open : {
            coverage: {
                path: 'coverage/Chrome 40.0.2214 (Mac OS X 10.9.4)/index.html',
                app: 'Google Chrome'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('test', ['karma:unit']);

    grunt.registerTask('default', ['jshint', 'karma:unit']);
    grunt.registerTask('deploy', ['karma:continuous']);
};