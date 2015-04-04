/*
 * grunt-userscript-meta
 * https://github.com/Zod-/grunt-userscript-meta
 *
 * Copyright (c) 2015 Julian Hangstörfer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  var userscript_meta = {};

  var files = grunt.file.expand('test/fixtures/*_package.json');
  files.forEach(function (file) {
    var name = file.replace(/^test\/fixtures\/|_package\.json$/g, '');
    var dest = 'tmp/' + name + '_meta.js';
    userscript_meta[name] = {
      options: {
        pkg: grunt.file.readJSON(file)
      },
      dest: dest
    };
  });

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    'userscript-meta': userscript_meta,

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'userscript-meta', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);

};
