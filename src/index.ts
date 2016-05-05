

class Compiler {
  constructor() {
    var handler = new Handler();

    tags.forEach((tag) => {
      handler.addTagToResults(tag);
    });

    return handler.getResults();
  }
}
