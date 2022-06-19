import { useState, useEffect } from 'react'
import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PersonFilter from './components/PersonFilter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://ec2-35-88-179-67.us-west-2.compute.amazonaws.com:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')
  

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter newfilter={newFilter} setNewFilter={setNewFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      
      <Persons newFilter={newFilter} persons={persons} />
      
    </div>
  )
}

export default App
