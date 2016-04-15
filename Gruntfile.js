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
		bin:['bin/common.js','bin/config.js','bin/control.js','bin/api.js','bin/view.js'],
		control:['control/**/*.js']
	},
		clean:{
			all:['dist/**/*'],
			cache:['cache/**/*']
			},
		copy:{
			html:{src: ['grunt.html'], dest: 'dist/index.html'}
			},
        cssmin: {
            options: {                                       //配置
            },
            module:{src: ['moduleCss/*.css'], dest: 'cache/module.css'},
            page:{src: ['pageCss/*.css'], dest: 'cache/page.css'},
            combin: {src: ['css/common.css','cache/module.css','cache/page.css'], dest: 'dist/css/css.css'}
        },
        uglify: {
            options: {
            },
			bin: {src: ['bin/zepto.js','bin/event.js','bin/ajax.js','bin/touch.js','bin/underscore.js','bin/iscroll.js','bin/sea.js','bin/config.js','bin/common.js','bin/control.js','bin/api.js','bin/view.js'], dest: 'cache/bin.js'},
			control: {src: ['control/*.js'], dest: 'cache/control.js'},
			include:{src: ['include/*.js'], dest: 'cache/include.js'},
			combin:{src: ['cache/bin.js','cache/control.js','bin/run.js','cache/include.js'], dest: 'dist/js/js.js'}
            },
        concat:{
        	options: {},
        	combin: {src: ['view/*.html'], dest: 'dist/html/domAll.html'}
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
    grunt.registerTask('default', ['jshint','clean','copy','cssmin','uglify','concat','imagemin']);
}