import React from 'react'

import Person from './Person'

const Persons = ({ newFilter, persons }) => {
  // console.log(person)

  return (
    <ul>
        {persons.filter(person => 
                      person.name.toUpperCase().includes(newFilter.toUpperCase()))
              .map(person => <li key={person.id}> <Person  person={person} /> </li>)
      }
    </ul>

  )
}

export default Persons