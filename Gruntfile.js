module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'compressed',
				},
				files: { 
					'dist/style.css': 'sass/style.scss',
				}
			}
		},
		//Tarea para poneer prefijos de webkit moz etc
		postcss: {
            options: {
                map: true,
                processors: [

                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: 'dist/*.css'
            }
        },
		watch: {
			options: {
				livereload: true
			},
			css: {
				files: 'sass/*.scss',
				tasks: ['sass', 'postcss:dist']
			},
			js: {
			    files: ['js/*',
			        	'modules/age/*.js',
			        	'modules/details/*.js',
			        	'modules/home/*.js',
			        	'modules/profile/*.js',],
			    tasks: ['concat']
			}
		},
		concat:{
			js:{
				src:[
			        	'js/*',
			        	'modules/age/*.js',
			        	'modules/details/*.js',
			        	'modules/home/*.js',
			        	'modules/profile/*.js',
			        ],
			    dest:'dist/scripts.min.js'
			}
		},
		uglify: {
		    my_target: {
			    files: {
			        'dist/scripts.min.js': [
			        	'js/*',
			        	// 'modules/age/*.js',
			        	// 'modules/details/*.js',
			        	// 'modules/home/*.js',
			        	// 'modules/profile/*.js',
			        ]
			    }
		    }
		}
	})

	grunt.registerTask('default', ['watch'])
};