const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Usage: node mongo.js db_password [name number] ')
  process.exit(1)
}

const password = process.argv[2]
// const url = `mongodb://master:${password}@docdb-2022-07-09-06-19-28.cluster-cptovljgkjpo.us-west-2.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`
const url = `mongodb://master:${password}@docdb-2022-07-09-06-19-28.cluster-cptovljgkjpo.us-west-2.docdb.amazonaws.com:27017/?retryWrites=false`
// const url = `mongodb://master:${password}@docdb-2022-07-09-06-19-28.cluster-cptovljgkjpo.us-west-2.docdb.amazonaws.com:27017/?directConnection=true`
console.log('Defining schema')

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

console.log('Defining Person')

const Person = mongoose.model('Person', personSchema)

console.log(`Connecting to ${url}`)
const cnx = mongoose.connect(url, {
  ssl: true,
  sslValidate: false
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
  })
    .then(() => {
      console.log('Done, closing connection!')
      mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  cnx.then((result) => {
    console.log('connected')
    const person = new Person({
      name,
      number
    })
    return person.save()
  })
    .then(() => {
      console.log('Done, closing connection!')
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}
