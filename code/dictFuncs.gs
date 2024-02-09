function DICT_filterKeys(dict, keys) {
    // удаляет из dict{} все ключи, которых нет в keys[]
    for (let key of Object.keys(dict)) {
        if (!keys.includes(key)) {delete dict[key]}
    }
}
