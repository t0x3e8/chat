var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');

var destJS = 'public/javascripts/ext/';
var destCSS = 'public/stylesheets/ext/';


gulp.task('copy-js', function() {
	return  gulp.src(mainBowerFiles())
				.pipe(filter('*.js'))
				.pipe(gulp.dest(destJS));
});

gulp.task('copy-css', function() {
	return  gulp.src(mainBowerFiles())
				.pipe(filter('*.css'))
				.pipe(gulp.dest(destCSS));
});

gulp.task('default', ['copy-js', 'copy-css']);