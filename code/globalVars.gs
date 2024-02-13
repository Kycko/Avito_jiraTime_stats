function Ghours(MoWe) {
    return {
        // будет записано в RV.hours
        // div указывает, надо ли делить на это число (иначе будем умножать)
        min : {hours: 60,              div: true},  // минуты
        mo  : {hours: Number(MoWe[2]), div: false}, // месяцы
        w   : {hours: Number(MoWe[0]), div: false}, // недели
        d   : {hours: 9,               div: false}, // дни
        h   : {hours: 1,               div: false}, // часы
        m   : {hours: 60,              div: true}   // минуты
    }
}
function Gmonths() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}
