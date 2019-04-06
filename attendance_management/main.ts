function myFunction() {
  Logger.log('hogehoge');
}
function doGet() {
  var template = 'index';
  return HtmlService.createTemplateFromFile(template).evaluate();
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
