var START_COLUMN = 5; // データを追加するスプレッドシートの領域

function modelClass() {
  // スプレッドシート準備
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var getYearMonth = getYearAndMonthOfToday()
  var sheet = spreadsheet.getSheetByName(getYearMonth);

  // シートが無かったら新たに作成する
  if (sheet == null){
      spreadsheet.insertSheet(getYearMonth);  // sheet作成
      sheet = spreadsheet.getSheetByName(getYearMonth);
    }
  
  this.getData = function() {
    return sheet.getDataRange().getValues();
  }

  // TODO: 修正必要
  // var arr = {"element": element, "expense": expense, "value": value};
  this.insertData = function(data) {
    // sheet.appendRow(data);
    var exData = sheet.getDataRange().getValues();

    // 出費費用のインデックスを特定
    var addColumnIdx = 0;
    for (var j=START_COLUMN; j < exData[0].length; j++) {
      if (exData[0][j] == data["element"]) {
        addColumnIdx = j;
        break;
      }
    }

    // addColumnIdxの列の，最初の空のところにデータを追加
    for (var i=0; i < exData.length; i++) {
      if (exData[i][addColumnIdx] == ""){
        exData[i][addColumnIdx-1] = data["expense"];
        exData[i][addColumnIdx] = data["value"];
        break;
      }
    }

    // 追加データをシートに反映
    var startRow = 1;
    var startColumn = 1;
    var numOfRow = exData.length;
    var numOfColumn = exData[0].length;
    sheet.getRange( startRow, startColumn, numOfRow, numOfColumn ).setValues(exData);
  }
}

function testFunction(){
  var test = new model();
  test.getData(getYearAndMonthOfToday());
}

function insertTest() {
  var model = new modelClass();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(getYearAndMonthOfToday());
  var exData = sheet.getDataRange().getValues();

  var arr = {"element": "日用品費", "expense": "シャンプー", "value": 100}
  model.insertData(arr)
}











