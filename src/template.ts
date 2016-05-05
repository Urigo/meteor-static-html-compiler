import {
  BaseHtmlCompiler,
  IBaseHtmlCompiler,
} from './base';

import {
  minify,
  clean,
} from './utils';

export interface ITemplateHtmlCompiler extends IBaseHtmlCompiler {
  compileContents(file: any, contents: string): string;
}

export class TemplateHtmlCompiler extends BaseHtmlCompiler implements ITemplateHtmlCompiler {
  constructor() {
    super('template-static-html-compiler');
  }

  public compileResultSize(result): number {
    return result.length;
  }

  public compileOneFile(file): string {
    return minify(file.getContentsAsString());
  }

  /**
   * @param  {string} contents minified html
   * @return {string}          javascript code
   */
  public compileContents(file, contents) {
    return `module.exports = "${clean(contents)}";`;
  }

  public addCompileResult(file, result: string) {
    file.addJavaScript({
      data: this.compileContents(file, result),
      path: file.getPathInPackage(),
    });
  }
};
