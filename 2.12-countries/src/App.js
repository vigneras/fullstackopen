import {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'

function App() {
  const [countries, setNewCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setNewCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
   

  const handleFilterChange = (event) => {
    console.log(event)
    setNewFilter(event.target.value)
  }
 
  
  const common =  
        <> 
        Search for countries: <input value={newFilter} onChange={handleFilterChange} /> 
        </>
  let countriesToDisplay = countries.filter(country => country.name.common.toUpperCase().includes(newFilter.toUpperCase()))
  if (countriesToDisplay.length >= 10) {
    return (
      <div>
        {common}
        <br/>
        Too many countries to display, use filter
      </div>
    )
  }
  
  
  
  return (
  <div>
     {common}
     <Countries countries={countriesToDisplay} />
   </div>
   
  )
}


export default App;
