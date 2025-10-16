import { useState, useEffect } from 'react'
import axios from 'axios'

import Search from './components/Search'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import './App.css'


function App() {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchTerm, setSearchTerm] = useState('')

useEffect(() => {
    axios
    .get('http://localhost:3001/api/persons')
    .then(res => {
      console.log('数据拿到啦');
      setPersons(res.data);
    })
}, [])

  // 过滤联系人
  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 处理搜索输入变化
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    // console.log('searchTerm:', e.target.value)
  }

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPerson({ ...newPerson, [name]: value })
    // console.log('newPerson:', { ...newPerson, [name]: value });
    
  }

  // 处理添加新联系人
  const handleSubmit = (e) => {
    e.preventDefault()
    const isNameExists = persons.some(person => person.name === newPerson.name)
    if (isNameExists) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      axios
      .post('http://localhost:3001/api/persons', newPerson)
      .then(res => {
          console.log('添加成功:', res.data);
          setPersons(persons.concat(res.data))
        })
    }
    setNewPerson({ name: '', number: '' })
  }

  return(
    <>
      <h1>Phonebook</h1>
      
      <Search 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      
      <PersonList persons={filteredPersons} />
      
      <PersonForm 
        newPerson={newPerson}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default App
