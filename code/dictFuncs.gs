function DICT_filterKeys(dict, keys) {
    // удаляет из dict{} все ключи, которых нет в keys[]
    for (let key of Object.keys(dict)) {
        if (!keys.includes(key)) {delete dict[key]}
    }
}
function DICT_filterRows_byIndexes(dict, indexes) {
    // для словаря-таблицы, из всех dict.values[] удаляет элементы по индексам, которых НЕТ в indexes[]
    for (let val of Object.values(dict)) {
        for (let i = val.length-1; i >= 0; i--) {
            if (!indexes.includes(i)) {val.splice(i, 1)}
        }
    }
}
