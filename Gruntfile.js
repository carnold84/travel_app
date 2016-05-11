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
        requirejs : {

            compile : {
                options : {
                    baseUrl : 'src/app',
                    paths : {

                        utilities : '../utilities',
                        jquery : '../libs/jquery-2.2.0'
                    },
                    name : '../app',
                    out : 'build/js/app-built.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'requirejs']);

};