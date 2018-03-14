module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: ['page/**/*.less'],
                tasks: ['concat', 'less', 'clean']
            },
            ejs: {
                files: ['page/**/*.ejs'],
                tasks: ['copy']
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    watch: '**/*.js'
                }
            }
        },
        concat: {
            dist: {
                src: ['page/**/*.less'],
                dest: 'static/style.less',
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'page',
                src: '**/*.ejs',
                dest: 'template/',
                flatten: true
            },
        },
        concurrent: {
            target: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['page/common']
                },
                files: {
                    'static/style.css': 'static/style.less'
                }
            }
        },
        clean: {
            build: [
                'static/style.less'
            ]
        },
    });


    grunt.registerTask('default', ['concat', 'less', 'clean', 'copy', 'concurrent']);

};