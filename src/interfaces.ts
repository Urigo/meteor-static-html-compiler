export interface Results {
  head: string;
  body: string;
  js: string;
  bodyAttrs: Object;
}

export interface Tag {
  tagName: string;
  attribs: any;
  contents: string;
  contentsStartIndex: number;
  tagStartIndex: number;
  fileContents: string;
  sourceName: string;
}
