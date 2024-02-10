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
function STR_getTime_byType(timeStr, RVhours) {
    for (let key of Object.keys(RVhours)) {
        if (timeStr.includes(key)) {
            let time = Number(timeStr.replace(key, ''));
            if (RVhours[key].div) {return time/RVhours[key].hours}
            else                  {return time*RVhours[key].hours}
        }
    }
    return null;    // если все типы описаны в RVhours{}, это строка не должна работать
}
function STR_time_toHours(RVhours, timeStr) {
    // принимает изначальную строку из Jira, возвращает цифру – количество часов
    let list = timeStr.split(' ');
    let  sum = 0;
    for (let item of list) {sum += STR_getTime_byType(item, RVhours)}
    return sum;
}
