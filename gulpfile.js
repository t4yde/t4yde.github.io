const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

//compile scss in to css
gulp.task('style', function() {
  return gulp.src('./kanye/assets/scss/**/*.scss')
  		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write({includeContent: false}))
    	.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(autoprefixer([
	        "last 1 major version",
	        ">= 1%",
	        "Chrome >= 45",
	        "Firefox >= 38",
	        "Edge >= 12",
	        "Explorer >= 10",
	        "iOS >= 9",
	        "Safari >= 9",
	        "Android >= 4.4",
	        "Opera >= 30"], { cascade: true }))
	    //.pipe(gulp.dest('./assets/css/'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./kanye/assets/css'))
		.pipe(browserSync.stream());
});


gulp.task('watch', function() {
  	browserSync.init({
  	files: "./*.html",
    startPath: "./",
		server: {
			baseDir: './kanye'
		}
	});
	gulp.watch('./kanye/assets/scss/**/*.scss', gulp.series('style'))
	gulp.watch('./**/*.html').on('change', browserSync.reload);
	gulp.watch('./kanye/assets/scss/**/*.scss').on('change', browserSync.reload);
	gulp.watch('./kanye/assets/js/**/*.js').on('change', browserSync.reload);
});


gulp.task('sass', gulp.parallel('style', 'watch')); // Combine

