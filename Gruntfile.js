'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint : {
            all : ['Gruntfile.js', 'libs/*.js'],
            options : {
                jshintrc : '.jshintrc'
            }
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

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint']);

};
