import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()

  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Area, Person, Product, useCase } = db._tables

  //*****   API: get areas   *****//
  app.get('/area', async (req, res) => {
    const area = await Area.findAll()
    return res.json(area)
  })
  app.get('/area/:id', async (req, res) => {
    const { id } = req.params
    const area = await Area.findOne({
      where: { id },
      include: [{ model: Person }, { model: Product }],
    })
    return res.json(area)
  })

  //*****   API: get products   *****//
  // all
  app.get('/product', async (req, res) => {
    const product = await Product.findAll()
    return res.json(product)
  })
  // single
  app.get('/product/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id },
      include: [{ model: Person }, { model: Area }, { model: useCase }],
    })
    return res.json(product)
  })
  // by area
  app.get('/area/product-:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findAll({
      where: { area_id: id },
      include: [{ model: Person }, { model: Area }, { model: useCase }],
    })
    return res.json(product)
  })

  //*****   API: get people   *****//
  // all
  app.get('/person', async (req, res) => {
    const person = await Person.findAll()
    return res.json(person)
  })
  // single
  app.get('/person/:id', async (req, res) => {
    const { id } = req.params
    const person = await Person.findOne({
      where: { id },
      include: [{ model: Product }, { model: Area }],
    })
    return res.json(person)
  })
  // by area_id
  app.get('/area/:id/people', async (req, res) => {
    const { id } = req.params
    const area_People = await Person.findAll({
      where: { area_id: id },
    })
    return res.json(area_People)
  })

  //*****   API: get use cases of a product   *****//
  app.get('/product/:id/usecases', async (req, res) => {
    const { id } = req.params
    const product_useCases = await useCase.findAll({
      where: { product_id: id },
    })
    return res.json(product_useCases)
  })

  // This one is just an example
  app.get('/ad', (req, res) => {
    return res.json({
      url:
        'https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/google-display-ads-example-2-final.png?oV7qevVB2XtFyF_O64TG6L27AFM3M2oL&itok=TBfuuTM_',
    })
  })
}

init()

export default app
