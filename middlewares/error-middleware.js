module.exports = function (err, req, res, next) {
    console.log(' \x1b[31m ApiError \x1b[0m 🚷', err.message, err)

    return res.status(400).json({
        message: err.message
    })
}