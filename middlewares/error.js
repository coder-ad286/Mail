const error = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if (process.env.ENVIROMENT === "development") {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack
        })
    }
    if (process.env.ENVIROMENT === "production") {
        res.status(err.statusCode).json({
            success: false,
            message:  err.message || 'Internal Server Error',
        })
    }
}
export default error;