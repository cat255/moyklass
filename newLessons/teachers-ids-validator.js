/** проверка значения поля teacherIds, того что это массив неотрицательных целых чисел больше нуля*/
const teacherIdsValidator = (teacherIds) => {

    // Проверка на наличие ключа teacherIds
    if (!teacherIds) {
        throw new Error('Ключ teacherIds обязательный')
    }
    // Проверка на массив
    if (!(teacherIds instanceof Array)) {
        throw new Error('Значение ключа teacherIds должно быль массивом целых чисел больше нуля')
    }

    // проверяем чтобы введеные значения были числами
    for (let i = 0; i < teacherIds.length; i++) {
        const s = teacherIds[i]
        if (s.toString().match(/^[0-9]/)) {
            continue
        } else {
            // console.log('Некорректный формат поля teacherIds. Должно быть неотрицательное число больше нуля или несколько чисел через запятую.', s)
            throw new Error('Некорректное значение ключа teacherIds. Должно быть неотрицательное число больше нуля или несколько чисел через запятую.' + s)
        }
    }

    return teacherIds
}

module.exports = teacherIdsValidator