// TODO: htmlごとに関数を分ける
function viewClass() {
  var model = new modelClass(); // モデルのクラス．データの更新や削除を行う
  
  this.createHTML = function(pageName, param) {
    var html = HtmlService.createTemplateFromFile(pageName);
    if (pageName == "add"){
      html.elements = model.find("項目");
    } 
    else if(pageName == "list")
    {
      html.elements = model.find("項目");
      html.expenseData = model.findAll();
      html.expectedData = model.find("目標値");
    }
    else if(pageName == "edit")
    {
      html.elements = model.find("項目");
      html.expenseData = model.findAll();
      html.expectedData = model.find("目標値");
    }
    else if(pageName == "addElement")
    {
      
    }
    else if(pageName == "editElement")
    {
      html.elementName = param["element"];
      html.expectedValue = param["expectedValue"];
    }
    else
    {
      html.elementName = param;
      html.expenseData = model.find(param);
      html.expectedData = model.getExpectedVal(param);
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

