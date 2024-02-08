// получение свойств
function TBL_cut_toTitle(table) {
    // убирает первые строки до заголовков (Project и т. д.)
    while (table[0][0] !== 'ASD.DOC') {table.shift()}
    return table;
}
