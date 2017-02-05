import * as htmlMinifier from 'html-minifier';

export function minify(html: string): string {
  let settings = typeof arguments[1] === 'object'? arguments[1] : {
    caseSensitive: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyCSS: true,
    minifyJS: true,
    processScripts: ['text/template'],
  };
  return htmlMinifier.minify(html, settings);
};

export function clean(src: string): string {
  return JSON.stringify(src)
    .replace(/^\"/, '')
    .replace(/\"$/, '');
}
