const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/express-test', { useNewUrlParser: true, useUnifiedTopology: true })

const Product = mongoose.model('Product', new mongoose.Schema({
  title: String
}))

// Product.insertMany([
//   { title: '产品一' },
//   { title: '产品二' },
//   { title: '产品三' }
// ])

app.get('/api/products', async function(req, res) {
  res.send(await Product.find())
})

app.use('/public', express.static('public'))

app.get('/', function(req, res) {
  res.send('hello node express')
})

app.listen(3000, function(req, res) {
  console.log('express is listening port 3000');
})