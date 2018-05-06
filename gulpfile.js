//モジュール
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
// const imagemin = require('gulp-imagemin');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');

//開発ディレクトリ
const devDir = 'src/'
const dev = {
  'html': devDir + '**/*.{html,htm}',
  'img': devDir + '**/*.{jpg,png,gif}',
  // 'img': [devDir + '**/*.jpg',devDir + '**/*.png'],
  'javascript': devDir + '**/*.js',
  'sass': devDir + '**/*.{scss,sass}'
}

//リリース用ディレクトリ
const destDir = 'dist/'
const dest = {
  'html': destDir,
  'img': destDir,
  'javascript': destDir,
  'css': destDir
}

gulp.task('html', function() {
    gulp.src(dev.html)
        .pipe(gulp.dest(dest.html));
});

gulp.task('img', function() {
  gulp.src(dev.img)
        // .pipe(imagemin())
        .pipe(gulp.dest(dest.img));
});

gulp.task('javascript', function() {
    gulp.src(dev.javascript)
        .pipe(gulp.dest(dest.javascript));
});

//sass
gulp.task('sass', () => {
  gulp.src(dev.sass)
  .pipe(sourcemaps.init()) //map生成
  .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
  .pipe(sass({
      outputStyle: 'expanded',
      indentWidth: 2
    })
  )
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(sourcemaps.write('./')) //map追加
  .pipe(gulp.dest(dest.css));
})

//ブラウザシンク
gulp.task('browser-sync', () => {
  browserSync({
    server: {
       baseDir: destDir,
       index  : 'index.html'
    }
  })
})

//デフォルト
gulp.task('default', ['html','img','javascript','sass','browser-sync'], () => {
  gulp.watch( dev.html, ['html']);
  gulp.watch( dev.img, ['img']);
  gulp.watch( dev.sass, ['sass']);
  gulp.watch( dev.javascript, ['javascript']);
  gulp.watch([dev.html, dev.img, dev.javascript, dev.sass ]).on('change', browserSync.reload);
})
