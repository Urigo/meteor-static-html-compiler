import {
  isEmpty,
} from 'underscore';

import {
  TemplatingTools,
} from 'meteor/templating-tools';

import {
  minifyHtml,
} from './utils';

import {
  Results,
  Tag,
} from './interfaces';

class Handler {
  private results: Results = {
    head: '',
    body: '',
    js: '',
    bodyAttrs: {},
  };

  private tag: Tag;

  public compileTemplate(id: any, contents: string): string {
    return `module.exports = "${JSON.stringify(contents)}";`;
  }

  public getResults(): Results {
    return this.results;
  }

  public addTagToResults(tag) {
    this.tag = tag;

    // do we have 1 or more attributes?
    const hasAttribs = !isEmpty(this.tag.attribs);

    if (this.tag.tagName === 'head') {
      if (hasAttribs) {
        this.throwCompileError('Attributes on <head> not supported');
      }

      this.results.head += this.tag.contents;
      return;
    }


    // <body> or <template>
    try {
      if (this.tag.tagName === 'body') {
        this.addBodyAttrs(this.tag.attribs);

        // We may be one of many `<body>` tags.
        this.results.body += this.tag.contents;
      } else if (this.tag.tagName === 'template') {
        const contents = minifyHtml(this.tag.contents);

        this.results.js += this.compileTemplate(this.tag.attribs.id, contents);
      } else {
        this.throwCompileError('Expected <head> or <body> tag', this.tag.tagStartIndex);
      }
    } catch (e) {
      if (e.scanner) {
        // The error came from Spacebars
        this.throwCompileError(e.message, this.tag.contentsStartIndex + e.offset);
      } else {
        throw e;
      }
    }
  }

  private addBodyAttrs(attrs) {
    Object.keys(attrs).forEach((attr) => {
      const val = attrs[attr];

      // This check is for conflicting body attributes in the same file;
      // we check across multiple files in caching-html-compiler using the
      // attributes on results.bodyAttrs
      if (this.results.bodyAttrs.hasOwnProperty(attr) && this.results.bodyAttrs[attr] !== val) {
        this.throwCompileError(
          `<body> declarations have conflicting values for the '${attr}' attribute.`);
      }

      this.results.bodyAttrs[attr] = val;
    });
  }

  private throwCompileError(message: string, overrideIndex?: number) {
    TemplatingTools.throwCompileError(this.tag, message, overrideIndex);
  }
}
