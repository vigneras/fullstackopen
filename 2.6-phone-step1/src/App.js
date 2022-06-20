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
    if (persons.find(p => p.name === newName)) {
      alert(`Provided name ${newName} already exists in our db`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
    }
    
    personService.create(personObject)
    .then(newPerson => {
              console.log(newPerson)
              setPersons(persons.concat(newPerson))
              setNewName('')
              setNewNumber('')
    })
  }

  const deletePerson = (id) => {
    console.log(`Delete ${id}`)
    
    personService.deleteItem(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
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
