/** Проверка корректности значения ключа lastDate */
const dateValidator = require('../db/date-validator')

const lastDateValidator = (lastDate, firstDate) => {

    // проверяем чтобы тип значения ключа date был string
    if (typeof lastDate !== 'string') {
        const dateType = typeof date
        throw new Error('нерекорректный тип значения ключа lastDate =' + dateType + '. Должен быть string.')
    }

    // удаляем возможные пробелы
    lastDate = lastDate.replace(/ /g, '');

    // проверка даты на длину 
    if (lastDate.length !== 10) {
        throw new Error('нерекорректная длина lastDate ' + date.length)
    }

    // проверка на попытку создать lastDate раньше firstDate
    if (new Date(lastDate) < new Date(firstDate)) {
        throw new Error('Нельзя задать lastDate раньше firstDate')
    }

    dateValidator(lastDate)

    return new Date(lastDate)
}

module.exports = lastDateValidator