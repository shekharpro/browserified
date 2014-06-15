process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TMPDIR = './' || '/tmp';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat'),
  clean = require('gulp-clean'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer');

// Modules for webserver and livereload
var embedlr = require('gulp-embedlr'),
  refresh = require('gulp-livereload'),
  lrserver = require('tiny-lr')(),
  express = require('express'),
  livereloadport = 35729,
  livereload = require('connect-livereload'),
  config = require('./server/config/env/' + process.env.NODE_ENV),
  serverport = process.env.PORT || 5000;


  var peopleService = require('./app/scripts/services/PeopleService')();

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({
  port: livereloadport
}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/', function(req, res) {
  res.sendfile('index.html', {
    root: 'dist'
  });
});

// call Angular service to fetch people JSON
server.get('/people', function(req, res) {
  res.json(peopleService.getPeopleDetails());
});

// // Express settings
// require('./server/config/express')(server);

// // Routing
// require('./server/routes')(server);

// Dev task
gulp.task('dev', ['views', 'styles', 'lint', 'browserify'], function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('watch');
});
// gulp.task('dev', ['views', 'styles', 'lint', 'browserify'], function() {
//     // Start webserver

//     // In the if condition the the environment will be checked and server will start accordingly
//     // Start server

//     // if ((process.env.NODE_ENV !== 'test') && (process.env.NODE_ENV !== 'development')) {
//         server.listen(serverport, function() {
//             console.log('Express server listening on port %d in %s mode', config.port, server.get('env'));

//         // });
//     }
//     // Start live reload
//     lrserver.listen(livereloadport);
//     // Run the watch task, to keep taps on changes
//     gulp.run('watch');
// });

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({
    onError: function(e) {
      console.log(e);
    }
  }))
  // Optionally add autoprefixer
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  // These last two should look familiar now :)
  .pipe(gulp.dest('dist/css/'))
    .pipe(refresh(lrserver));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['app/scripts/main.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'))
    .pipe(refresh(lrserver));

  // Any other view files from app/views
  gulp.src('app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
    .pipe(refresh(lrserver));
});

gulp.task('watch', ['lint'], function() {
  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], [
    'lint',
    'browserify'
  ]);
  // Watch our sass files
  gulp.watch(['app/styles/**/*.scss'], [
    'styles'
  ]);

  gulp.watch(['app/**/*.html'], [
    'views'
  ]);
});
