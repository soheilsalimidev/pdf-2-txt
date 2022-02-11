import { Collection } from 'mongodb'

const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'PDS'
let dbG: any = null

export const Jobs = async (): Promise<number> => {
  const collection: Collection = dbG.collection('jobs')
  const jobsInWork = await collection.find({ 'lastFinishedAt': { $exists: false } }).toArray()
  return jobsInWork.length
}

export const connect = async () => {
  if (!dbG) {
    await client.connect()
    console.log('Connected successfully to server')
    dbG = client.db(dbName)
    Jobs().then()
  }
}
