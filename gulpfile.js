'use strict';

var gulp = require('gulp');
var del = require('del');
var webpack = require('webpack-stream');

gulp.task('buildApp', function(){
	return gulp.src(['app/bubbleChartApp.tsx']).pipe(webpack({  
	  output: {
	    filename: 'react-d3-bubble-chart.js'
	  },
	  resolve: {
	    extensions: ['','.tsx', '.ts', '.js']
	  },
	  module: {
	    loaders: [
	      { test: /\.(tsx|ts)$/, loader: 'ts-loader' }
	    ]
	  }})
	).pipe(gulp.dest("./dist/"));
});


gulp.task('build', ["buildApp"]);
