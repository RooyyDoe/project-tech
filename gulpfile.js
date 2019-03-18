// src: Youtube: simonswiss
var gulp = require('gulp')
var pug = require('gulp-pug')

gulp.task('pug', function() {
    return gulp.src('./views/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', function(){
    gulp.watch('./views/*.pug', gulp.series('pug'));
})

gulp.task('default', gulp.series('pug', 'watch'));