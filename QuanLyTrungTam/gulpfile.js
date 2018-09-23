const gulp = require('gulp');
const bs = require('browser-sync').create();
const sass = require('gulp-sass');

//Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function(){
    return gulp.src(['./node_modules/bootstrap/scss/bootstrap.scss','./asset/scss/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("./asset/css"))
        .pipe(bs.stream());
});

//Move the javacript files into our asset/js
gulp.task('js', function(){
    return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js', './node_modules/jquery/dist/jquery.min.js', './node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("./asset/js"))
        .pipe(bs.stream());
});

//Static Server + watching scss/html files
gulp.task('serve', ['sass'], function(){
    bs.init({
        server: "./app/Views"
    });
    gulp.watch(['./node_modules/bootstrap/scss/bootstrap.scss', './asset/scss/**/*.scss'], ['sass']);
    gulp.watch("./app/Views/*.html").on('change', bs.reload);
});

gulp.task('fonts', function(){
    return gulp.src('./node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./asset/fonts'));
});

gulp.task('fa', function(){
    return gulp.src('./node_modules/font-awesome/css/font-awesome.css')
    .pipe(gulp.dest('./asset/css'));
});

// gulp.task('fi', function(){
//     return gulp.src('./node_modules/foundation-icons/foundation-icons.css')
//     .pipe(gulp.dest('./asset/css'));
// });

gulp.task('default', ['js', 'serve', 'fonts', 'fa']);