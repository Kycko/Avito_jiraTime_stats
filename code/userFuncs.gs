/**
 * Фильтрует отчёт и преобразует время из Jira в количество часов.
 * @param {string}      reportSheet Имя листа с отчётом.
 * @param {stringsRange} filterCols Названия столбцов, которые оставим.
 * @customfunction
 */
function filterReport_and_countTime(reportSheet, filterCols) {
    let   RV = SPEC_initRV     (reportSheet, filterCols);   // RV = root values
    RV.table = TBL_filterTitles(RV.table, RV.filterCols);
    return RV.table;
}
