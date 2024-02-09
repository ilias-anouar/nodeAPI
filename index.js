const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const result = dotenv.config()

const app = express()
const port = result.parsed.PORT
const v = result.parsed.VERSION
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const routes = require("./routes");
app.use(`/api/${v}`, routes);


app.get('/', async (req, res) => {
    res.status(200).send('Hello, world !')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))