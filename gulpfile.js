var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var twig = require('gulp-twig');
var {touch} = require('./.utils/gulp-touch');

var paths = {
    build: {
        server: 'dist-server',
        css: 'dist-server/assets/css',
        js: 'dist-server/assets/js',
        vendor: 'dist-server/assets/vendor',
    },
    src: {
        public: ['src/public/**/*', '!src/public/**/*.html.twig'],
        pages: 'src/public/**/*.html.twig',
        templates: 'src/templates',
        sass: 'src/assets/css/app.scss',
        js: 'src/assets/js/*.js'
    },
    watch: {
        sass: 'src/assets/css/**/*.scss',
        js: 'src/assets/js/*.js',
        public: ['src/public/**/*.*', '!src/public/**/*.html'],
        templates: ['src/public/**/*.html', 'src/templates/**/*.*'],
    }
};

var vendor = [
    'node_modules/jquery/dist/jquery.min.js',
];

function cleanResult() {
    return gulp.src(paths.build.server, {
            read: false,
            allowEmpty: true,
        })
        .pipe(clean());
}

function copyPublic() {
    return gulp.src(paths.src.public)
        .pipe(gulp.dest(paths.build.server))
}

function templates() {
    return gulp.src(paths.src.pages)
        .pipe(twig({
            base: paths.src.templates,
            extname: '',
        }))
        .pipe(touch()) //update modify time of generated files
        .pipe(gulp.dest(paths.build.server))
}

function styles() {
    return gulp.src(paths.src.sass)
        .pipe(sass())
        .pipe(gulp.dest(paths.build.css))
}

function js() {
    return gulp.src(paths.src.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.build.js))
}

function copyVendorFiles() {
    return gulp.src(vendor)
        .pipe(gulp.dest(paths.build.vendor))
}

function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: paths.build.server,
        },
        open: false,
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

var build = gulp.series(
    cleanResult,
    gulp.parallel(copyPublic, templates, styles, js, copyVendorFiles),
);

function watchInternal(done) {
    gulp.watch(paths.watch.sass, gulp.series(styles, browserSyncReload));
    gulp.watch(paths.watch.js, gulp.series(js, browserSyncReload));
    gulp.watch(paths.watch.public, gulp.series(copyPublic, browserSyncReload));
    gulp.watch(paths.watch.templates, gulp.series(templates, browserSyncReload));
    done();
}

exports.clean = cleanResult;
exports.build = build;
exports.watch = gulp.series(build, browserSyncInit, watchInternal);
exports.default = build;
