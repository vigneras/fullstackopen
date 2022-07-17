const PersonFilter = ({newFilter, setNewFilter}) => { 
  console.log(newFilter, setNewFilter)

  const handleFilterChange = (event) => {
    console.log(event)
    setNewFilter(event.target.value)
  }
 
  return (
    <div>
     Filter shown with: <input 
                            value={newFilter}
                            onChange={handleFilterChange} />
   </div>
      )
}

export default PersonFilter