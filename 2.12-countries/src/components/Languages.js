import React from 'react'

const Languages = ({ languages }) => { 
  console.log(languages)
  
  return (
    <>
    <h3>Languages</h3>
    <ul>
      {Object.entries(languages).map(e => <li key={e[0]}> {e[1]} </li>)}
    </ul>
    </>
  )
}

export default Languages