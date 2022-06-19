import React from 'react'
import Languages from './Languages'

const Country = ({ country, shortDisplay }) => { 
  console.log(country)
  
  const common = <b>{country.name.common}</b>
  if (shortDisplay) {
    return <>{common}</>
  }
  return (
    <>
    {common}
    <ul>
      <li>Capital: {country.capital} </li>
      <li>Area: {country.area}</li>
      <li><Languages languages={country.languages} /> </li>
    </ul>
    <img src={country.flags.png} alt="Flag of {country.name.common}" width="150"/>
    </>
  )
}

export default Country