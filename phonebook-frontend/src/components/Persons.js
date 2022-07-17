import React from 'react'

import Person from './Person'
import Button from './Button'

const Persons = ({ newFilter, persons, deletePerson }) => {
  console.log(deletePerson)

  return (
    <ul>
        {persons.filter(person => 
                      person.name.toUpperCase().includes(newFilter.toUpperCase()))
              .map(person => 
                  <li key={person.id}> 
                      <Person person={person} /> <Button text="Delete" handleClick={() => deletePerson(person)} />
                  </li>)
      }
    </ul>

  )
}

export default Persons