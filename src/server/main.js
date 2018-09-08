/* eslint-disable */

global.baseDir = __dirname;

global.absPath = function(path) {
  return baseDir + path;
}

// Setup global `include` function for absolute file paths for require:
global.include = function(file) {
  return require(absPath('/' + file));
}

require('./server');
