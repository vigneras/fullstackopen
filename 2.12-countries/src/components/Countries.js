import {useState} from 'react'
import Country from './Country'
import Button from './Button'

const Countries = ({ countries }) => { 
//   console.log(countries)
  const [selected, setSelected] = useState(-1)

  const handleQuickShowClick = (idx) => {
      console.log(idx)
      if (idx === selected) {
          setSelected(-1)
          return
      } 
      setSelected(idx)
  }

  return (
    <>
    <ul>
        {countries.map((country, idx) => 
            <li key={idx}>
                <Country country={country} shortDisplay={countries.length !== 1 && idx !== selected } />
                
                <Button handleClick={() => handleQuickShowClick(idx)} text="show" display={countries.length !== 1} />
            </li>
            )
        }
    </ul>
    </>
 )
}

export default Countries