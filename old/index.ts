import {
  MainHtmlCompiler,
} from './main';

import {
  TemplateHtmlCompiler,
} from './template';

import $ from 'cheerio';

export class HtmlCompiler {
  private mainHtmlCompiler: MainHtmlCompiler;
  private templateHtmlCompiler: TemplateHtmlCompiler;

  constructor() {
    this.mainHtmlCompiler = new MainHtmlCompiler;
    this.templateHtmlCompiler = new TemplateHtmlCompiler;
  }

  public processFilesForTarget(files) {
    const mainFiles: any[] = [];
    const templateFiles: any[] = [];

    files.forEach((file) => {
      const $contents = $(file.getContentsAsString());
      const isMain = $contents.closest('head,body').length;
      const isTemplate = $contents.closest(':not(head,body)').length;

      if (isMain && isTemplate) {
        const fileName = file.getBasename();
        const errorMsg = `${fileName} has wrong layout`;
        throw Error(errorMsg);
      }

      if (isMain > 0) {
        mainFiles.push(file);
      } else {
        templateFiles.push(file);
      }
    });

    // Use each compiler with it's files and compile them
    this.mainHtmlCompiler.processFilesForTarget(mainFiles);
    this.templateHtmlCompiler.processFilesForTarget(templateFiles);
  }
}
