const { Sequelize, DataTypes } = require('sequelize')

// Development
// const db = new Sequelize(
//   'postgres://postgres:prova123@localhost:5432/test-database'
// )
// Production
const pg = require('pg')
pg.defaults.ssl = true
// HEROKU:
const db = new Sequelize(process.env.DATABASE_URL, {
  // LOCAL:
  // const db = new Sequelize( 'longlink',
  //   {
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
      introShort: DataTypes.TEXT,
      intro: DataTypes.TEXT,
      color: DataTypes.STRING,
      icon: DataTypes.STRING,
      image: DataTypes.STRING,
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
  // Creating the 1 -> N association between Area and Products
  Area.hasMany(Product)
  // Creating the 1 -> N association between Products and UseCase
  Product.hasMany(UseCase)
  // Creating the 1 -> 1 association between Products and Person
  // the product has one referent
  Person.hasOne(Product, { foreignKey: 'referentId' })
  // Creating the 1 -> 1 association between Area and Person
  // the area has one manager
  Area.hasOne(Person, { foreignKey: 'managerOf' })
  db._tables = {
    Area,
    Person,
    Product,
    UseCase,
  }
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
