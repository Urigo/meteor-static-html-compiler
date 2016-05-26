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
    let compiled = undefined;

    try {
      compiled = minify(file.getContentsAsString());
    } catch (e) {
      // throw an error only if file does not come from node module
      if (!file.isNodeModule()) {
        throw e;
      }
    }
    return compiled;
  }

  /**
   * @param  {string} contents minified html
   * @return {string}          javascript code
   */
  public compileContents(file, contents) {
    return `module.exports = "${clean(contents)}";`;
  }

  public addCompileResult(file, result: string) {
    const data = this.compileContents(file, result);
    const path = file.getPathInPackage();

    file.addJavaScript({
      data,
      path,
    });
  }
};
