
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
        copy:{
            main: {
                files: [
                    {src: 'app/index-dev.html', dest: 'dist/index.html'},
                    {expand: true, cwd: 'app', src: 'phones/**', dest: 'dist/'},
                    {expand: true, cwd: 'app', src: 'partials/**', dest: 'dist/'},
                    {expand: true, cwd: 'app', src: 'img/**', dest: 'dist/'}
                ]
            }
        },
        watch: {
            files: ['<%= jshint.files %>', 'app/**/*.js', 'test/**/*.js'],
            tasks: ['karma:unit']
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            source: {
                files: [{
                    src: [
                        'dist/js/**/*.js',
                        'dist/css/**/*.css'
                    ]
                }]
            }
        },
        useminPrepare: {
            html: 'app/index-dev.html',
            options: {
                flow: {
                    steps: {
                        js: ['uglifyjs'],
                        css: ['cssmin']
                    },
                    post: {}
                }
            }
        },
        usemin:{
            html:['dist/index.html']
        },
        clean: ['build', 'dist']
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');

    grunt.registerTask('test', ['karma:unit']);

    grunt.registerTask('default', ['karma:continuous', 'clean', 'copy',  'useminPrepare', 'uglify', 'cssmin', 'filerev', 'usemin']);
    grunt.registerTask('deploy', ['karma:continuous', 'useminPrepare']);
};