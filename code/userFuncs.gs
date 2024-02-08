/** @customfunction */
function filterReport_and_countTime(sheetName) {
    // sheetName – имя листа с отчётом
    let table = SpreadsheetApp.getActive().getSheetByName(sheetName).getDataRange().getValues();
    table     = TBL_cut_toTitle(table);
    return table;
}
