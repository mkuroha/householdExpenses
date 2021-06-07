var ELEMENT_COLUMN = 0;
var EXPECTED_DATA_COLUMN = 3;
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // データ処理関数群

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

  this.getExpectedVal = function(element) {
    // 目標値1件取得メソッド
    var elements = this.find("項目");
    var expectedData = this.find("目標値");

    var index = elements.indexOf(element);
    return expectedData[index];
  }

  this.insertExpenseData = function(data) {
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

  this.getElementRow = function(element) {
    var elementData = this.find("項目");
    return elementData.indexOf(element);
  }

  this.getElementColumn = function(element) {
    // 出費項目が何列目か（"要素"の列）を返す
    var allData = sheet.getDataRange().getValues();
    return allData[0].indexOf(element)-1;
  }

  this.removeExpenseData = function(data) {
    // data: {"element": 食費, "expenseIndex": 1}
    var expenseData = this.find(data["element"]);
    var startColumn = this.getElementColumn(data["element"]);
    
    // データ削除処理
    var newExpenseData = [];
    for (var i = 0; i < expenseData.length; i++) {
      if (i == data["expenseIndex"]){  // インデックスが一致したら
        ;
      } else {
        newExpenseData.push(expenseData[i]);
      }
    }
    newExpenseData.push(["", ""]);

    // newExpenseDataをシートに反映
    var startRow = 2;
    var numOfRow = newExpenseData.length;
    var numOfColumn = newExpenseData[0].length;
    sheet.getRange( startRow, startColumn+1, numOfRow, numOfColumn ).setValues(newExpenseData);
  }

  this.insertElement = function(data) {
    // 出費項目の追加処理
    // data = {"elements": elements, "expectedValues": expectedValues};
    var elements = data["elements"];
    var expectedValues = data["expectedValues"];
    var tmpRow = this.find("項目");
    var onlyLeftData = sheet.getRange(1, 1, tmpRow.length+1, 4).getValues();
    for (var i = 0; i < elements.length; i++) {
      onlyLeftData.push([elements[i], 0, "", expectedValues[i]]);
    }
    sheet.getRange(1, 1, onlyLeftData.length, 4).setValues(onlyLeftData);  // 反映
    
    var allData = sheet.getDataRange().getValues();
    var _ = Underscore.load();
    var allDataTrans = _.zip.apply(_, allData);

    for (var i = 0; i < elements.length * 2; i++) {
      var tmpArr = [];
      if (i % 2 == 0){
        tmpArr.push("要素");
      } else {
        tmpArr.push(elements[Math.floor(i / 2)]);
      }
      
      for (var j = 2; j < allData.length; j++){
        tmpArr.push("");
      }
      allDataTrans.push(tmpArr);
    }

    var newAllData = _.zip.apply(_, allDataTrans);
    sheet.getRange(1, 1, newAllData.length, newAllData[0].length).setValues(newAllData);  // 反映
  }

  this.updateElement = function(data){
    // data = {"oldElement": oldElement, "element": element, "expectedValue": expectedValue};
    var oldElement = data["oldElement"];
    var element = data["element"];
    var expectedValue = data["expectedValue"];
    var column = this.getElementColumn(oldElement) + 1;
    var row = this.getElementRow(oldElement) + 1;

    var allData = sheet.getDataRange().getValues();
    allData[row][ELEMENT_COLUMN] = element;
    allData[row][EXPECTED_DATA_COLUMN] = expectedValue;
    allData[0][column] = element;
    sheet.getRange( 1, 1, allData.length, allData[0].length ).setValues(allData);
  }

  this.removeElement = function(element) {
    // TODO: 関数を分ける．
    // スプレッドシートの左側から削除
    var elements = this.find("項目");
    var index = elements.indexOf(element);
    
    // TODO: 小計も削除する？（小計をWebアプリ上で使ってはいない）
    
    // データを全部取ってきて更新
    var allData = sheet.getDataRange().getValues();
    var _ = Underscore.load();
    var allDataTrans = _.zip.apply(_, allData);
    var newallDataTrans = [];
    var column = this.getElementColumn(element);
    for (var i = 0; i < allDataTrans.length; i++){
      if (i == column || i == column+1){
        ;
      }
      else if (i == ELEMENT_COLUMN || i == ELEMENT_COLUMN+1 || i == EXPECTED_DATA_COLUMN) // 項目のところ
      {
        var newColumns = [];
        for (var j = 0; j < allDataTrans[i].length; j++ ){
          if (j != index+1) {
            newColumns.push(allDataTrans[i][j]);
          }
        }
        newColumns.push("");
        newallDataTrans.push(newColumns)
      } 
      else
      {
        newallDataTrans.push(allDataTrans[i]);
      }
    }
    var EmptyArr = [];
    for (var i = 0; i < allData.length; i++){
      EmptyArr.push("");
    }
    // 削除した2列分追加
    newallDataTrans.push(EmptyArr);
    newallDataTrans.push(EmptyArr);
    var newAllData = _.zip.apply(_, newallDataTrans);

    // シートに反映
    sheet.getRange( 1, 1, newAllData.length, newAllData[0].length ).setValues(newAllData);
  }
}

function modelFindTest() {
  var model = new modelClass();
  var arr = model.find("固定費");
  Logger.log(arr);
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

function modelRemoveExpenseDataTest() {
  var model = new modelClass();
  var arr = {"element": "食費", "expense": "test", "value": 200}
  model.removeExpenseData(arr)
}

function modelRemoveElementTest() {
  var model = new modelClass();
  var element = "テスト項目";
  model.removeElement(element);
}

function modelInsertElementTest(){
  var model = new modelClass();
  var arr = {"elements": ["hoge", "test", "hogehoge"], "expectedValues": [100, 200, 300]};
  model.insertElement(arr);
}

function modelUpdateElementTest() {
  var model = new modelClass();
  var arr = {"oldElement": "テスト項目", "element": "テスト項目2", "expectedValue": 200};
  model.updateElement(arr);
}

function test() {
  var model = new modelClass();
  var tmpRow = model.find("項目");

  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var getYearMonth = getYearAndMonthOfToday()
  var sheet = spreadsheet.getSheetByName(getYearMonth);

  Logger.log(tmpRow.length);

  var allData = sheet.getRange(1, 1, tmpRow.length+1, 4).getValues();
  Logger.log("allData: " + allData);
  Logger.log("allData.length: " + allData.length);
  Logger.log("allData[0].length: " + allData[0].length);

  Logger.log(8 % 2 == 0);
  Logger.log(9 % 2 == 0);
}















