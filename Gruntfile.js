module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					targetDir: 'static/requires',
					layout: 'byComponent'
				}
			}
		},
		clean: {
			build: {
				src: 'static/'
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['src/js/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src',
					src: 'js/**/*.js',
					dest: 'dist'
				}]
			}
		},
		copy: {
			build: {
				files: [{
					src: 'bower_components/**/*.*',
					dest: 'static/'
				}]
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					captureFile: 'results.txt', // Optionally capture the reporter output to a file
					quiet: false, // Optionally suppress output to standard out (defaults to false)
					clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
				},
				src: ['test/**/*.js']
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.registerTask('build',
			['clean:build', 'copy:build', 'mochaTest:test', 'jshint', 'uglify']);
	grunt.registerTask('test',
			['clean:build', 'copy:build', 'mochaTest:test']);
	grunt.registerTask('default', ['jshint', 'uglify']);
};
