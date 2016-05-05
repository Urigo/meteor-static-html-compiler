import {
  BaseHtmlCompiler,
  IBaseHtmlCompiler,
} from './base';

import * as $ from 'cheerio';

export interface CompileResult {
  head: string;
  body: string;
}

export class MainHtmlCompiler extends BaseHtmlCompiler implements IBaseHtmlCompiler {
  constructor() {
    super('main-static-html-compiler');
  }

  public compileResultSize(result): number {
    return result.head.length + result.body.length;
  }

  public compileOneFile(file): CompileResult {
    const $contents = $(file.getContentsAsString());
    const $head = $contents.closest('head');
    const $body = $contents.closest('body');

    return {
      head: $head.html() || '',
      body: $body.html() || '',
    };
  }

  public addCompileResult(file, result: CompileResult) {
    try {
      file.addHtml({
        data: result.head,
        section: 'head',
      });

      file.addHtml({
        data: result.body,
        section: 'body',
      });
    } catch (e) {
      //
    }
  }
};
