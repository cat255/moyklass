/** проверка даты на корректность значений в году, месяце, дне */
const dateValidator = (date) => {

    // удаляем возможные пробелы
    date = date.replace(/ /g, '');

    // проверка даты на длину 
    if (date.length !== 10 && date.length !== 21) {
        // console.log('нерекорректная длина даты', date.length)
        throw new Error('нерекорректная длина даты ' + date.length)
    }

    // проверка разделителя дат, должна быть запятая
    if (date.length === 21 && date.slice(10, 11) !== ',') {
        console.log(date.slice(10, 11))
        // console.log('Некорретный разделитель дат. Должна быть запятая', date.slice(10, 11))
        throw new Error('Некорретный разделитель дат. Должна быть запятая ' + date.slice(10, 11))
    }

    if (date.length === 10) {
        separateAndNumberValidator(date)
        monthNumbersValidate(date)
        daysInMontValidate(date)
    } else {
        const year1 = +date.slice(0, 4)
        const month1 = +date.slice(5, 7)
        const day1 = +date.slice(8, 10)

        const year2 = +date.slice(11, 15)
        const month2 = +date.slice(16, 18)
        const day2 = +date.slice(19, 21)

        date1 = date.slice(0,10)
        date2 = date.slice(11, 21)
        separateAndNumberValidator(date1)
        monthNumbersValidate(date1)
        daysInMontValidate(date1)
        separateAndNumberValidator(date2)
        monthNumbersValidate(date2)
        daysInMontValidate(date2)
        if (new Date(year1, month1, day1) > new Date(year2, month2, day2)) {
            // console.log('Некорретный порядок дат');
            throw new Error('Некорректный порядок дат')
        }
    }
}

/** определяем високосный ли год */
function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

/** определяем корректность разделителя даты и введены ли цифры   */
function separateAndNumberValidator(date) {
    if (date.slice(4, 5) !== '-' || date.slice(7, 8) !== '-') {
        // console.log('Некорректный разделитель элементов даты. Должен быть дефис.')
        throw new Error('Некорректный разделитель элементов даты. Должен быть дефис.')
    }
    const freeSeparate = date.replace(/-/g, '')
    for(let i = 0; i < freeSeparate.length; i++){
        const s = +freeSeparate.slice(i, i + 1);
        if (s === 0 || s === 1 || s === 2 || s === 3 || s === 4 || s === 5 || s === 6 || s === 7 || s === 8 || s === 9 ) {
            continue
        } else {
            // console.log('Некорректный формат даты. Должен быть ГГГГ-ММ-ДД.', s)
            throw new Error('Некорректный формат даты. Должен быть ГГГГ-ММ-ДД.')
        }
    }
} 

/** определяем корректность диапазона месяцев */
function monthNumbersValidate(date){
    const month = +date.slice(5, 7)
    if (month < 1 || month > 12) {
        // console.log('Некорректный диапазон месяцев')
        throw new Error('Некорректный диапазон месяцев')
    }
}

/** определяем корректность диапазона дней в месяце */
function daysInMontValidate(date){
    const year = +date.slice(0, 4)
    const month = +date.slice(5, 7)
    const day = +date.slice(8, 10)
    // февраль в високосном году
    if (leapYear(year)){
        if (month === 2 && (day < 1 || day > 29)) {
            // console.log('Некорректный диапазон дней в месяце')
            throw new Error('Некорректный диапазон дней в месяце')
        }
    } else {
        if (month === 2 && (day < 1 || day > 28)) {
            // console.log('Некорректный диапазон дней в месяце')
            throw new Error('Некорректный диапазон дней в месяце')
        }
    }
    // больше 31 дня
    if (
            (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) &&
            (day <1 || day > 31)
    ) {
        // console.log('Некорректный диапазон дней в месяце')
        throw new Error('Некорректный диапазон дней в месяце')
    } 
    // больше 30 дней
    if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        (day < 1 || day > 30)
    ) {
        // console.log('Некорректный диапазон дней в месяце')
        throw new Error('Некорректный диапазон дней в месяце')
    }
}

module.exports = dateValidator