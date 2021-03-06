const funnel = require('broccoli-funnel');
const concat = require('broccoli-concat');
const mergeTrees = require('broccoli-merge-trees');
const babel = require('broccoli-babel-transpiler');
const pkg = require('./package.json');
const injectLivereload = require('broccoli-inject-livereload');

// const src = injectLivereload('src');
const src = 'src';
const pub = 'public';

const js = babel(src, {
  stage: 0,
  moduleIds: true,
  modules: 'amd',

  // Transforms /index.js files to use their containing directory name
  getModuleId: function (name) {
    name = pkg.name + '/' + name;
    return name.replace(/\/index$/, '');
  },

  // Fix relative imports inside /index's
  resolveModuleSource: function (source, filename) {
    var match = filename.match(/(.+)\/index\.\S+$/i);

    // is this an import inside an /index file?
    if (match) {
      var path = match[1];
      return source
        .replace(/^\.\//, path + '/')
        .replace(/^\.\.\//, '');
    } else {
      return source;
    }
  }
});

// const babelCorePath = 'node_modules/babel/node_modules/babel-core';
// const polyfill = funnel(babelCorePath, {
//   files: ['browser-polyfill.js']
// });
//
// js = mergeTrees([polyfill, js]);

const app = concat(js, {
  inputFiles: [
    // 'browser-polyfill.js',
    '**/*.js'
  ],
  outputFile: '/' + pkg.name + '.js'
});

const assets = funnel(pub, {
  destDir: '.'
})

module.exports = mergeTrees([app, assets]);
