// служебная функция, которая возвращает либо сам index, либо true/false в зависимости от значения index
function getIB(type, index) {
    // IB = index/boolean
    if (type === 'index') {return index}
    else                  {return index >= 0}
}