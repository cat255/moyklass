const titleValidator = (title) => {

    // Проверка на наличие ключа title
    if (!title) {
        throw new Error('Ключ title обязательный')
    }

    const validСharacters = /^[0-9a-zA-Zа-яА-Я., ]+$/;
    if (!title.match(validСharacters)) {
        throw new Error('Поле title может содержать только цифры, буквы латинского или кириллического алфавита, точку, запятую или пробел.')
    }

    return title
}

module.exports = titleValidator