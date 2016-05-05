import {
  BaseCompiler,
} from './base';

export class TemplateHtmlCompiler extends BaseCompiler {
  constructor() {
    super('template-html-compiler');
  }

  public compileResultSize(result) {
    return result.length;
  }

  public compileOneFile(file) {
    console.log('Compiling HTML template: ' + file.getPathInPackage());

    // Just pass through the file, without any modifications,
    // we do not need to modify it at all at the moment.
    return file.getContentsAsString();
  }

  public addCompileResult(file, result) {
    file.addAsset({
      data: result,
      path: file.getPathInPackage()
    });
  }
};
