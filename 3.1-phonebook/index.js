require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')


app.use(cors())

app.use(express.json())

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (request, response) => {
  // console.log(request, response)
  Person.find({}).then(persons => {
  	      response.json(persons)
	  	    })
})

app.get('/api/info', (request, response) => {
  console.log(request, response)
  Person.count().then(result => {
    response.send(`<h1>Phonebook has info for ${result} people</h1><br>${new Date()}`)    
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  // console.log(request, response)
  const id = request.params.id
  console.log(`Fetching id: ${id})`)
  Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(err => next(err))
})


app.delete('/api/persons/:id', (request, response, next) => {
  // console.log(request, response)
  const id = request.params.id
  console.log(`Deleting ${id}`)
  Person.findByIdAndRemove(id)
  .then(() => {
    response.status(204).end()
  }).catch(err => next(err))
})

app.post('/api/persons/', (request, response, next) => {
  console.log(request, response)
  
  const person = request.body
  
  if (!person || !person.name || !person.number) {
      return response.status(400).json({
        error: `Content is missing` 
      })
  }
  
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})
  

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})