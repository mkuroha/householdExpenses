// TODO: htmlごとに関数を分ける
function viewClass() {
  var model = new modelClass(); // モデルのクラス．データの更新や削除を行う
  
  this.createHTML = function(pageName, selector) {
    var html = HtmlService.createTemplateFromFile(pageName);
    if (pageName == "add"){
      html.expenseItems = model.find("項目");
    } else if (pageName == "list") {
      html.expenseItems = model.find("項目");
      html.expenseData = model.findAll();
      html.expectedData = model.find("目標値");
      Logger.log('model.find("目標値"): ' + model.find("目標値"));
    } else {
      html.elementName = selector;
      html.expenseData = model.find(selector);
      html.expectedData = model.getExpectedVal(selector);
    }

    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }
}

function testEachListView() {
  var model = new modelClass();
  var view = new viewClass();

  var tmpHtml = view.createHTML("eachList", "固定費");
}

