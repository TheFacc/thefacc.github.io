import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()

  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Area, person, product, use_case } = db._tables
  // API to get all the areas
  app.get('/area', async (req, res) => {
    const area = await Area.findAll()
    return res.json(area)
  })
  // API to get an area by ID.
  app.get('/area/:id', async (req, res) => {
    const { id } = req.params
    const area = await Area.findOne({
      where: { id },
      include: { model: Person }, // -> this is the way we "include" also people inside area
      include: { model: Product }, // -> this is the way we "include" also products inside area
    })
    return res.json(area)
  })

  // API to get all the products
  app.get('/product', async (req, res) => {
    const product = await Product.findAll()
    return res.json(product)
  })
  // API to get an product by ID.
  app.get('/product/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id },
      include: { model: Person }, // -> this is the way we "include" also the referent of a product
      include: { model: Area }, // -> this is the way we "include" also the area of a product
      include: { model: Use_case }, // -> this include also the use cases of a product
    })
    return res.json(product)
  })

  // API to get all the people
  app.get('/person', async (req, res) => {
    const person = await Person.findAll()
    return res.json(person)
  })
  // API to get an product by ID.
  app.get('/person/:id', async (req, res) => {
    const { id } = req.params
    const person = await Person.findOne({
      where: { id },
      include: { model: Product }, // -> this include the product which he/she manages
      include: { model: Area }, // -> this include the area which he/she manages
    })
    return res.json(person)
  })
  //API to get all the people by area_id

  // This one is just an example
  app.get('/ad', (req, res) => {
    return res.json({
      url: 'https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/media/images/google-display-ads-example-2-final.png?oV7qevVB2XtFyF_O64TG6L27AFM3M2oL&itok=TBfuuTM_',
    })
  })
}

init()

export default app
