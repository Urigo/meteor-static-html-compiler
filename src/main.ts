import {
  BaseHtmlCompiler,
  IBaseHtmlCompiler,
} from './base';

import {
  FileObject,
} from './file';

import * as $ from 'cheerio';

export interface Section {
  contents: string;
  attrs?: Object;
}

export interface CompileResult {
  head: Section;
  body: Section;
}

export class MainHtmlCompiler extends BaseHtmlCompiler implements IBaseHtmlCompiler {
  constructor() {
    super('main-static-html-compiler');
  }

  public compileResultSize(result): number {
    return result.head.length + result.body.length;
  }

  public compileOneFile(file: FileObject): CompileResult {
    const $contents = $(file.getContentsAsString());
    const $head = $contents.closest('head');
    const $body = $contents.closest('body');

    return {
      head: {
        contents: $head.html() || '',
      },
      body: {
        contents: $body.html() || '',
        attrs: $body[0] ? $body[0].attribs : undefined,
      },
    };
  }

  public addCompileResult(file: FileObject, result: CompileResult) {
    try {
      file.addHtml({
        data: result.head.contents,
        section: 'head',
      });

      file.addHtml({
        data: result.body.contents,
        section: 'body',
      });

      if (result.body.attrs) {
        file.addJavaScript({
          path: file.getTemplateJS(),
          data: `
            Meteor.startup(function() {
              var attrs = ${JSON.stringify(result.body.attrs)};
              for (var prop in attrs) {
                document.body.setAttribute(prop, attrs[prop]);
              }
            });
          `,
        });
      }
    } catch (e) {
      //
    }
  }
};
