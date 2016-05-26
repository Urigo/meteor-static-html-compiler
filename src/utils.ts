import * as htmlMinifier from 'html-minifier';

export function minify(html: string): string {
  return htmlMinifier.minify(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyCSS: true,
    minifyJS: true,
    processScripts: ['text/template'],
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
    customAttrAssign: [ /\)?\]?=/ ],
  });
};

export function clean(src: string): string {
  return JSON.stringify(src)
    .replace(/^\"/, '')
    .replace(/\"$/, '');
}
