export interface IBaseHtmlCompiler {
  processFilesForTarget(files: any);
  compileResultSize(result): number;
  compileOneFile(file): any;
  addCompileResult(file, result);
}

export class BaseHtmlCompiler extends CachingCompiler {
  constructor(compilerName) {
    super({
      compilerName,
      defaultCacheSize: 1024 * 1024 * 10,
    });
  }

  public getCacheKey(file): string {
    return file.getSourceHash();
  }

  public processFilesForTarget(files) {
    super.processFilesForTarget(files);
  }
};
