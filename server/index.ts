import { Request, Response } from 'express'

const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

app.all('/getJSON', async (_: Request, res: Response) => {
  await res.send({ data: 'data' })
})

module.exports = app
