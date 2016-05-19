import assign = require('lodash.assign');

export interface FileObject {
  getPackageName(): string;
  getPathInPackage(): string;
  getPackagePrefix(): string;
  getTemplateUrl(): string;
  getTemplateJS(): string;
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
};

export function extend(file: FileObject) {
  assign(file, fileMixin);
}
