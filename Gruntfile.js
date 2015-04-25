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
            client: {
                src: ['src/js/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        jshint: {
            node: {
                src: ['src/**/*.js', 'test/**/*.js']

            },
            client: {
                src: ['client/**/*.js', 'test/**/*.js']
            },
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
            client: {
                files: [{
                    expand: true,
                    cwd: 'client',
                    src: 'client/**/*.js',
                    dest: 'static'
                }]
            }
        },
        copy: {
            client: {
                files: [
                    {expand: true, src: ['bower_components/**'], dest: 'static/'}
                ]
            },
            node: {
                files: [
                    {expand: true, cwd: 'src', src: ['**/*.js'], dest: 'dist/'}
                ]
            },
            view: {
                files: [
                    {expand: true, cwd: 'src', src: ['view/**'], dest: 'dist/'}
                ]
            }
        },
        mochaTest: {
            testClient: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt', // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/**/*.js']
            },
            testNode: {
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
            files: ['<%= jshint.node.files %>'],
            tasks: ['jshint:node', 'copy:node']
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
    grunt.registerTask('build',
            ['clean:build', 'copy:client', 'copy:view', 'copy:node', 'npm-install', 'bower:install',
                'mochaTest:testClient', 'mochaTest:testNode', 'jshint:client', 'jshint:node', 'uglify:client']);
    grunt.registerTask('lite-build',
            ['clean:build', 'copy:client', 'copy:view', 'copy:node', 'jshint:client', 'jshint:node', 'uglify:client']);
    grunt.registerTask('test',
            ['clean:build', 'copy:build', 'mochaTest:testClient', 'mochaTest:testNode']);
    grunt.registerTask('default', ['lite-build']);
};
