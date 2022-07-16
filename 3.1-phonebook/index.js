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

app.get('/api/persons/:id', (request, response) => {
  // console.log(request, response)
  const id = request.params.id
  console.log(`Fetching id: ${id})`)
  Person.findById(id).then(person => {
                                      response.json(person)
                          })
})


app.delete('/api/persons/:id', (request, response) => {
  // console.log(request, response)
  const id = request.params.id
  console.log(`Deleting ${id}`)
  Person.deleteOne({ id: id })
  .then(() => {
    response.status(204).end()
  }).catch(err => {
    response.status(500).end()
  })
})

app.post('/api/persons/', (request, response) => {
  console.log(request, response)
  
  const person = request.body
  
  if (!person || !person.name || !person.number) {
      return response.status(400).json({
        error: `Content is missing` 
      })
  }
  
  if (Person.find({ name: person.name })) {
    return response.status(400).json({
      error: `${person.name} already exists` 
      })
  }
  
  const p = new Person({
    name: person.name,
    number: p.number
  })

  p.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})