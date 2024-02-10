/**
 * Фильтрует отчёт и преобразует время из Jira в количество часов.
 * @param {stringsRange} report  Весь диапазон листа отчёта.
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

/**
 * Считает количество, среднее и максимальное время в table, но только в столбце column и отфильтровав её по статусам taskStatus.
 * @param {stringsRange} table      Таблица для подсчёта.
 * @param {string}       taskStatus Либо 'Unresolved', либо 'Done, Fixed'.
 * @param {string}       column     Название столбца, в котором считать.
 * @customfunction
 */
function customCounter(table, taskStatus, column) {
    TBL_cut_emptyRows(table);
    table   = TBLfilter_with_titleName(table, 'Resolution', taskStatus.split(', '));
    let col = LIST_indxStr(table[0], column, true, false);
    column  = TBLrotate   (table)[col];
    column.shift();

    return LISTcount(column);
}
