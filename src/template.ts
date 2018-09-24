import {
  BaseHtmlCompiler,
  IBaseHtmlCompiler,
} from './base';

import {
  FileObject,
} from './file';

import {
  minify,
  clean,
} from './utils';

export interface ITemplateHtmlCompiler extends IBaseHtmlCompiler {
  compileContents(file: any, contents: string): string;
}

const babelOptions = Babel.getDefaultOptions();
babelOptions.sourceMap = false;
babelOptions.ast = false;

export class TemplateHtmlCompiler extends BaseHtmlCompiler implements ITemplateHtmlCompiler {
  constructor() {
    super('template-static-html-compiler');
  }

  public compileResultSize(result): number {
    return result.length;
  }

  public compileOneFile(file: FileObject): string {
    if (Meteor.isDevelopment) {
      return file.getContentsAsString();
    }

    try {
      // Minify for the prod.
      return minify(file.getContentsAsString());
    } catch (e) {
      // throw an error only if file does not come from node module
      if (!file.isNodeModule()) {
        throw e;
      }
    }
  }

  /**
   * @param  {string} contents minified html
   * @return {string}          javascript code
   */
  public compileContents(file: FileObject, contents) {
    return Babel
      .compile(`export default "${clean(contents)}";`, babelOptions)
      .code;
  }

  public addCompileResult(file: FileObject, result: string) {
    const data = this.compileContents(file, result);
    const path = file.getPathInPackage();

    // JS-modules for imports like:
    //   import content from '/path.html';

    file.addJavaScript({
      data,
      path,
      lazy: true,
    });
  }
};
