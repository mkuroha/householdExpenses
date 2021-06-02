// ページにアクセスがあったときに呼び出される
function doGet(e){
  var model = new modelClass(); // モデルのクラス．データの更新や削除を行う
  var view = new viewClass(); // ビューのクラス．HTMLの作成を行う
  var pageName = e.parameter["p"];
  var todayYearMonth = getYearAndMonthOfToday();

  // HTML 振り分け
  if(pageName == null){ // POST後
    return view.createHTML("add", model.getData());
  } else if (pageName == "list"){
    return view.createHTML("list", model.getData());
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
  // javascriptでフォーム入力のバリデーション
  // https://qiita.com/tamtam0847/items/8b79754bb10fe58a01a3
  if (expense=="" || value=="" || isNaN(Number(value))) {
    ;
  }else if(Number.isInteger(value)){
    ;
  }else{
    logDate = createLogDate();
    var arr = {"element": element, "expense": expense, "value": value};
    model.insertData(arr);
  }

  // ページの表示
  return view.createHTML("list", model.getData(getYearAndMonthOfToday()));
}


