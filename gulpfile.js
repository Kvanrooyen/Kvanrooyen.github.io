const gulp = require("gulp");
const sass = require("gulp-sass");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const browserSync = require("browser-sync");

// Compile SCSS to CSS
function style() {
  // Find SCSS file
  return (
    gulp
      .src("src/scss/*.scss")
      // Pass file through SASS compiler
      .pipe(
        sass({
          outputStyle: "nested",
          precision: 10,
          includePaths: ["."],
          onError: console.error.bind(console, "SASS Error: "),
        })
      )
      // Where to save CSS file
      .pipe(gulp.dest("src/css"))
      // Minify CSS
      .pipe(csso())
      // Rename minified CSS file
      .pipe(rename("main.min.css"))
      // Save minified CSS file
      .pipe(gulp.dest("src/css"))
      // Stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

// Watch and update
function watch() {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });
  gulp.watch("src/scss/*.scss", style);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("src/scss/*.scss").on("change", browserSync.reload);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
