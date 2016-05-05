import {
  BaseCompiler,
} from './base';

import $ from 'cheerio';

export class MainHtmlCompiler extends BaseCompiler {
  constructor() {
    super('main-html-compiler');
  }

  public compileResultSize(result) {
    return result.head.length + result.body.length;
  }

  public compileOneFile(file) {
    console.log('Compiling main app HTML file: ' + file.getPathInPackage());

    const $contents = $(file.getContentsAsString());
    const $head = $contents.closest('head');
    const $body = $contents.closest('body');

    return {
      head: $head.html() || '',
      body: $body.html() || '',
    };
  }

  public addCompileResult(file, result) {
    try {
      file.addHtml({
        data: result.head,
        section: 'head',
      });

      file.addHtml({
        data: result.body,
        section: 'body',
      });
    } catch (e) {}
  }
};
