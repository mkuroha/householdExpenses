// TODO: htmlごとに関数を分ける
function viewClass() {
  var model = new modelClass(); // モデルのクラス．データの更新や削除を行う

  this.createAddHtml = function() {
    var html = HtmlService.createTemplateFromFile("add");
    html.elements = model.find("項目");
    
    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }
  
  this.createListHtml = function(){
    var html = HtmlService.createTemplateFromFile("list");
    html.elements = model.find("項目");
    html.expenseData = model.findAll();
    html.expectedData = model.find("目標値");
    
    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }

  this.createEditHtml = function() {
    var html = HtmlService.createTemplateFromFile("edit");
    html.elements = model.find("項目");
    html.expenseData = model.findAll();
    html.expectedData = model.find("目標値");
    
    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }

  this.createAddElementHtml = function() {
    var html = HtmlService.createTemplateFromFile("addElement");
    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }

  this.createEditElementHtml = function(params) {
    var html = HtmlService.createTemplateFromFile("editElement");

    html.elementName = params["element"];
    html.expectedValue = params["expectedValue"];

    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }

  this.createEachElementHtml = function(element) {
    var html = HtmlService.createTemplateFromFile("editElement");

    html.elementName = element;
    html.expenseData = model.find(element);
    html.expectedData = model.getExpectedVal(element);

    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }
}

// テスト

