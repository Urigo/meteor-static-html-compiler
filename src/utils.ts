import * as htmlMinifier from 'html-minifier';

export function minify(html: string): string {
  return htmlMinifier.minify(html, {
    caseSensitive: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyCSS: true,
    minifyJS: true,
    processScripts: ['text/template'],
    removeComments: true,
  });
};

export function clean(src: string): string {
  return JSON.stringify(src)
    .replace(/^\"/, '')
    .replace(/\"$/, '');
}
