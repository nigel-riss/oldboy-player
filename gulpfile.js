;
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassModuleImporter = require('sass-module-importer'),
    watch = require ('gulp-watch'), 
    browserSync = require('browser-sync');

// sass task
gulp.task("sass", function() {
    gulp.src("./app/sass/**/*.scss").
    pipe(sass({ importer: sassModuleImporter() }))
    .on("error", function(errorInfo) {
        console.log(errorInfo.toString());
        this.emit("end");
    })
    .pipe(gulp.dest("./app/css/"));
});

// CSSInject task
gulp.task('cssInject', ['sass'], function() {
    return gulp.src('./app/css/styles.css')
        .pipe(browserSync.stream());
});

// watch task 
gulp.task("watch", function() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });

    watch("./app/*.html", function() {
        browserSync.reload();
    });

    watch("./app/sass/**/*.scss", function() {
        gulp.start("sass");
    });

    watch("./app/js/*.js", function() {
        browserSync.reload();
    })

    watch("./app/css/styles.css", function() {
        gulp.start("cssInject");
    })
});