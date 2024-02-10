// служебная функция, которая возвращает либо сам index, либо true/false в зависимости от значения index
function getIB(type, index) {
    // IB = index/boolean
    if (type === 'index') {return index}
    else                  {return index >= 0}
}

function get_typeTime(RV, type, subType) {
    let obj = RV.typeTimes[type];
    if (typeof obj === 'number') {return obj}
    else {
        if (Object.keys(obj).includes(subType)) {return obj[subType]}
        else                                    {return obj['ВСЁ ОСТАЛЬНОЕ']}
    }
}
