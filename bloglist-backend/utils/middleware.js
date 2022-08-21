const jwt = require('jsonwebtoken')

const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info(`${request.method} ${request.path} ${JSON.stringify(request.body)}`)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: `invalid token -- ${error.message}`})
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log(`Decoded token: ${JSON.stringify(decodedToken)}`)

  if (decodedToken && decodedToken.id) {
    const user = await User.findById(decodedToken.id)
    if (user) {
      request.user = user
    } else {
      console.log(`No user found from decoded token: ${decodedToken.id}`)
    }
  }
  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}