const teacherIdsValidator = require('./validators/newLessons/teachers-ids-validator')
const titleValidator = require('./validators/newLessons/title-validator')
const daysValidator = require('./validators/newLessons/days-validator')
const firstDateValidator = require('./validators/newLessons/first-date-validator')
const lessonsCountValidator = require('./validators/newLessons/lessons-count-validator')
const lastDateValidator = require('./validators/newLessons/last-date-validator')
const sequelize = require('./db/db')
const QueryTypes = require('sequelize')

const lessons = require('./db/models/init-models')(require('./db/db')).lessons

const createLessons = async (body) => {

    const result = []

    // проверяем если заданые оба параметра lessonsCount и lastDate
    if (body.lessonsCount && body.lastDate) {
        throw new Error('Параметры lessonsCount и lastDate взаимоисключающие. Введите только один из этих параметров.')
    }

    // проверяем если не задано ни lessonsCount ни lastDate
    if (!body.lessonsCount && !body.lastDate) {
        throw new Error('Должен быть ключ lessonsCount или  lastDate.')
    }

    const teacherIds = teacherIdsValidator(body.teacherIds)    
    const title = titleValidator(body.title)
    const days = daysValidator(body.days)
    let firstDate = firstDateValidator(body.firstDate)

    // массив дат новых уроков наполняемый в зависимости от наличия одной из переменных (lastDate или lessonsCount)
    const tadesArray = []

    if (body.lessonsCount){
        
        const lessonsCount = lessonsCountValidator(body.lessonsCount)

        // крайняя дата для создания уроков
        const lastDateInYear = new Date(firstDate.getFullYear() + 1, firstDate.getMonth(), firstDate.getDate())

        // пока массив дат новых уроков меньше ключа lessonsCount и меньше 300
        // и lastDate меньше date, добавляем новые даты
        while (tadesArray.length < lessonsCount && tadesArray.length < 300 && firstDate <= lastDateInYear) {

            // если номер дня недели полученый date.getDay() входит в массив days, то добавлем эту дату в tadesArray
            if (days.includes((new Date(firstDate.getTime())).getDay())) {
                tadesArray.push(firstDate)
            }
            // на каждой итерации увеличиваем дату на одни сутки добавляя количество миллисекунда в сутках
            firstDate = new Date(firstDate.getTime() + 24 * 60 * 60 * 1000)
        }     
    }

    if (body.lastDate) {

        const lastDate = lastDateValidator(body.lastDate, body.firstDate)
        
        // крайняя дата для создания уроков
        const lastDateInYear = new Date(firstDate.getFullYear() + 1, firstDate.getMonth(), firstDate.getDate())

        // пока массив дат новых уроков меньше 300, firstDate меньше lastDate
        // и firstDate меньше lastDateInYear, добавляем новые даты
        while (tadesArray.length < 300 && firstDate <= lastDate && firstDate <= lastDateInYear) {

            // если номер дня недели полученый date.getDay() входит в массив days, то добавлем эту дату в tadesArray
            if (days.includes((new Date(firstDate.getTime())).getDay())) {
                tadesArray.push(firstDate)
            }
            // на каждой итерации увеличиваем дату на одни сутки добавляя количество миллисекунда в сутках
            firstDate = new Date(firstDate.getTime() + 24 * 60 * 60 * 1000)
        }
    }

    // заполняем в базе данных таблицы lessons и lesson_teachers
    // массив result заполняем получеными id
    for (let i = 0; i < tadesArray.length; i++) {
        await sequelize.query(`INSERT INTO lessons (date, title, status) VALUES (?,?,?) RETURNING id`, {
            replacements: [tadesArray[i], title, 0],
            type: QueryTypes.INSERT
        }).then(data => {
            const id = data[0][0].id 
            result.push(id)
            for (let i = 0; i < teacherIds.length; i++){
                sequelize.query(`INSERT INTO lesson_teachers (lesson_id, teacher_id) VALUES (?,?)`, {
                    replacements: [id, teacherIds[i]],
                    type: QueryTypes.INSERT 
                })
            }
        }).catch(e => console.log(e))
    }    

    return result
}



module.exports = createLessons