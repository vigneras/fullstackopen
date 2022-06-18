import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '666777999' }
  ]) 
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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} />
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map(person => <li> <Person person={person} /> </li>)}
      </ul>
    </div>
  )
}

export default App
