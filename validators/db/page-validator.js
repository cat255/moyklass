/** проверка значения поля page. Одно неотрицательное целое число */
const pageValidator = (page) => {
    // удаляем возможные пробелы
    page = page.replace(/ /g, '');
    isNumberValidator(page)
}

function isNumberValidator(data) {
    for (let i = 0; i < data.length; i++) {
        const s = data.slice(i, i + 1);
        if (s === '0' || s === '1' || s === '2' || s === '3' || s === '4' || s === '5' || s === '6' || s === '7' || s === '8' || s === '9') {
            continue
        } else {
            // console.log('Некорректный формат поля page. Должно быть неотрицательное целое число.', s)
            throw new Error('Некорректный формат поля page. Должно быть неотрицательное целое число.' + s)
        }

    }
}

module.exports = pageValidator