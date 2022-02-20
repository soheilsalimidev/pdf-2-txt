import { Server, Socket } from 'socket.io'
import jobQueue from './jobs'

const socket = require('socket.io')
const { Jobs } = require('./mongodb')
let serverG: Server | null = null
let io: Socket | null = null

export const sendServerStatus = async (socketId: string) => {
  const remainJobs = await Jobs()
  io?.to(socketId).emit('status', remainJobs - 1)
}

export const sendResult = (socketId: string, fileName: string) => {
  io?.to(socketId).emit('result', fileName)
}

export default (server: Server) => {
  if (!serverG) {
    serverG = server
    io = socket(serverG)
    io?.on('connection', async (socket: Socket) => {
      console.log('Made socket connection ' + socket.id)

      socket.on('addJob', async (job) => {
        await jobQueue.now('ocrPdf', {
          filename: job.savedFileName + '.pdf',
          lang: job.lang,
          output: job.output,
          socketId: socket.id
        })
      })

      await jobQueue.start()

      socket.on('disconnect', () => console.log('disconnected'))
    })
  }
}
