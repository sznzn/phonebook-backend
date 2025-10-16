import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
// 使用环境变量端口，云平台会自动分配端口
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use(express.static('dist'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]


app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

app.get('/info', (req, res) =>{
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
    res.send(info)
})
app.get('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).send({ error: 'Person not found' })
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if (!persons.find(person => person.id === id)) {
        return res.status(404).send({ error: 'Person not found' })
    } else {
        persons = persons.filter(person => person.id !== id)
        res.status(204).end()
    }
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body
    if (!name || !number) {
        return res.status(400).json({ error: 'Name or number is missing' })
    } else if (persons.find(person => person.name === name)) {
        return res.status(400).json({ error: 'Name must be unique' })
    }
    const id = persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 1
    const newPerson = { id, name, number }
    persons.push(newPerson)
    res.status(201).json(newPerson)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
