// ページにアクセスがあったときに呼び出される
function doGet(e){
  var view = new viewClass(); // ビューのクラス．HTMLの作成を行う
  // TODO: URLのパラメータの文字列処理
  var pageName = e.parameter["page"];
  var element = e.parameter["element"];
  Logger.log("element: " + element);

  // HTML 振り分け
  if(pageName == null && element == null){
    return view.createHTML("add", null);
  } else if (pageName == "list" && element == null){
    return view.createHTML("list", null);
  } else if (pageName == null && element != null){
    return view.createHTML("eachList", element);
  }
}

// post時に呼び出される．データの更新など
function doPost(postdata){
  var model = new modelClass(); // モデルのクラス．データの更新や削除を行う
  var view = new viewClass(); // ビューのクラス．HTMLの作成を行う

  // フォームからの返り値を引数として postdata で受け取る
  var element = postdata.parameter.element;
  var expense = postdata.parameter.expense; // 用途
  var value = postdata.parameter.value; // 金額
  
  // スプレッドシートにデータを追加
  if (expense=="" || value=="" || isNaN(Number(value))) {
  }else if(Number.isInteger(value)){
  }else{
    logDate = createLogDate();
    var arr = {"element": element, "expense": expense, "value": value};
    model.insertData(arr);
  }

  return view.createHTML("list", null);
}









