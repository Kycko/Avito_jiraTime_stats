// поиск
function STR_findSub(string, sub, type='index', fullText=false, lower=true) {
    // если fullText=true, проверяется равенство строк (но после .trim() + можно задать lower=true)
    // если lower=true, все строки будут сравниваться через .toLowerCase()
    string = string.trim();
    sub    = sub   .trim();
    if (fullText && string.length !== sub.length) {return getIB(type, -1)}
    if (lower) {
        string = string.toLowerCase();
        sub    = sub   .toLowerCase();
    }
    return getIB(type, string.indexOf(sub));
}

// узконаправленные
function STR_getTime_byType(timeStr) {
    let types = G_timeTypes();
    for (let key of Object.keys(types)) {
        if (timeStr.includes(key)) {
            let time = Number(timeStr.replace(key, ''));
            if (['m', 'min'].includes(key)) {return time/types[key]}
            else                            {return time*types[key]}
        }
    }
    return null;    // если все типы описаны в G_timeTypes(), это строка не должна работать
}
function STR_transformTime(timeStr) {
    // принимает изначальную строку из Jira, возвращает цифру – количество часов
    let negative = false;
    if (timeStr[0] === '-') {
        negative = true;
        timeStr  = timeStr.slice(1);    // удаляет первый символ
    }

    let list = timeStr.split(' ');
    let  sum = 0;
    for (let item of list) {
        sum += STR_getTime_byType(item);
        
    }
}
