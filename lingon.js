#!/usr/bin/env node

var lingon = require('lingon');
var livereload = require('lingon-livereload');
var $ = require('gulp-load-plugins')();

lingon.postProcessors.set('scss', function() {
  return [$.sass(), $.autoprefixer()];
});

lingon.postProcessors.set('jade', function() {
  return [$.jade()];
});

lingon.postProcessors.set('js', function() {
  return $.babel();
});

livereload(lingon);
