/**
 * Фильтрует отчёт и преобразует время из Jira в количество часов.
 * @param {string}       report  Весь диапазон листа отчёта.
 * @param {stringsRange} columns Названия столбцов, которые оставим + времена обработки задач.
 * @param {stringsRange} MoWe    Количество раб. часов в одной неделе и в одном месяце (month & week).
 * @param {integer}      title   Номер строки заголовков отчёта.
 * @customfunction
 */
function filterReport_and_countTime(report, columns, MoWe, title) {
    let RV = SPEC_initRV({table: report, columns: columns}, MoWe, title);   // RV = root values
    DICT_filterKeys(RV.report, RV.filter);
    SPEC_fixTimes  (RV);
    return SPEC_report_toTable(RV);
}
