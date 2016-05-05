/// <reference path="../typings/main.d.ts" />

import {
  IBaseHtmlCompiler,
} from './base';

import {
  MainHtmlCompiler,
} from './main';

import {
  TemplateHtmlCompiler,
  ITemplateHtmlCompiler,
} from './template';

import * as utils from './utils';

import * as $ from 'cheerio';

export {
  MainHtmlCompiler,
  TemplateHtmlCompiler,
  ITemplateHtmlCompiler,
  utils,
};

export class StaticHtmlCompiler {
  private mainHtmlCompiler: IBaseHtmlCompiler;
  private templateHtmlCompiler: ITemplateHtmlCompiler;

  constructor(
    mainHtmlCompiler: IBaseHtmlCompiler,
    templateHtmlCompiler: ITemplateHtmlCompiler
  ) {
    this.mainHtmlCompiler = mainHtmlCompiler || new MainHtmlCompiler;
    this.templateHtmlCompiler = templateHtmlCompiler || new TemplateHtmlCompiler;
  }

  public processFilesForTarget(files) {
    const mainFiles: any[] = [];
    const templateFiles: any[] = [];

    files.forEach((file) => {
      // skips files from node_modules
      if (!!file.getPathInPackage().startsWith('node_modules')) {
        return;
      }

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
