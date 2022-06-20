import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PersonFilter from './components/PersonFilter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const handleNameChange = (event) => {
    console.log(event)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event)
    setNewNumber(event.target.value)
  }

 const addPerson =  (event) => {
    event.preventDefault()
    console.log(event, persons, newName, newNumber)
    const found = persons.find(p => p.name === newName)
    if (found) {
      if (!window.confirm(`Person ${newName} already exists in our db, confirm the update?`)) return
      
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (found) {
      personService.update(found.id, personObject)
          .then(newPerson => {
            console.log(newPerson)
            setPersons(persons.filter(p => p.id !== newPerson.id)
                              .concat(newPerson))
            setNewName('')
            setNewNumber('')
          })
    } else {
      personService.create(personObject)
          .then(newPerson => {
              console.log(newPerson)
              setPersons(persons.concat(newPerson))
              setNewName('')
              setNewNumber('')
      })
    }
  }

  const deletePerson = (person) => {
    console.log(`Delete ${person}`)
    if (!window.confirm(`Are you sure you want to delete ${person.name}?`)) return
    personService.deleteItem(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          })
  }

  useEffect(() => {
    console.log('effect')
    personService.getAll()
      .then(personsFromServer => setPersons(personsFromServer))
  }, [])
  console.log('render', persons.length, 'notes')
  

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter newfilter={newFilter} setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}
                  addPerson={addPerson} />
      <h2>Numbers</h2>
      
      <Persons newFilter={newFilter} persons={persons} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App
