// чтение изначальных данных
function SPEC_initRV(dict, MoWe, title) {
    // получает словарь {table:, columns:} и MoWe, приводит эти данные в нужный вид
    for (let val of Object.values(dict)) {TBL_cut_emptyRows(val)}
    TBL_toStrings(dict.table);
    return {
        report    : SPEC_readReport(dict.table, title),
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
function SPEC_readReport(table, title) {
    table.splice     (0, title-1);
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
        if (toFix.includes(key)) {SPEC_fixTimes_inColumn(RV, key)}
    }
}
function SPEC_fixTimes_inColumn(RV, key) {
    let curCol = RV.report[key];
    for (let i=0; i < curCol.length; i++) {
        if (curCol[i].length) {
            let negative = false;
            if (curCol[i][0] === '-') {
                negative  = true;
                curCol[i] = curCol[i].slice(1); // удаляет первый символ
            }

            curCol[i]   = STR_time_toHours(RV.hours, curCol[i]);
            let initSLA = get_typeTime    (RV,  key, RV.report['Component/s'][i]);
            if (negative) {curCol[i] += initSLA}
            else          {curCol[i]  = initSLA - curCol[i]}
            curCol[i] = curCol[i].toFixed(2);
        }
    }
}

// преобрабование разных типов
function SPEC_report_toTable(RV) {
    let final = [];
    for (let key of RV.filter) {final.push([key].concat(RV.report[key]))}
    return TBLrotate(final);
}
