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
                dest: 'build/js/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-angular-builder');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'angular-builder']);

};