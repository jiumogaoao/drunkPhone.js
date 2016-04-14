// JavaScript Document
module.exports = function(grunt){
	'use strict';
    grunt.initConfig({
	jshint:{
		options:{
		  "curly": true,
		  "eqnull": true,
		  "eqeqeq": true,
		  "globals": {
			"jQuery": true
		  }
		},
		bin:['bin/api.js','bin/common.js','bin/config.js','bin/control.js','bin/route.js','bin/model.js'],
		api:['api/**/*.js'],
		control:['control/**/*.js'],
		model:['model/**/*.js']
	},
		clean:{
			all:['dist/**/*']
			},
		copy:{
			html:{src: ['grunt.html'], dest: 'dist/index.html'},
			style:{src: ['style.css'], dest: 'dist/style.css'},
			view:{expand: true, src: ['html/**/*'], dest: 'dist'},
			include:{expand: true, src: ['include/**/*'], dest: 'dist'},
			fonts:{expand: true, src: ['fonts/**/*'], dest: 'dist'},
			},
        cssmin: {
            options: {                                       //配置
                stripBanners:true,
                banner: '/*! This is the grunt test ' +      //添加自定义的banner
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            basic: {expand: true, cwd: 'css', src: ['*.css'], dest: 'dist/css'}
        },
        uglify: {
            options: {
                banner: '/*! This is uglify test - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
			bin: {src: ['bin/jquery.js','bin/underscore.js','bin/config.js','bin/common.js','bin/route.js','bin/api.js','bin/control.js','bin/model.js'], dest: 'dist/bin/drunk.js'},
			api: {expand: true, cwd: 'api', src: ['*.js'], dest: 'dist/api'},
			control: {expand: true, cwd: 'control', src: ['*.js'], dest: 'dist/control'},
			model: {expand: true, cwd: 'model', src: ['*.js'], dest: 'dist/model'},
            },
		htmlmin:{
			options: {
                removeComments: true,
				 removeCommentsFromCDATA: true,
				 collapseWhitespace: true,
				 collapseBooleanAttributes: true,
				 removeAttributeQuotes: true,
				 removeRedundantAttributes: true,
				 useShortDoctype: true,
				 removeEmptyAttributes: true,
				 removeOptionalTags: true
            },
			html:{
				 expand: true, cwd: 'html', src: ['*.html'], dest: 'dist/html'
			}
			},
		imagemin:{
         options: {
            optimizationLevel: 7,
            pngquant: true
          },
			img:{
				 expand: true, cwd: 'img', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/img'
			}
			},
        watch: {
            another: {
                files: ['bin/**/*.js','api/**/*.js','control/**/*.js'],
                tasks: ['jshint']
            }
        }
    });
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['jshint','clean','copy','cssmin','uglify','imagemin']);
	grunt.registerTask('watch', ['jshint']);
}