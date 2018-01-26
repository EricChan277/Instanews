//These are the "require" variable namings

 var gulp = require('gulp'),           //Always first in load order
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    sass = require ('gulp-sass'),
    autoprefixer = require ('gulp-autoprefixer'),
    cssnano = require ('gulp-cssnano'),
    prettyError = require ('gulp-prettyerror');

//SASS/SCSS Function + Minifying
  gulp.task("sass", function() {
    return gulp.src("./scss/style.scss")
      .pipe(sass())
      .pipe(prettyError())
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      .pipe(gulp.dest("./build/css"))
      .pipe(cssnano())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("./build/css"));
  });


//Watch Function

  gulp.task('watch', function() {
    gulp.watch('./js/*.js', gulp.series('script'));
    gulp.watch('./scss/*.scss', gulp.series('sass'));
  });



//Lint Function

  gulp.task('lint', function() {
    return gulp.src('./js/*.js')
    .pipe(eslint())   //calls eslint to run
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  });


  //Script Function
  gulp.task('script', gulp.series('lint', function scripts() {
    return gulp.src('./js/*.js')
      .pipe(uglify())   //calls uglify to run
      .pipe(rename({extname: '.min.js'})) //renames extension to ".min.js" 
      // .pipe(gulp.dest('./build/js')); //places in ./build/js folder
      .pipe(gulp.dest("./build/js"));
  }));

//Browser-Sync

  gulp.task('browser-sync', function() {
    browserSync.init( {
      server: {
        baseDir: "./"
      }
    });
    gulp.watch(["./build/js/*.js", "*.html", "./build/css/style.css"]).on('change', browserSync.reload); //watches for items in the array to change, then will reload browser
  });




//Gulp Default

  gulp.task('default', gulp.parallel('watch', 'browser-sync')); //runs script in parallel
