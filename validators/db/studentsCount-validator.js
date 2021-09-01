/** проверка значения поля studentsCount */
const studentsCountValidator = (studentsCount) => {
    // удаляем возможные пробелы
    studentsCount = studentsCount.replace(/ /g, '');
    // проверяем на наличик запятой
    if (studentsCount.includes(',')) {
        const countValues = studentsCount.split(',').length
        // если значений больше 2, бросаем ошибку
        if (countValues > 2) {
            // console.log('Слишком много значений для поля studentsCount. Допустимо не больше 2.')
            throw new Error('Слишком много значений для поля studentsCount. Допустимо не больше 2.')
        }
        isNumberValidator(studentsCount.split(',')[0])
        isNumberValidator(studentsCount.split(',')[1])
        if (+studentsCount.split(',')[0] > +studentsCount.split(',')[1]) {
            // console.log('Слишком много значений для поля studentsCount. Допустимо не больше 2.')
            throw new Error('Неправильный порядок значений для поля studentsCount. Меньшее должно стоять первым.')
        }
    } else {
        isNumberValidator(studentsCount)
    }
}

function isNumberValidator(data){
    for (let i = 0; i < data.length; i++) {
        const s = data.slice(i, i + 1);
        if (s === '0' || s === '1' || s === '2' || s === '3' || s === '4' || s === '5' || s === '6' || s === '7' || s === '8' || s === '9' || s === ',') {
            continue
        } else {
            // console.log('Некорректный формат поля studentsCount. Должно быть неотрицательное целое число или два числа через запятую.', s)
            throw new Error('Некорректный формат поля studentsCount. Должно быть неотрицательное целое число  или два числа через запятую.' + s)
        }
    }
}

module.exports = studentsCountValidator