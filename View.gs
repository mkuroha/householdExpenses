function View() {
  this.createHTML = function() {

  }

  this.include = function(filename) {
    // htmlの内容を文字列で取得する．css.htmlを取得して反映させる．
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
  }
}
