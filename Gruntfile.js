'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint : {
            all : ['Gruntfile.js', 'src/*.js'],
            options : {
                jshintrc : '.jshintrc'
            }
        },
        concat : {
            options : {
                separator : ';',
            },
            dist : {
                src : ['src/chapterone.js', 'src/chaptertwo.js'],
                dest : 'dist/fplib.js',
            },
        },

        // Before generating any new files, remove any previously-created files.
        clean : {
            tests : ['tmp']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint']);

};
