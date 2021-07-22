const { Sequelize, DataTypes } = require('sequelize')

// Development
// const db = new Sequelize(
//   'postgres://postgres:prova123@localhost:5432/test-database'
// )
// Production
const pg = require('pg')
pg.defaults.ssl = true

// HEROKU:
const dburl = process.env.DATABASE_URL
// LOCAL:
// const dburl = 'longlink'
const db = new Sequelize(dburl, {
  ssl: true,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
})

/**
 * Function to define the structure of the database
 */
function defineDatabaseStructure() {
  // Area
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
  // Product
  const Product = db.define(
    'product',
    {
      name: DataTypes.STRING,
      intro: DataTypes.TEXT,
      introShort: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  )
  // Product use cases
  const Usecase = db.define(
    'usecase',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  )
  // Person
  const Person = db.define(
    'person',
    {
      name: DataTypes.STRING,
      role: {
        type: Sequelize.ENUM,
        values: [
          'Chief Executive Officer',
          'General Manager',
          'Chief Financial Officer',
          'Human Resources',
          'Chief Marketing Officer',
          'Area manager',
          'Chief Research Officer',
          'Product Referent',
        ],
      },
      image: DataTypes.STRING,
      in_link: DataTypes.STRING,
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  )
  // Blog
  const Article = db.define(
    'articles',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      summary: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  )
  const Comment = db.define(
    'comments',
    {
      author: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      underscored: true,
    }
  )

  // More on association: https://sequelize.org/master/manual/assocs.html
  // Creating the 1 -> N association between Area and People
  Area.hasMany(Person)
  // Creating the 1 -> N association between Area and Products
  Area.hasMany(Product)
  // Creating the 1 -> 1 association between Area and Manager
  Area.hasOne(Person, { foreignKey: 'managerOf' })
  // Creating the 1 -> N association between Products and Usecase
  Product.hasMany(Usecase, { foreignKey: 'usecaseOf' })
  // Creating the 1 -> 1 association between Product and ProductReferent
  Product.hasOne(Person, { foreignKey: 'referentOf' })
  // Creating the 1 -> N association between Article and Comment
  Article.hasMany(Comment, { foreignKey: 'article_id' })

  // Filling DB
  db._tables = {
    Area,
    Person,
    Product,
    Usecase,
    Article,
    Comment,
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
