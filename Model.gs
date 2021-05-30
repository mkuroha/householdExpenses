function Model() {
  this.getData = function(getYearMonth) {
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
}

function testFunction(){
  var test = new Model();
  test.getData(getYearAndMonthOfToday());
}