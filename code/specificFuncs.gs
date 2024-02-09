// узконаправленные
function SPEC_initRV(RV) {
    // получает словарь {table:, columns:} и приводит эти данные в нужный вид
    for (let val of Object.values(RV)) {
        TBL_toStrings    (val);
        TBL_cut_emptyRows(val);
    }

    RV.filter = LIST_rmDoubles(TBLrotate(RV.columns)[0]);
    RV.times  = SPEC_readTimes(RV.times);

    // reportData
    TBL_cut_toTitle (RV.table);
    TBL_rm_strValues(RV.table, ['CellImage'], 1, true, false);
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
