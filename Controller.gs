// ページにアクセスがあったときに呼び出される
function doGet(e){
  var view = new viewClass(); // ビューのクラス．HTMLの作成を行う
  var pageName = e.parameter.page;

  // HTML 振り分け
  if(pageName == null){
    return view.createHTML("add", null);
  } else if (pageName == "list"){
    return view.createHTML("list", null);
  } else {
    return view.createHTML("eachList", pageName);
  }
}

// post時に呼び出される．データの更新など
function doPost(postData){
  var model = new modelClass(); // モデルのクラス．データの更新や削除を行う
  var view = new viewClass(); // ビューのクラス．HTMLの作成を行う

  var functionType = postData.parameter.functionType;
  // 処理振り分け
  if (functionType == "insert") {
    // スプレッドシートにデータを追加
    var element = postData.parameter.element;
    var expense = postData.parameter.expense; // 用途
    var value = postData.parameter.value; // 金額  
    var arr = {"element": element, "expense": expense, "value": value};
    
    model.insertExpenseData(arr);
    return view.createHTML("list", null);

  } else if (functionType == "edit") {

  
  } else if (functionType == "remove") {
    var element = postData.parameter.element;
    var expenseIndex = postData.parameter.expenseIndex
    var arr = {"element": element, "expenseIndex": expenseIndex};
    
    model.removeExpenseData(arr);
    return view.createHTML("eachList", element);
  
  } else if (functionType == "removeElement") {    
    model.removeElement(postData.parameter.element);
    return view.createHTML("list", null);
  
  } else {
    return view.createHTML("add", null);
  }
}









