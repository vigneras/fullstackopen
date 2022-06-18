import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    console.log(event)
    setNewName(event.target.value)
  }
  
  const addName =  (event) => {
    event.preventDefault()
    console.log(event, persons, newName)
    if (persons.find(p => p.name === newName)) {
      alert(`Provided name ${newName} already exists in our db`)
      return
    }
    const personObject = {
      name: newName,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange} />
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
