/* 
при fullText=true и lower=false можно использовать .includes() или .indexOf() вместо этих функций
если fullText=false, возвращают ячейку, в которой только часть текста = txt
если lower=true, все строки будут сравниваться через .toLowerCase()

function LIST_rm_strValues(list, values, fullText=true, lower=true) {
    // values – это список[]
    let rmList = LIST_indx_strList(list, values, true, fullText, lower);
    return LIST_rmIndexes(list, rmList);
}
function LISTcount(list, values, ignore=false) {
    // если ignore=true, считает всё КРОМЕ values[], иначе считает только всё из списка values[]
    let final = 0;
    for (let item of list) {
        if (ignore !== values.includes(item)) {final++}
    }
    return final;
}
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
function LIST_vlookupStr(main, toSearch, values, multi=true, fullText=true, lower=true) {
    // ВПР, находит все values[] в toSearch[] и возвращает соответствующие элементы из main[]
    // если multi=false, добавляет только один индекс для каждого value, а иначе все найденные
    let indexes = LIST_indx_strList(toSearch, values, multi, fullText, lower);
    let   final = [];
    for (let i of indexes) {
        if (i >= 0) {final.push(main[i])}
    }
    return final;
}

// проверки
function LIST_checkStr_allEqual(list, value, fullText=true, lower=true) {
    // если ВСЕ значения списка = value, возвращает true, а иначе возвращает false
    // при fullText=false во всех значениях списка ЧАСТЬ текста должна быть = value
    for (let item of list) {
        if (!STR_findSub(item, value, 'bool', fullText, lower)) {return false}
    }
    return true;
}
function LISTcount(list) {
    let     sum = 0;
    let counter = 0;
    let     max = 0;
    for (let val of list) {
        if (typeof val === 'number') {
            counter++;
            sum += val;
            if (val > max) {max = val}
        }
    }
    return [[counter, sum/counter, max]];
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
}
function LIST_rmDoubles(oldList) {
    let newList = [];
    for (let item of oldList) {
        if (!newList.includes(item)) {newList.push(item)}
    }
    return newList;
}
