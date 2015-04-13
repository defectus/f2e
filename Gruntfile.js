module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					targetDir: './static/requires',
					install: true,
					cleanTargetDir: true
				}
			}
		},
		clean: {
			build: {
				src: ['dist/']
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
			files: ['Gruntfile.js', 'client/**/*.js', 'test/**/*.js'],
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
					cwd: 'client',
					src: 'client/**/*.js',
					dest: 'static'
				}]
			}
		},
		copy: {
			build: {
				files: [
					{expand: true, src: ['bower_components/**'], dest: 'static/'}
				]
			},
			view: {
				files: [
					{expand: true, cwd: 'src', src: ['view/**'], dest: 'dist/'}
				]
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
		typescript: {
			base: {
				src: ['src/**/*.ts'],
				dest: 'dist/',
				options: {
					module: 'commonjs', //or commonjs
					target: 'es5', //or es3
					sourceMap: false,
					declaration: true,
					watch: false,
					basePath: 'src'
				}
			}
		},
		tsd: {
			refresh: {
				options: {
					// execute a command
					command: 'reinstall',

					//optional: always get from HEAD
					latest: true,

					// specify config file
					config: 'tsd.json',

					// experimental: options to pass to tsd.API
					opts: {
						// props from tsd.Options
					}
				}
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
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-npm-install');
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-tsd');
	grunt.registerTask('build',
			['clean:build', 'copy:build', 'npm-install', 'bower:install', 'tsd', 'typescript',
				'mochaTest:test', 'jshint', 'uglify']);
	grunt.registerTask('lite-build',
			['clean:build', 'copy:view', 'typescript', 'jshint', 'uglify']);
	grunt.registerTask('test',
			['clean:build', 'copy:build', 'mochaTest:test']);
	grunt.registerTask('default', ['lite-build']);
};
