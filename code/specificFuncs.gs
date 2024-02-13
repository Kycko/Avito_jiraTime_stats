// чтение изначальных данных
function SPEC_initRV(dict, MoWe, title, dates) {
    // получает словарь {table:, columns:} и остальное, приводит эти данные в нужный вид
    for (let val of Object.values(dict)) {TBL_cut_emptyRows(val)}
    TBL_toStrings(dict.table);
    let Rcols = TBLrotate(dict.columns);    // rotated columns

    return {
        report    : SPEC_readReport     (dict.table, title),
        filter    : LIST_rmDoubles      (Rcols[0]),
        dates     : SPEC_init_dateFilter(dates),
        dateTypes : LIST_vlookupStr     (Rcols[0], Rcols[3], ['date'], true, false),
        typeTimes : SPEC_readTimes      (dict.columns),
        hours     : Ghours              (MoWe)
    }
}
function SPEC_init_dateFilter(dates) {
    let final = {from: null, to: null, col: dates[1][0]}
    if (dates[0][0] !== '') {final.from   = dates[0][0]}    // может быть не строкой
    if (dates[0][1] !== '') {final.to     = dates[0][1]}    // может быть не строкой
    return final;
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

// фильтр
function SPEC_filterDates(RV) {
    let D = RV.dates;
    if (!          RV.dateTypes.includes(D.col)) {return}
    if (!Object.keys(RV.report).includes(D.col)) {return}
    if (D.from === null && D.to === null)        {return}

    let  column = RV.report[D.col];
    let getRows = [];   // номера строк, которые оставим
    for (let i=0; i < column.length; i++) {
        if (column[i].length) {
            let   first = true;
            let    last = true;
            let curDate = STR_parse_jiraDate(column[i]);

            if (D.from !== null) {first = curDate >= D.from}
            if (D.to   !== null) {last  = curDate <= D.to}
            if (first && last) {getRows.push(i)}
        }
    }

    DICT_filterRows_byIndexes(RV.report, getRows);
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
            curCol[i] = Number(curCol[i].toFixed(2));
        }
    }
}

// преобрабование разных типов
function SPEC_report_toTable(RV) {
    let final = [];
    for (let key of RV.filter) {final.push([key].concat(RV.report[key]))}
    return TBLrotate(final);
}
