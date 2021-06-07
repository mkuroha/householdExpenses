// ページにアクセスがあったときに呼び出される
function doGet(e){
  var view = new viewClass(); // ビューのクラス．HTMLの作成を行う
  var pageName = e.parameter.page;

  // HTML 振り分け
  if(pageName == null){
    return view.createHTML("add", null);
  }
  else if(pageName == "list")
  {
    return view.createHTML("list", null);
  }
  else if (pageName == "edit")
  {
    return view.createHTML("edit", null);
  }
  else if (pageName == "addElement")
  {
    return view.createHTML("addElement", null);
  }
  else if (pageName == "editElement")
  {
    return view.createHTML("editElement", null);
  }
  else
  {
    return view.createHTML("eachList", pageName);
  }
}

// post時に呼び出される．データの更新など
function doPost(postData){
  var model = new modelClass(); // モデルのクラス．データの更新や削除を行う
  var view = new viewClass(); // ビューのクラス．HTMLの作成を行う
  var functionType = postData.parameter.functionType;

  // 処理振り分け
  if (functionType == "insert") 
  {
    // スプレッドシートにデータを追加
    var element = postData.parameter.element;
    var expense = postData.parameter.expense; // 用途
    var value = postData.parameter.value; // 金額  
    var arr = {"element": element, "expense": expense, "value": value};
    
    model.insertExpenseData(arr);
    return view.createHTML("list", null);
  }
  else if (functionType == "transitEditElement")
  {
    var element = postData.parameter.element;  // 出費項目
    var expectedValue = postData.parameter.expectedValue; // 最大許容額
    var params = {"element": element, "expectedValue": expectedValue};
    return view.createHTML("editElement", params);
  }
  else if (functionType == "edit")
  {
    // TODO: 値に変更がなかったらmodelを呼び出さないようにするべき？
    var oldElement = postData.parameter.oldElement;
    var element = postData.parameter.element;
    var expectedValue = postData.parameter.expectedValue; // 最大許容額
    var arr = {"oldElement": oldElement, "element": element, "expectedValue": expectedValue};
    model.updateElement(arr);  // 更新

    return view.createHTML("list", null);
  }
  else if (functionType == "remove")
  {
    var element = postData.parameter.element;
    var expenseIndex = postData.parameter.expenseIndex
    var arr = {"element": element, "expenseIndex": expenseIndex};
    
    model.removeExpenseData(arr);
    return view.createHTML("eachList", element);
  }
  else if (functionType == "insertElement")
  {
    // parameter s とすることで，配列で複数の値を取得できる
    var elements = postData.parameters.element;
    var expectedValues = postData.parameters.expectedValue;
    var arr = {"elements": elements, "expectedValues": expectedValues};
    
    model.insertElement(arr); // model呼び出し

    return view.createHTML("list", null);
  }
  else if (functionType == "removeElement")
  {
    model.removeElement(postData.parameter.element);
    return view.createHTML("list", null);
  }
  else
  {
    return view.createHTML("add", null);
  }
}









