/**
 * Фильтрует отчёт и преобразует время из Jira в количество часов.
 * @param {string}       report  Весь диапазон листа отчёта.
 * @param {stringsRange} columns Названия столбцов, которые оставим + времена обработки задач.
 * @customfunction
 */
function filterReport_and_countTime(report, columns) {
    let   RV = {table: report, columns: columns};   // RV = root values
    SPEC_initRV(RV);
    RV.table = TBL_filterTitles(RV.table, RV.filter);
    return RV.table;
}
