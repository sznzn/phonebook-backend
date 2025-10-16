const PersonForm = ({ newPerson, onInputChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input 
          name="name" 
          value={newPerson.name} 
          onChange={onInputChange} 
        />
      </div>
      <div>
        number: <input 
          name="number" 
          value={newPerson.number} 
          onChange={onInputChange} 
        />
      </div>
      <button type='submit'>Add</button>
    </form>
  )
}

export default PersonForm