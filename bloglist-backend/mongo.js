require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length !== 2 && process.argv.length !== 6) {
  console.log('Usage: node mongo.js [title author url likes ] ')
  process.exit(1)
}

// To be completed.
