Package.describe({
  name: 'urigo:static-html-compiler',
  version: '1.1.0',
  summary: 'Compiles static HTML templates so you could import them from a module'
});

Npm.depends({
  'cheerio': '0.22.0',
  'html-minifier': '3.5.20',
});

Package.onUse(function(api) {
  const packages = [
    'caching-compiler@1.1.12',
    'ecmascript@0.11.1',
    'babel-compiler@7.1.1',
  ];

  api.use(packages, 'server');
  api.imply(packages, 'server');

  api.mainModule('build/src/index.js', 'server');

  api.export([
    'StaticHtmlCompiler',
  ], 'server');
});
