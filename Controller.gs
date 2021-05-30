// ページにアクセスがあったときに呼び出される
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

// post時に呼び出される．データの更新など
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