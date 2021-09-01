const daysValidator = (days) => {

    // Проверка на наличие ключа days
    if (!days) {
        throw new Error('Ключ days обязательный')
    }

    const validСharacters = /^[0-6]/;

    // Проверка на массив
    if (!(days instanceof Array)) {
        throw new Error('Значение ключа days должно быль массивом')
    }

    // Проверка на длину массива
    if(days.length > 7) {
        throw new Error('Слишком много значений в массиве days. Должно быть не более 7 уникальных чисел от 0 до 6. Задано ' + days.length)
    }

    // Проверка на значения массива
    for(let i = 0; i < days.length; i++){
        let iter = days[i].toString().match(validСharacters)
        if (!iter) {
            throw new Error('Значения массива days должно быль числом от 0 до 6. Ошибочное значение = ' + days[i])
        }
    }

    // Проверка на уникальность значений массива
    const set = new Set(days)
    if (set.size < days.length){
        const noUnique = days.length - set.size
        throw new Error('Все значения массива days должны быть уникальны. Выявлено ' + noUnique + ' неуникальных значений')
    }

    // Возвращаем отсортированный по возрастанию массив days
    return days.sort((a, b) => a - b)
}

module.exports = daysValidator