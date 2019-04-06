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
      , sheetName = "master"
      , res = Array.prototype.concat.apply([], SpreadsheetApp.openById(spreadSheetID).getSheetByName(sheetName).getDataRange().getValues())
      ;

  return res;
}
