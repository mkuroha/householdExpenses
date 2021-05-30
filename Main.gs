function doGet(e){
  var page = e.parameter["p"];

  var todayYearMonth = getTodayYearAndMonth();
  if(page == "index" || page==null){
    var html = HtmlService.createTemplateFromFile("index");
    html.data = getSpreadSheetData(todayYearMonth);
    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }else{
    var html = HtmlService.createHtmlOutputFromFile(page);
    html.data = getSpreadSheetData(todayYearMonth);
    html = html.evaluate();
    html.addMetaTag("viewport", "width=device-width, initial-scale=1");
    return html;
  }
}

function getTodayYearAndMonth(){
  var today = new Date();
  var todayYear = today.getFullYear().toString();
  var todayMonth = today.getMonth() + 1;
  if (todayMonth.toString().length == 1){
    todayMonth = "0" + todayMonth;
  }
  return todayYear + todayMonth;
}

function getYearAndLastMonth(){
  var today = new Date();
  today.setMonth(today.getMonth() - 1);
  var todayLastYear = today.getFullYear().toString();
  var todayLastMonth = today.getMonth() + 1;
  if (todayLastMonth.toString().length == 1){
    todayLastMonth = "0" + todayLastMonth;
  }
  return todayLastYear + todayLastMonth;
}

function getSpreadSheetData(getYearMonth) {
  // var today = new Date();
  // var todayYear = today.getFullYear().toString();
  // var todayMonth = today.getMonth() + 1;
  // if (todayMonth.toString().length == 1){
  //   todayMonth = "0" + todayMonth
  // }
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();  // アクティブな"スプレッドシート"を取得
  var sheet = spreadsheet.getSheetByName(getYearMonth);
  if (sheet == null){  // シートが無かったら作成する
    spreadsheet.insertSheet(getYearMonth);  // sheet作成
    sheet = spreadsheet.getSheetByName(getYearMonth);
  }
  var range = sheet.getDataRange();
  var result = range.getValues();  // 2次元配列でスプレッドシート内のデータを全て取得する
  return result;
}

function doPost(postdata){
  // <input type="submit">がクリックされたときに実行される関数
  // フォームからの返り値を引数としてpostdataで受け取る
  var expense = postdata.parameter.expense;
  var val = postdata.parameter.val;

  var today = new Date();
  var todayYear = today.getFullYear().toString();
  var todayMonth = today.getMonth() + 1;
  if (todayMonth.toString().length == 1){
    todayMonth = "0" + todayMonth
  }
  var todayDate = today.getDate();
  if (todayDate.toString().length == 1){
    todayDate = "0" + todayDate;
  }
  logDate = todayYear + "-" + todayMonth + "-" + todayDate;

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(todayYear+todayMonth);
  if (expense=="" || val=="" || isNaN(Number(val))) {
    ;
  }else if(Number.isInteger(val)){
    ;
  }else{
    sheet.appendRow([logDate, expense, val]);
  }

  // ページの表示
  var html = HtmlService.createTemplateFromFile("index");
  html.data = getSpreadSheetData(todayYear + todayMonth);
  html = html.evaluate();
  html.addMetaTag("viewport", "width=device-width, initial-scale=1");
  return html;
}

function calcSum(dat){
  var expenseSum = 0;
  if (dat[0] != ""){
    for (i=0;i<dat.length;i++){
      expenseSum += dat[i][2];
    }
  }
  return expenseSum;
}

function include(filename){
  // htmlの内容を文字列で取得する．css.htmlを取得して反映させる．
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function myFunction() {
  
}

// テスト関数  ////////////////////////////////////////////////////////////////////////////////




