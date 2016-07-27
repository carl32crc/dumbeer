module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');

	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'compressed',
				},
				files: { 
					'dist/style.css': 'sass/style.scss',
					'dist/style-user-profile.css': 'sass/style-user-profile.scss',
				}
			}
		},
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
			// js: {
			//     files: 'js/*.js',
			//     tasks: ['uglify']
			// }
		},
		uglify: {
		    my_target: {
			    files: {
			        'dist/scripts.min.js': [
			        	'js/*',
			        ]
			    }
		    }
		}
	})

	grunt.registerTask('default', ['watch'])
};