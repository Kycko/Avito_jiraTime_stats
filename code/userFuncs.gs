/**
 * Фильтрует отчёт и преобразует время из Jira в количество часов.
 * @param {string}       report  Весь диапазон листа отчёта.
 * @param {stringsRange} columns Названия столбцов, которые оставим + времена обработки задач.
 * @customfunction
 */
function filterReport_and_countTime(report, columns) {
    let RV = SPEC_initRV({table: report, columns: columns});    // RV = root values
    DICT_filterKeys(RV.report, RV.filter);
    SPEC_fixTimes  (RV);
    return SPEC_report_toTable(RV);
}
