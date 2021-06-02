const { Sequelize, DataTypes } = require('sequelize')

// Development
// const db = new Sequelize(
//   'postgres://postgres:prova123@localhost:5432/test-database'
// )
// Production
const pg = require('pg')
pg.defaults.ssl = true
const db = new Sequelize(process.env.DATABASE_URL, {
  ssl: true,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
})

/**
 * Function to define the structure of the database
 */
function defineDatabaseStructure() {
  // area
  const Area = db.define(
    'area',
    {
      name: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      shortIntro: DataTypes.TEXT,
      introduction: DataTypes.TEXT,

      path: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  )
  //Person
  const Person = db.define(
    'person',
    {
      name: DataTypes.STRING,
      role: {
        type: Sequelize.ENUM,
        values: ['manager', 'referent'],
      },
      image_src: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      in_link: DataTypes.STRING,
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  )
  //product
  const Product = db.define(
    'product',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image_src: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  )
  //use case
  const UseCase = db.define(
    'useCase',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image_src: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  )
  // More on association: https://sequelize.org/master/manual/assocs.html

  // Creating the 1 -> N association between Area and People
  Area.hasMany(Person)
  db._tables = {
    Area,
    Person,
  }

  // Creating the 1 -> N association between Area and Products
  Area.hasMany(Product)
  db._tables = {
    Area,
    Product,
  }
  // Creating the 1 -> N association between Products and UseCase
  Product.hasMany(UseCase)
  db._tables = {
    UseCase,
    Product,
  }
  // Creating the 1 -> 1 association between Products and Person
  // the product has one referent
  Person.hasOne(Product, { foreignKey: 'referentId' })
  db._tables = {
    Product,
    Person,
  }

  // Creating the 1 -> 1 association between Area and Person
  // the area has one manager
  Area.hasOne(Person, { foreignKey: 'managerOf' })
  db._tables = {
    Area,
    Person,
  }
}

/**
 * Function to insert some fake info in the database
 */
// NOTA problema: come associo le persone all'area?
async function insertFakeData() {
  const { Person, Area, Product } = db._tables
  // Create the first Person
  const person1 = await Person.create({
    name: 'Bob Minion',
    role: 'manager',
    image_src: '~./assets/people/Bob_Minion.jpg',
  })

  // create the second person
  const person2 = await Person.create({
    name: 'Wllie Space',
    role: 'referent',
    image_src: '~./assets/people/Wallie_Space.jpg',
  })

  //create Areas
  const analysis = await Area.create({
    title: 'Analytiscs',
    introduction: 'Analytics is very cool, you can do lots of stuff! Enjoy us',
  })
  const blockchain = await Area.create({
    title: 'Block Chain',
    introduction:
      'Block Chain is very cool, you can do lots of stuff! Enjoy us',
  })
  const cloud = await Area.create({
    title: 'Cloud computation',
    introduction:
      'Cloud computation is very cool, you can do lots of stuff! Enjoy us',
  })
  const machine = await Area.create({
    title: 'Machine Learning',
    introduction:
      'Machine Learning is very cool, you can do lots of stuff! Enjoy us',
  })

  // Adding the people to area
  await analysis.addPerson(person1.id)
  // Adding the second comment to the first article
  await cloud.addComment(person2.id)
}
/**
 * Function to initialize the database. This is exported and called in the main api.js file
 */
async function initializeDatabase() {
  // Call the function for the database structure definition
  defineDatabaseStructure()
  // Synchronize Sequelize with the actual database
  await db.sync({ force: false }) // !! resets the db !! set to 'false' for production
  // Call the function to insert some fake data
  //await insertFakeData()
  return db
}

export default initializeDatabase
