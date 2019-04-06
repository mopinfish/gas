/**
 * main method for GET REQUEST
 * @return {Object} HtmlService Object
 */
function doGet() {
  var template = 'src/views/index';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// クライアント一覧を取得
function getClients() {
  const properties = PropertiesService.getScriptProperties()
      , spreadSheetID = properties.getProperty('SHEET_ID')
      , sheetName = "clients_master"
      , res = Array.prototype.concat.apply([], SpreadsheetApp.openById(spreadSheetID).getSheetByName(sheetName).getDataRange().getValues())
      ;

  return res;
}

// 引数からプロジェクトを配列で取得
function findProjectList(client){
  const properties = PropertiesService.getScriptProperties()
      , spreadSheetID = properties.getProperty('SHEET_ID')
      , sheetName = "projects_master"
      ;

  var data = SpreadsheetApp.openById(spreadSheetID).getSheetByName(sheetName).getDataRange().getValues(); // 受け取ったシートのデータを二次元配列に取得
  // 引数のクライアント名がある行を取得
  for(var i = 0; i < data.length; i++) {
    if(data[i][0] === client){
      var clientRow = i + 1;
    }
  }

  //getRangeで引数がある行の2列目から10列目まで取得
  //２次元配列にする
  const res = Array.prototype.concat.apply([], SpreadsheetApp.openById(spreadSheetID).getSheetByName(sheetName).getRange(clientRow, 2, 1, 10).getValues())
              // 空白の配列を除去
              .filter(function(e){return e !== "";});

  return res;
}
