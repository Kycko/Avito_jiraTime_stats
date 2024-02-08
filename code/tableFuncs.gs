// получение свойств
function TBL_get_fullRange(table) {
    return {
        r: 0, c: 0,
        h: table.length, w: table[0].length
    }
}
function TBL_cut_toTitle(table) {
    // убирает первые строки до заголовков (Project и т. д.)
    while (table[0][0] !== 'Project') {table.shift()}
    return table;
}

// преобразование всей таблицы
function TBLrotate(old) {
    let rotated = [];
    for (let cell of old[0]) {rotated.push([])}
    for (let r=0; r < old.length; r++) {
        for (let c=0; c < old[r].length; c++) {
            rotated[c].push(old[r][c]);
        }
    }
    return rotated;
}
function TBL_toStrings(table, range=null) {
    // переводит все ячейки в .toString(), делает .trim() и удаляет плохие символы (напр., мягкие пробелы)
    // при range=null обрабатывает всю таблицу, иначе надо передать словарь {r, c, h, w}
    if (range === null) {range = TBL_get_fullRange(table)}
    for (let r=range.r; r < range.r+range.h; r++) {
        for (let c=range.c; c < range.c+range.w; c++) {
            table[r][c] = table[r][c].toString().trim().replaceAll('​', '');
        }
    }
}
function TBL_toList(table) {
    // преобразует всю таблицу в список[] её элементов
    let final = [];
    for (let row of table) {
        for (let cell of row) {
            final.push(cell);
        }
    }
    return final;
}
function TBL_filterTitles(table, titles) {
    // возвращает таблицу только со столбцами из titles[] и в порядке, указанном в titles[]
    let   final = [];
    let indexes = LIST_indx_strList(table[0], titles, false);
    table       = TBLrotate(table);
    for (let i of indexes) {Logger.log(table[i]);final.push(table[i]);}
    return TBLrotate(final);
}
