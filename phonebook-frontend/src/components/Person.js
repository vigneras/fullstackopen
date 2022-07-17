import React from 'react'

const Person = ({ person }) => { 
  // console.log(person)
  
  return (
    <>
    {person.name} {person.number}
    </>
  )
}

export default Person