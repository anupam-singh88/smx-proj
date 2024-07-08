const NotFoundError = require("../errors/not-found")

const notFound = (req, res) => {
    throw new NotFoundError('Resource not found !!!')
}

module.exports = notFound
