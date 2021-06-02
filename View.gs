function viewClass() {
  this.createHTML = function(pageName, data) {
    var html = HtmlService.createTemplateFromFile(pageName);
    html.data = data
    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1"); // view
    return html;
  }
}
