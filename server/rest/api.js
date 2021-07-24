import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())

async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()

  // Let's extract all the objects we need to perform queries inside the endpoints
  const { Area, Person, Product, Usecase, Article, Comment } = db._tables
  //*****   API: get areas   *****//
  // - get all areas
  app.get('/area', async (req, res) => {
    const area = await Area.findAll()
    // Sort by ID. This works well in the api url, but somehow not in the page where the api is used. Computers!
    return res.json(
      area.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))
    )
  })
  // get specific area + its products
  app.get('/area/:id', async (req, res) => {
    const { id } = req.params
    const area = await Area.findOne({
      where: { id },
      include: [{ model: Person }, { model: Product }],
    })
    return res.json(area)
  })
  // get specific product from specific area
  app.get('/area/:aid/:pid', async (req, res) => {
    const { aid, pid } = req.params
    const product = await Product.findOne({
      where: { id: pid, areaId: aid },
    })
    return res.json(product)
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

  //*****   API: get blog articles   *****//
  app.get('/article', async (req, res) => {
    const article = await Article.findAll()
    return res.json(article)
  })
  app.get('/article/:id', async (req, res) => {
    const { id } = req.params
    const article = await Article.findOne({
      where: { id },
      include: { model: Comment },
    })
    return res.json(article)
  })
}

init()

export default app
