const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/express-test', { useNewUrlParser: true, useUnifiedTopology: true })

const Product = mongoose.model('Product', new mongoose.Schema({
  title: String
}))

// Product.insertMany([
//   { title: '产品一' },
//   { title: '产品二' },
//   { title: '产品三' }
// ])

// 查
app.get('/api/products', async function(req, res) {
  // const data = await Product.find().skip(1).limit(2)
  const data = await Product.find().sort({_id: -1})
  res.send(data)
})

app.get('/api/products/:id', async function(req, res) {
  console.log(req.params)
  const data = await Product.findById(req.params.id)
  res.send(data)
})

app.use('/public', express.static('public'))

app.get('/', function(req, res) {
  res.send('hello node express')
})

// 增
app.post('/api/products', async function(req, res) {
  const data = req.body
  const product = await Product.create(data)
  res.send(product)
})

// 更 patch（部分更新） 和 put（整个更新）
app.put('/api/products/:id', async function (req, res) {
  const product = await Product.findById(req.params.id)
  product.title = req.body.title
  await product.save()
  res.send(product)
})

// 删
app.delete('/api/products/:id', async function(req, res) {
  const product = await Product.findById(req.params.id)
  await product.remove()
  res.send({
    success: true
  })
})

app.listen(3000, function(req, res) {
  console.log('express is listening port 3000');
})