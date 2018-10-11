import {
  FileObject,
} from './file';

interface ICachingCompiler{
  _diskCache?: string,
  setDiskCacheDirectory(cacheDir: string);
  processFilesForTarget(files: any);
  compileResultSize(result): number;
  compileOneFile(file): any;
  compileOneFileLater?(file, getResult: () => Promise<any>);
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
