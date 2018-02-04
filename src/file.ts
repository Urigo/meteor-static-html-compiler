
export interface FileObject {
  getContentsAsString(): string;
  getBasename(): string;
  getPackageName(): string;
  getPathInPackage(): string;
  getPackagePrefix(): string;
  getTemplateUrl(): string;
  getTemplateJS(): string;
  getSourceHash(): string;
  isNodeModule(): boolean;
  addHtml(options: any);
  addJavaScript(options: any);
}

const fileMixin = {
  /**
   * @return {string} package prefix or empty string
   */
  getPackagePrefix: function(): string {
    const packageName = this.getPackageName();
    return packageName ? `packages/${packageName}/` : '';
  },
  /**
   * @return {string} absolute templateUrl
   */
  getTemplateUrl: function(): string {
    return this.getPackagePrefix() + this.getPathInPackage();
  },
  /**
   * @return {string} absolute temlateUrl extended by js extension
   */
  getTemplateJS: function(): string {
    return `${this.getTemplateUrl()}.js`;
  },
  /**
   * @return {boolean} checks if file comes from node module
   */
  isNodeModule: function(): boolean {
    return !!this.getPathInPackage().startsWith('node_modules');
  },
};

export function extend(file: FileObject) {
  Object.assign(file, fileMixin);
}
