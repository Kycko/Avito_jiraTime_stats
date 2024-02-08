/**
 * Фильтрует отчёт и преобразует время из Jira в количество часов.
 * @param {string}      reportSheet Имя листа с отчётом.
 * @param {stringsRange} filterCols Названия столбцов, которые оставим.
 * @customfunction
 */
function filterReport_and_countTime(reportSheet, filterCols) {
    // получаем все данные
    TBL_toStrings(filterCols);
    filterCols = LIST_rm_strValues(TBL_toList       (filterCols), [''], true, false);
    let  table = TBL_cut_toTitle  (SH_read_fullSheet(reportSheet));
    table      = TBL_filterTitles (table, filterCols);
    return table;
}
