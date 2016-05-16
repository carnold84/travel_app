module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        sass : {
            dist : {
                options : {
                    style : 'compressed',
                    sourcemap : 'none'
                },
                files : [{
                    expand : true,
                    cwd : 'scss',
                    src : ['*.scss'],
                    dest : 'build/css',
                    ext : '.css'
                }]
            }
        },
        'angular-builder': {
            options: {
                mainModule: 'travelApp'
            },
            app: {
                src:  'src/**/*.js',
                dest: 'compiled/app.js'
            }
        },
        uglify : {
            app : {
                files : [{
                    expand : true,
                    cwd: 'compiled',
                    src: '**/*.js',
                    dest: 'build/js/'
                }]
            }
        },
        watch: {
            src: {
                files: ['scss/**/*.scss', 'src/**/*.js'],
                tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-angular-builder');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'angular-builder', 'uglify']);

};