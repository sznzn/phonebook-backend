const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <div>Search:</div>
      <input 
        value={searchTerm} 
        onChange={onSearchChange} 
        placeholder="搜索联系人..."
      />
    </div>
  )
}

export default Search