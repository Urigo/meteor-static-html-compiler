import {
  FileObject,
} from './file';

interface ICachingCompiler{
  setDiskCacheDirectory(cacheDir: string);
  processFilesForTarget(files: any);
  compileResultSize(result): number;
  compileOneFile(file): any;
  addCompileResult(file, result);
}

export interface IBaseHtmlCompiler extends ICachingCompiler{}

export class BaseHtmlCompiler extends CachingCompiler {
  constructor(compilerName) {
    super({
      compilerName,
      defaultCacheSize: 1024 * 1024 * 10,
    });
  }

  public getCacheKey(file: FileObject): string {
    return file.getSourceHash();
  }

  public processFilesForTarget(files: FileObject[]) {
    super.processFilesForTarget(files);
  }
};
