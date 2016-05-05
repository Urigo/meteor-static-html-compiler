import {
  HTMLTools,
} from 'meteor/html-tools';

import htmlMinifier from 'html-minifier';

export function minifyHtml(html: string) {
  HTMLTools.parseFragment(html);

  return htmlMinifier.minify(html, {
    collapseWhitespace : true,
    conservativeCollapse : true,
    minifyCSS : true,
    minifyJS : true,
    processScripts : ['text/template'],
  });
}
