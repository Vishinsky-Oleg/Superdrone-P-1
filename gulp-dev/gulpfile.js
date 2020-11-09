const gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    sass = require("gulp-sass"),
    cleanCSS = require("gulp-clean-css"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    lineec = require("gulp-line-ending-corrector");

const root = "../"; //Root folder
const scss = root + "src/scss/", //Folder with scss files
    js = root + "src/js/", //folder with js files
    vendor = js + "vendor/",
    jsdist = root + "dist/js/", //folder to place minified version of js
    cssdist = root + "dist/css/";

const mainWatchFiles = root + "**/*.html",
    jsWatchFiles = root + "src/js/**/*.js", //Files that is gonna be changed
    styleWatchFiles = scss + "**/*.scss"; //if scss is changed

const jsSRC = [
    //order in which js files will be processed
    js + "main.js",
    // vendor + "jquery-2.1.1.min.js",
    // vendor + "bootstrap.js",
    // vendor + "jquery.magnific-popup.min.js",
];

const cssSRC = [
    //order in which cs files will be processed
    root + "src/css/vendor/bootstrap-grid.css",
    root + "src/css/style.css", //compiled
];

function css() {
    return gulp
        .src([scss + "style.scss"])
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(
            sass({
                outputStyle: "expanded",
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer("last 2 versions"))
        .pipe(sourcemaps.write())
        .pipe(lineec())
        .pipe(gulp.dest(root + "src/css/"));
}

function concatCSS() {
    return gulp
        .src(cssSRC)
        .pipe(sourcemaps.init({ loadMaps: true, largeFile: true }))
        .pipe(concat("style.min.css"))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write("./"))
        .pipe(lineec())
        .pipe(gulp.dest(cssdist));
}

function javascript() {
    return gulp
        .src(jsSRC)
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(lineec())
        .pipe(gulp.dest(jsdist));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: root,
        },
    });
    gulp.watch(styleWatchFiles, gulp.series([css, concatCSS]));
    gulp.watch(jsSRC, javascript);
    gulp.watch([jsWatchFiles, styleWatchFiles, mainWatchFiles]).on(
        "change",
        browserSync.reload
    );
}

exports.css = css;
exports.concatCSS = concatCSS;
exports.javascript = javascript;
exports.watch = watch;

const build = gulp.parallel(watch);
gulp.task("default", build);
