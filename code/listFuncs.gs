/* 
при full_text=true и lower=false можно использовать .includes() или .indexOf() вместо этих функций
если full_text=false, возвращают ячейку, в которой только часть текста = txt
если lower=true, все строки будут сравниваться через .toLowerCase()
 */

// поиск
function LIST_indxStr(list, txt, fullText=true, lower=true) {
    let final = [];
    for (let i=0; i < list.length; i++) {
        if (STR_findSub(list[i], txt, 'bool', fullText, lower)) {final.push(i)}
    }
    return final;
}
function LIST_indx_strList(list, values, multi=true, fullText=true, lower=true) {
    // возвращает список индексов всех values[]
    // если multi=false, добавляет только один индекс для каждого value, а иначе все найденные
    let final = [];
    for (let val of values) {
        let indexes = LIST_indxStr(list, val, fullText, lower);
        if (indexes.length) {
            if (!multi) {indexes = [indexes[0]]}
            final = final.concat(indexes);
        }
        else {final.push(-1)}
    }
    return final;
}

// изменение
function LIST_sortNumeric(list, ascending=true) {
    // ascending – это 'по возрастанию'; если оно = false, будет сортировка по убыванию
    if (ascending) {return list.toSorted((a, b) => a - b)}
    else           {return list.toSorted((a, b) => b - a)}
}
function LIST_rmIndexes(list, indexes) {
    indexes = LIST_sortNumeric(indexes);
    for (let i = indexes.length-1; i >= 0; i--) {list.splice(indexes[i], 1)}
    return list;
}
function LIST_rm_strValues(list, values, fullText=true, lower=true) {
    // values – это список[]
    let rmList = LIST_indx_strList(list, values, true, fullText, lower);
    return LIST_rmIndexes(list, rmList);
}
