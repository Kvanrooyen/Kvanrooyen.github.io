const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const AUTOPREFIXER_BROWSERS = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10"
];

//Compile SCSS to CSS
function style() {
  // 1. Find SCSS file
  return (
    gulp
      .src("src/scss/**/*.scss")
      // 2. Pass file through SASS compiler
      .pipe(
        sass({
          outputStyle: "nested",
          precision: 10,
          includePaths: ["."],
          onError: console.error.bind(console, "Sass error:")
        })
      )
      .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
      // 3. Where to save CSS file
      .pipe(gulp.dest("css"))
      // 3.5 Minify CSS
      .pipe(csso())
      //Rename minified CSS file
      .pipe(rename("main.min.css"))
      //Save minified CSS file
      .pipe(gulp.dest("css"))
      // 4. Stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

//Watch and update
function watch() {
  browserSync.init({
    server: {
      baseDir: "."
    }
  });
  gulp.watch("src/scss/**/*.scss", style);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("src/scss/**/*.scss").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
