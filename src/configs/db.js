require('dotenv').config() //initialize dotenv config

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'emotemysql.com',
    user: process.env.DB_USER || 'bfzxXkUDdw',
    password: process.env.DB_PASSWORD || 'zGjlbWkKyl',
    database: process.env.DB_NAME || 'bfzxXkUDdw'
})

connection.connect((err) => {
    if (err) console.log(`Error ${err}`)
})

module.exports = connection