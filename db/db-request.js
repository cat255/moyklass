const sequelize = require('./db')
const { Op } = require('sequelize')

const requestDb = async (request) => {
    console.log(request)

    const condition = {}

    if (request.date && request.date.length === 10) {
        condition.date = [request.date.slice(0, 10)]
    } else if (request.date && request.date.length === 21) {
        condition.date = { [Op.between]: [request.date.slice(0, 10), request.date.slice(11, 21)] }
    }

    if (request.status) {
        condition.status = { [Op.eq]: request.status }
    }

    if (request.teacherIds || request.studentsCount) {

        let teacherIds = []
        let studentsCount = []
        let id = []

        if (request.teacherIds) {
            const teachersArray = request.teacherIds.split(',')
            try {
                teacherIds = await sequelize.query(`
                SELECT l.id FROM lessons l JOIN lesson_teachers lt ON l.id = lt.lesson_id WHERE teacher_id IN (${teachersArray})
            `).then(
                    data => {
                        let result = []
                        for (let i = 0; i < data[0].length; i++) {
                            result.push(data[0][i].id)
                        }
                        return result
                    }
                )
            } catch (e) {
                console.log(e)
            }
        }

        if (request.studentsCount) {
            let studentsCountArray = request.studentsCount.split(',')
            if (studentsCountArray.length === 1) {
                studentsCountArray.push(studentsCountArray[0])
            }
            try {
                studentsCount = await sequelize.query(`
                SELECT ls.lesson_id id FROM lessons l JOIN lesson_students ls ON l.id = ls.student_id GROUP BY ls.lesson_id HAVING count(student_id) BETWEEN ${studentsCountArray[0]} AND ${studentsCountArray[1]}
            `).then(data => {
                    let result = []
                    for (let i = 0; i < data[0].length; i++) {
                        result.push(data[0][i].id)
                    }
                    return result
                })
            } catch (e) {
                console.log(e)
            }
        }

        if (teacherIds.length > 0 && studentsCount.length === 0 ) {
            id = teacherIds
        }

        if (teacherIds.length === 0 && studentsCount.length > 0) {
            id = studentsCount
        }

        if (teacherIds.length > 0 && studentsCount.length > 0) {
            id = teacherIds.filter(num => studentsCount.includes(num));
        }
                
        condition.id = { [Op.in]: id }
    }

    let requestResult
    let totalResult = []
    try {
        requestResult = await sequelize.models.lessons.findAll({
            attributes: ['id', 'date', 'title', 'status'],
            where: condition,
            order: [['id']],
            limit: request.lessonsPerPage,
            offset: (request.page - 1) * request.lessonsPerPage
        })

        for (let i = 0; i < requestResult.length; i++) {
            const id = requestResult[i].dataValues.id

            let count = await sequelize.query(`
                SELECT SUM(CASE WHEN visit = 't' THEN 1 ELSE 0 end) FROM lesson_students WHERE lesson_id= ${id}
            `)
            requestResult[i].dataValues.count = count[0][0].sum

            let students = await sequelize.query(`
                SELECT s.id, name, visit FROM students s JOIN lesson_students ls ON s.id = ls.student_id
                JOIN lessons l ON l.id = ls.lesson_id WHERE l.id = ${id}
            `)
            requestResult[i].dataValues.students = students[0]

            let teachers = await sequelize.query(`
                SELECT t.id, name FROM teachers t JOIN lesson_teachers lt ON t.id = lt.teacher_id
                JOIN lessons l ON l.id = lt.lesson_id WHERE l.id = ${id}
            `)
            requestResult[i].dataValues.teachers = teachers[0]
            totalResult.push(requestResult[i].dataValues)
        }
        // console.log(totalResult)

    } catch (e) {
        console.log(e)
    }

    return totalResult
}

module.exports = requestDb