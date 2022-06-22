const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  console.log((request.headers))
  console.log(request.headers['x-forwarded-for'] || request.socket.remoteAddress) 
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  response.send(`<h1>Phonebook has info for ${persons.length} people</h1><br>${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  console.log(request)
  const id = Math.floor(Math.random() * 9876543)
  console.log(id)
  const newPerson = {
    name: request.body.name,
    number: request.body.number,
    id: id,
  }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})