import * as htmlMinifier from 'html-minifier';

export function minify(html: string): string {
  // Just parse the html to make sure it is correct before minifying
  HTMLTools.parseFragment(html);

  return htmlMinifier.minify(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyCSS: true,
    minifyJS: true,
    processScripts: ['text/template'],
  });
};

export function clean(src: string): string {
  return JSON.stringify(src)
    .replace(/^\"/, '')
    .replace(/\"$/, '');
}
