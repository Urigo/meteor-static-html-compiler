# meteor-static-html-compiler

A tool that allows you to compile static HTML templates so you could import them from a module.

## Installation

```bash
meteor add static-html-compiler
```

If you are looking for a package with a working implementation of this tool you should check [`static-templates`](https://github.com/Urigo/meteor-static-templates).

## Usage

```js
import {
  MainHtmlCompiler, // body, head
  TemplateHtmlCompiler, // templates
  StaticHtmlCompiler,
  utils,
} from 'meteor/static-html-compiler';

class TemplateCacheCompiler extends TemplateHtmlCompiler {
  compileContents(file, contents) {
    const template = utils.clean(contents);
    return `module.exports = "${template}"`;
  }
}

Plugin.registerCompiler({
  extensions: ['html']
}, () => new StaticHtmlCompiler(new MainHtmlCompiler, new TemplateCacheCompiler));

```

## API

### StaticHtmlCompiler

Compiles a html file to a string by default

##### constructor(MainHtmlCompiler?, TemplateHtmlCompiler?)

It is possible to change the way `StaticHtmlCompiler` works by providing custom `MainHtmlCompiler` and `TemplateHtmlCompiler`.


### MainHtmlCompiler

Handles files that contain `<head/>` or `<body/>` tag.

### TemplateHtmlCompiler

Handles files that do not contain `<head/>` and `<body/>` tags.

##### compileContents(file, contents: string): string

Returns contents of a ES6 module that will be later compiled from a string to JavaScript code.

### utils

##### clean (html: string): string

Cleans up HTML.

##### minify (html: string): string

Minifies HTML.
