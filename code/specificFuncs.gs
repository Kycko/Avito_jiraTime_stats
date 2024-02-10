// чтение изначальных данных
function SPEC_initRV(dict, MoWe) {
    // получает словарь {table:, columns:} и MoWe, приводит эти данные в нужный вид
    for (let val of Object.values(dict)) {
        TBL_toStrings    (val);
        TBL_cut_emptyRows(val);
    }
    return {
        report    : SPEC_readReport(dict.table),
        filter    : LIST_rmDoubles (TBLrotate(dict.columns)[0]),
        typeTimes : SPEC_readTimes (dict.columns),
        hours     : Ghours         (MoWe)
    }
}
function SPEC_readTimes(table) {
    let final = {};
    for (let row of table) {
        if (row[2] !== '-') {
            if (row[0] === 'Time to resolution') {
                if (!Object.keys(final).includes(row[0])) {final[row[0]] = {}}
                final[row[0]][row[1]] = Number(row[2])
            }
            else {final[row[0]] = Number(row[2])}
        }
    }
    return final;
}
function SPEC_readReport(table) {
    TBL_cut_toTitle  (table);
    TBL_rm_strValues (table, ['CellImage'], 1, true, false);
    table = TBLrotate(table);

    let final = {};
    for (let row of table) {final[row.shift()] = row}
    return final;
}

// основные преобразования
function SPEC_fixTimes(RV) {
    let     toFix = Object.keys(RV.typeTimes);
    for (let key of Object.keys(RV.report)) {
        if (toFix.includes(key)) {SPEC_fixTimes_inColumn(RV, RV.report[key])}
    }
}
function SPEC_fixTimes_inColumn(RV, column) {
    for (let i=0; i < column.length; i++) {
        if (column[i].length) {column[i] = STR_transformTime(RV.hours, column[i])}
    }
}

// преобрабование разных типов
function SPEC_report_toTable(RV) {
    let final = [];
    for (let key of RV.filter) {final.push([key].concat(RV.report[key]))}
    return TBLrotate(final);
}
