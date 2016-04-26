var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var cssnano = require('gulp-cssnano');

gulp.task('compact-js', function () {
   return gulp.src(['./src/goog.js',
       './src/wandergis/wandergis.js',
       './src/wandergis/Constants.js',
       './src/wandergis/util/Utils.js',
       './src/wandergis/util/DomUtils.js',
       './src/wandergis/PlotTypes.js',
       './src/wandergis/PlotUtils.js',
       './src/wandergis/event/Event.js',
       './src/wandergis/event/PlotDrawEvent.js',
       './src/wandergis/plot/Plot.js',
       './src/wandergis/plot/Arc.js',
       './src/wandergis/plot/AttackArrow.js',
       './src/wandergis/plot/SquadCombat.js',
       './src/wandergis/plot/TailedAttackArrow.js',
       './src/wandergis/plot/TailedSquadCombat.js',
       './src/wandergis/plot/Circle.js',
       './src/wandergis/plot/ClosedCurve.js',
       './src/wandergis/plot/Curve.js',
       './src/wandergis/plot/DoubleArrow.js',
       './src/wandergis/plot/Ellipse.js',
       './src/wandergis/plot/FineArrow.js',
       './src/wandergis/plot/AssaultDirection.js',
       './src/wandergis/plot/GatheringPlace.js',
       './src/wandergis/plot/Lune.js',
       './src/wandergis/plot/Sector.js',
       './src/wandergis/plot/StraightArrow.js',
       './src/wandergis/PlotFactory.js',
       './src/wandergis/tool/PlotDraw.js',
       './src/wandergis/tool/PlotEdit.js'])
       .pipe(concat('leaflet-plot.min.js'))
       // .pipe(uglify())
       .pipe(gulp.dest('./dist/'))
       .pipe(gulp.dest('./sample/'));
});

gulp.task('compact-css', function(){
    return gulp.src('src/*.css')
        .pipe(concat('leaflet-plot.css'))
        .pipe(gulp.dest('./dist/'))
        .pipe(gulp.dest('./sample/'))
        .pipe(cssnano());
});

gulp.task('default', function () {
    var jsWatch = gulp.watch('./src/**/*.js', ['compact-js']);
    jsWatch.on('change', function (e) {
        console.log('File ' + e.path + ' was ' + e.type + ', running compact js ...');
    });
    var cssWatch = gulp.watch('./src/*.css', ['compact-css']);
    jsWatch.on('change', function (e) {
        console.log('File ' + e.path + ' was ' + e.type + ', running compact css ...');
    });
});