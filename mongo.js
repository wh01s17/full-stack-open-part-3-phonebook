const mongoose = require('mongoose')

// 3.12
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.pvuql.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number
  })

  person.save()
    .then(result => {
      console.log(`added ${result.name} ${result.number} to phonebook`)
      mongoose.connection.close()
    })

} else {
  Person.find({})
    .then(result => {
      console.log('Phonebook')
      result.forEach(p => console.log(`${p.name} ${p.number}`))
      mongoose.connection.close()

    })
}

