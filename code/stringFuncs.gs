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
