import { Request, Response } from 'express'
import socket from './socketConnections'

const multer = require('multer')
const storage = multer.diskStorage({
  destination (_: Request, __: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
    callback(null, './static/uploads/pdfs')
  },
  filename (_: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    callback(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
  }
})
const upload = multer({ storage })
const bodyParser = require('body-parser')
const app = require('express')()

app.use(bodyParser.json())

const { connect } = require('./mongodb')

connect().then()

app.all('/', async (_: Request, res: Response) => {
  await res.send({ data: 'data' })
})

app.post('/upload/file', upload.single('file'), async (req: Request, res: Response) => {
  await res.send({ fileName: req.file?.filename.split('.')[0] })
})

app.post('/ocr/:file', (_: Request, res: any) => {
  socket(res.connection.server)
  res.sendStatus(200)
})

module.exports = app
