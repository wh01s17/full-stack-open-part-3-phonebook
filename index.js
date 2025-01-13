const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
// app.use(morgan('tiny'))

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
))

app.use(cors())
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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.send(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    const info = persons.length
    const date = new Date()

    response.send(
        `<p>Phonebook has info for ${info} people</p>
        <p>${date.toString()}</p>`
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
    let id

    do {
        id = Math.floor(Math.random() * 1000)
    } while (persons.some(person => person.id === id))

    return id
}

const nameExists = (name) => {
    return persons.some(p => p.name === name)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if (nameExists(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
