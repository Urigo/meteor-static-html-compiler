Package.describe({
  name: 'urigo:static-html-compiler',
  version: '1.1.4',
  summary: 'Compiles static HTML templates so you could import them from a module'
});

Npm.depends({
  'cheerio': '0.22.0',
  'html-minifier': '3.5.20',
});

Package.onUse(function(api) {
  const packages = [
    'caching-compiler@1.2.0',
    'ecmascript@0.12.0',
    'babel-compiler@7.2.0',
  ];

  api.versionsFrom('1.8');

  api.use(packages, 'server');
  api.imply(packages, 'server');

  api.mainModule('build/src/index.js', 'server');

  api.export([
    'StaticHtmlCompiler',
  ], 'server');
});
