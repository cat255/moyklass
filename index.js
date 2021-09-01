const express = require('express')
const requestDb = require('./db/db-request')
const createLessons = require('./create-lessons')

// валидаторы получаемых через параметры get-запроса данных
const dateValidator = require('./validators/db/date-validator')
const statusValidator = require('./validators/db/status-validator')
const teacherIdsValidator = require('./validators/db/teachers-ids-validator')
const studentsCountValidator = require('./validators/db/studentsCount-validator')
const pageValidator = require('./validators/db/page-validator')
const lessonsPerPageValidator = require('./validators/db/lessonsPerPage-validator')

const errorMiddleware = require('./middlewares/error-middleware')
const sequelize = require('./db/db')
require('./db/models/init-models')(sequelize)

const PORT = 8080

const app = express()
app.use(express.json())

app.post('/lessons',async (req, res, next) => {
    try {
        return res.json(await createLessons(req.body))
    } catch (e) { next(e); return}
})

app.get('',async (req, res, next) => {

    const params = {}
    const date = req.query.date;
    const status = req.query.status
    const teacherIds = req.query.teacherIds
    const studentsCount = req.query.studentsCount
    const page = req.query.page
    const lessonsPerPage = req.query.lessonsPerPage

    if (date) {
        try { dateValidator(date) } catch (e) { next(e); return }
        params.date = date.replace(/ /g, '');
    }

    if (status) {
        try { statusValidator(status) } catch (e) { next(e); return }
        params.status = status.replace(/ /g, '');
    }

    if (teacherIds) {
        try { teacherIdsValidator(teacherIds) } catch (e) { next(e); return }
        params.teacherIds = teacherIds.replace(/ /g, '');
    }

    if (studentsCount) {
        try { studentsCountValidator(studentsCount) } catch (e) { next(e); return }
        params.studentsCount = studentsCount.replace(/ /g, '');
    }

    if (page) {
        try { pageValidator(page) } catch (e) { next(e); return }
        params.page = page.replace(/ /g, '');
    } else {
        params.page = 1
    }

    if (lessonsPerPage) {
        try { lessonsPerPageValidator(lessonsPerPage) } catch (e) { next(e); return }
        params.lessonsPerPage = lessonsPerPage.replace(/ /g, '');
    } else {
        params.lessonsPerPage = 5
    }

    const result = await requestDb(params)

    res.json(result)
})

app.use(errorMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate();        
        console.log('\x1b[36m Соединение с базой данных установлено успешно. ✅\x1b[0m');
        app.listen(PORT, () => {
            console.log(`\x1b[36m Сервер слушает порт ${PORT}\x1b[0m\n`)
        })
    } catch (e) {
        console.log(e)
    }
} 

start()