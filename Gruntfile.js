module.exports = function(grunt) {

  var JS_FILE_PATH = 'generalstore/media/js/';
  var JS_TEST_PATH = 'generalstore/test/';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        JS_FILE_PATH + 'base/*.js',
        JS_FILE_PATH + 'main.js',
        JS_TEST_PATH + 'main.js',
        JS_TEST_PATH + 'test.*.js'
      ]
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [JS_FILE_PATH + 'require.js', JS_FILE_PATH + 'build/optimized.js'],
        dest: JS_FILE_PATH + 'build/<%= pkg.name %>.js'
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: JS_FILE_PATH,
          mainConfigFile: JS_FILE_PATH + 'config.js',
          out: JS_FILE_PATH + 'build/optimized.js',
          name: 'config'
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'generalstore/media/css/main-min.css': [
            'generalstore/media/css/reset.css',
            'generalstore/media/css/main.css'
          ]
        }
      }
    },
    watch: {
      scripts: {
        files: [
          JS_FILE_PATH + 'base/*.js',
          JS_FILE_PATH + 'main.js',
          'generalstore/media/css/*.css'
        ],
        tasks: ['jshint', 'cssmin', 'requirejs', 'concat'],
        options: {
          nospawn: true,
          event: ['added', 'deleted', 'changed']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['jshint', 'cssmin', 'requirejs', 'concat']);
};
