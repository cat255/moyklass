/** проверка значения поля lessonsPerPage. Одно неотрицательное целое число */
const lessonsPerPageValidator = (lessonsPerPage) => {
    // удаляем возможные пробелы
    lessonsPerPage = lessonsPerPage.replace(/ /g, '');
    isNumberValidator(lessonsPerPage)
}

function isNumberValidator(data) {
    for (let i = 0; i < data.length; i++) {
        const s = data.slice(i, i + 1);
        if (s === '0' || s === '1' || s === '2' || s === '3' || s === '4' || s === '5' || s === '6' || s === '7' || s === '8' || s === '9') {
            continue
        } else {
            // console.log('Некорректный формат поля lessonsPerPage. Должно быть одно неотрицательное целое число.', s)
            throw new Error('Некорректный формат поля lessonsPerPage. Должно быть одно неотрицательное целое число.' + s)
        }

    }
}

module.exports = lessonsPerPageValidator