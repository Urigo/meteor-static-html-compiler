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
babelOptions.sourceMaps = false;
babelOptions.ast = false;

export class TemplateHtmlCompiler extends BaseHtmlCompiler implements ITemplateHtmlCompiler {
  constructor() {
    super('template-static-html-compiler');
  }

  public compileResultSize(result): number {
    return result.length;
  }

  public compileOneFileLater(file: FileObject, getResult) {
    const path = file.getPathInPackage();
    file.addJavaScript({
      path,
    }, async () => {
      const data = await getResult();
      return {
        data,
      };
    });
  }

  public compileOneFile(file: FileObject): string {
    let contents: string;

    if (Meteor.isDevelopment) {
      contents = file.getContentsAsString();
    } else {
      try {
        // Minify for the prod.
        contents = minify(file.getContentsAsString());
      } catch (e) {
        // throw an error only if file does not come from node module
        if (!file.isNodeModule()) {
          throw e;
        }
      }
    }

    return this.compileContents(file, contents);
  }

  /**
   * @param  {string} contents minified html
   * @return {string}          javascript code
   */
  public compileContents(file: FileObject, contents): string {
    return Babel
      .compile(`export default "${clean(contents)}";`, babelOptions, {
        cacheDirectory: this._diskCache,
        cacheDeps: {
          sourceHash: this.getCacheKey(file),
        },
      })
      .code;
  }

  public addCompileResult(file: FileObject, data: string) {
    const path = file.getPathInPackage();

    // JS-modules for imports like:
    //   import content from '/path.html';

    file.addJavaScript({
      data,
      path: file.getPathInPackage(),
      lazy: true,
    });
  }
};
