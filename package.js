Package.describe({
  name: 'static-html-templates',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');

  api.use([
    'caching-compiler',
    'ecmascript'
  ]);

  api.mainModule('build/src/index.js', 'server');
});
