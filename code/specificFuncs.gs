// чтение изначальных данных
function SPEC_initRV(dict) {
    // получает словарь {table:, columns:} и приводит эти данные в нужный вид
    for (let val of Object.values(dict)) {
        TBL_toStrings    (val);
        TBL_cut_emptyRows(val);
    }
    return {
        report : SPEC_readReport(dict.table),
        filter : LIST_rmDoubles (TBLrotate(dict.columns)[0]),
        times  : SPEC_readTimes (dict.columns)
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
    let     toFix = Object.keys(RV.times);
    for (let key of Object.keys(RV.report)) {
        if (toFix.includes(key)) {SPEC_fixTimes_inColumn(RV, key)}
    }
}
function SPEC_fixTimes_inColumn(RV, key) {
    for (let i=0; i < RV[key].length; i++) {
        if (RV[key][i].length) {RV[key][i] = STR_transformTime(RV[key][i])}
    }
}

// преобрабование разных типов
function SPEC_report_toTable(RV) {
    let final = [];
    for (let key of RV.filter) {final.push([key].concat(RV.report[key]))}
    return TBLrotate(final);
}
