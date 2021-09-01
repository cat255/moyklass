/** проверка значения поля teacherIds, того что поле неотрицательное целое число больше нуля*/
const teacherIdsValidator = (teacherIds) => {
    if (typeof teacherIds === 'number') {
        teacherIds = teacherIds.toString()
    }
    // удаляем возможные пробелы
    teacherIds = teacherIds.replace(/ /g, '');

    // проверяем чтобы введеные значения были цифрами или запятой
    for (let i = 0; i < teacherIds.length; i++) {
        const s = teacherIds.slice(i, i + 1);
        if (s === '0' || s === '1' || s === '2' || s === '3' || s === '4' || s === '5' || s === '6' || s === '7' || s === '8' || s === '9' || s === ',') {
            continue
        } else {
            // console.log('Некорректный формат поля teacherIds. Должно быть неотрицательное число больше нуля или несколько чисел через запятую.', s)
            throw new Error('Некорректный формат поля teacherIds. Должно быть неотрицательное число больше нуля или несколько чисел через запятую.' + s)
        }        
    }
} 

module.exports = teacherIdsValidator