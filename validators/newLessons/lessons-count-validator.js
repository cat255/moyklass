const lessonsCountValidator = (count) => {

    // проверяем чтобы тип значения ключа lessonsCount был number
    if (typeof count !== 'number') {
        const countType = typeof count
        throw new Error('нерекорректный тип значения ключа lessonsCount = ' + countType + '. Должен быть number.')
    }

    // проверяем чтобы тип значения ключа lessonsCount был целым числом
    if (count - Math.floor(count) !== 0) {
        const countType = typeof count
        throw new Error('нерекорректное значение ключа lessonsCount ' + count + '. Должено быть целое число.')
    }

    return count
}

module.exports = lessonsCountValidator