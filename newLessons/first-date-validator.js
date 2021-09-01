/** Проверка корректности значения ключа firstDate */
const dateValidator = require('../db/date-validator')

const firstDateValidator = (firstDate) => {

    // Проверка на наличие ключа firstDate
    if (!firstDate) {
        throw new Error('Ключ firstDate обязательный')
    }

    // проверяем чтобы тип значения ключа date был string
    if (typeof firstDate !== 'string'){
        const dateType = typeof firstDate
        throw new Error('нерекорректный тип значения ключа firstDate =' + dateType + '. Должен быть string.')
    }

    // удаляем возможные пробелы
    firstDate = firstDate.replace(/ /g, '');

    // проверка даты на длину 
    if (firstDate.length !== 10) {
        throw new Error('нерекорректная длина firstDate ' + firstDate.length)
    }

    // проверка на попытку создать урок раньше текущей даты
    // if (new Date(firstDate) < new Date(Date.now())){
    //     throw new Error('Нельзя создавать уроки раньше текущей даты ')
    // } 

    dateValidator(firstDate)

    return new Date(firstDate)
}

module.exports = firstDateValidator