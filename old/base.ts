import {
  CachingCompiler,
} from 'meteor/caching-compiler';

export class BaseCompiler extends CachingCompiler {
  constructor(compilerName) {
    super({
      compilerName,
      defaultCacheSize: 1024 * 1024 * 10,
    });
  }

  public compileResultSize(result) {
    return result.length;
  }

  public getCacheKey(file) {
    return file.getSourceHash();
  }

  public compileOneFile(file) {
    console.log('Compiling HTML template: ' + file.getPathInPackage());
    // Just pass through the file, without any modifications,
    // we do not need to modify it at all at the moment.
    return file.getContentsAsString();
  }
};
