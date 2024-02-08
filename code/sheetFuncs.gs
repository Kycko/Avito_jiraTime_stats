function SH_read_fullSheet(sheetName) {
    return SH_getValues(SpreadsheetApp.getActive().getSheetByName(sheetName).getDataRange())
}
function SH_getValues(range) {
    let table = range.getValues();
    TBL_toStrings(table);
    return table;
}
