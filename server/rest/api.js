import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()

  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Area, Person, Product, Usecase } = db._tables
  console.log('TABLE:', Area)
  //*****   API: get areas   *****//
  app.get('/area', async (req, res) => {
    const area = await Area.findAll()
    // Sort by ID. This works well in the api url, but somehow not in the page where the app is used. Computers!
    return res.json(
      area.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    )
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
      include: [
        { model: Person },
        // { model: Usecase } // I can't make it work
      ],
    })
    return res.json(product)
  })
  // by area - get it from areas[i].products[:]

  //*****   API: get people   *****//
  // all
  app.get('/person', async (req, res) => {
    const person = await Person.findAll()
    return res.json(person)
  })
  // single
  app.get('/person/:id', async (req, res) => {
    const { id } = req.params
    const person = await Person.findOne({ where: { id } })
    return res.json(person)
  })
  // by area_id - get it from areas[i].people[:]

  //*****   API: get use cases of a product   *****//
  app.get('/usecases', async (req, res) => {
    const usecase = await Usecase.findAll()
    return res.json(usecase)
  })
  app.get('/usecases/:id', async (req, res) => {
    const { id } = req.params
    const usecase = await Usecase.findAll({ where: { usecase_of: id } }) // DOESNT WORK EVEN THO ITS THE FREAKIN SAME
    return res.json(usecase)
  })
}

init()

export default app
