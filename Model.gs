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

  this.findAll = function() {
    var allData = sheet.getDataRange().getValues();
    var _ = Underscore.load();
    var allDataTrans = _.zip.apply(_, allData);

    var output = {};
    for (var i = 0; i < allDataTrans.length; i++) {
      if (allDataTrans[i][0] == "要素" ){
        output[ allDataTrans[i+1][0] ] = [];
        for (var j = 1; j < allDataTrans[i].length; j++){
          if ( allDataTrans[i+1][j] != "" ) {
            output[ allDataTrans[i+1][0] ].push( allDataTrans[i+1][j] );
          }
        }
      }
    }
    return output;
  }

  // TODO: 一部関数化
  this.find = function(selector) {
    // 検索項目のインデックス取得
    var allData = sheet.getDataRange().getValues();
    var index = allData[0].indexOf(selector);

    // データ転置
    var _ = Underscore.load();
    var allDataTrans = _.zip.apply(_, allData);

    var findArr = [];  // 出力配列
    if (selector == "項目" || selector == "目標値"){
      for (var i = 1; i < allDataTrans[index].length; i++){
        if (allDataTrans[index][i] != ""){
          findArr.push(allDataTrans[index][i]);
        }
      }
      return findArr;
    } else {
      for (var i = 1; i < allDataTrans[index].length; i++){
        if (allDataTrans[index][i] == ""){
          ;
        } else {
          findArr.push([ allDataTrans[index-1][i], allDataTrans[index][i] ]);
        }
      }
    }
    return findArr;
  }

  this.insertData = function(data) {
    // data: {"element": element, "expense": expense, "value": value}
    var exData = sheet.getDataRange().getValues();

    // 出費費用のインデックスを特定
    var addColumnIdx = 0;
    for (var j = START_COLUMN; j < exData[0].length; j++) {
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

function tmpFunction() {
  var model = new modelClass();
  var arr3 = model.find("目標値");
  Logger.log(arr3);
}

function modelFindAllTest() {
  var model = new modelClass();
  var arr = model.findAll();
  Logger.log(arr);
}

function modelFindWithSelectorTest() {
  var model = new modelClass();
  // var arr = model.find("日用品費");
  var arr2 = model.find("目標値");
  Logger.log(arr2);
}

function modelInsertTest() {
  var model = new modelClass();
  var arr = {"element": "日用品費", "expense": "シャンプー", "value": 100}
  model.insertData(arr)
}











