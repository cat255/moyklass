/** проверка значения поля status. ( 0 или 1 ) */
const statusValidator = (status) => {
    // удаляем возможные пробелы
    status = status.replace(/ /g, '');

    if (!(+status === 0 || +status === 1)) {
        // console.log('нерекорректное значение поля status. Допустимо 0 или 1', status)
        throw new Error('нерекорректное значение поля status. Допустимо 0 или 1 ' + status)
    }
}

module.exports = statusValidator