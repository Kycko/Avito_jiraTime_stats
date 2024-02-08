// узконаправленные
function SPEC_initRV(reportData, filterCols) {
    TBL_toStrings(filterCols);
    filterCols = LIST_rm_strValues(TBL_toList(filterCols), [''], true, false);

    TBL_toStrings   (reportData);
    TBL_cut_toTitle (reportData);
    TBL_rm_strValues(reportData, ['CellImage'], 1, true, false);
    return {table: reportData, filterCols: filterCols}
}
