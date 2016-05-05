// from meteor/caching-compiler
declare class CachingCompiler {
  constructor(options: Object);
  public processFilesForTarget(file: any): any;
}

// from meteor/html-tools
interface IHTMLTools {
  parseFragment(src: string): string;
}
declare const HTMLTools: IHTMLTools;

declare module 'lodash.assign' {
  import main = require('lodash');
  export = main.assign;
}
