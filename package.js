Package.describe({
  name: 'urigo:static-html-compiler',
  version: '0.0.1',
  summary: 'Compiles static HTML templates so you could import them from a module'
});

Npm.depends({
  'cheerio': '0.20.0',
  'html-minifier': '2.1.2',
  'lodash.assign': '4.0.8'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.3');

  var packages = [
    'caching-compiler@1.0.0',
    'html-tools@1.0.5',
    'ecmascript@0.1.6'
  ];

  api.use(packages, 'server');
  api.imply(packages, 'server');

  api.mainModule('build/src/index.js', 'server');

  api.export([
    'StaticHtmlCompiler'
  ], 'server');
});
