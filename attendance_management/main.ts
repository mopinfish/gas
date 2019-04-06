/**
 * main method for GET REQUEST
 * @return {Object} HtmlService Object
 */
function doGet() {
  var template = 'index';
  return HtmlService.createTemplateFromFile(template).evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// クライアント一覧を取得
function getSheetDataCliant() {
  const properties = PropertiesService.getScriptProperties()
      ;
  var spreadSheetID = properties.getProperty('SHEET_ID');
  var sheetName = "master";
  var res = SpreadsheetApp.openById(spreadSheetID).getSheetByName(sheetName).getDataRange().getValues();
  res = Array.prototype.concat.apply([], res);
  return res;
}
