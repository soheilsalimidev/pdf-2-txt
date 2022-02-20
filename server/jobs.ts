import { exec } from 'child_process'
import { join } from 'path'
import Agenda, { Job } from 'agenda'
import { sendResult, sendServerStatus } from './socketConnections'

const jobQueue = new Agenda({
  defaultConcurrency: 2,
  lockLimit: 2,
  db: {
    address: 'mongodb://localhost:27017/PDS',
    collection: 'jobs'
  }
})

jobQueue.define('ocrPdf', {}, async (job: Job) => {
  const pdfPath = job?.attrs?.data?.filename

  try {
    await sendServerStatus(job?.attrs?.data?.socketId)
    if (job?.attrs?.data?.output === 'wordOcr' || job?.attrs?.data?.output === 'pdf') {
      await new Promise((resolve, reject) => {
        exec(
          `ocrmypdf -l ${job?.attrs?.data?.lang} --rotate-pages --deskew --jobs 4 --force-ocr --output-type${job?.attrs?.data?.output === 'pdf' ? ' pdfa' : '=none --sidecar "' + join(__dirname, '../static/uploads/pdfs/', pdfPath + 'ocr.txt"')} "${join(__dirname, '../static/uploads/pdfs/', pdfPath)}"  ${job?.attrs?.data?.output === 'pdf' ? '"' + join(__dirname, '../static/uploads/pdfs/', pdfPath + 'ocr.pdf') + '"' : '-'}`,
          (error, _, stderr) => {
            if (error) {
              console.log(error)
              return reject(error)
            }
            if (stderr) {
              sendResult(job?.attrs?.data?.socketId, pdfPath + 'ocr' + (job?.attrs?.data?.output === 'pdf' ? '.pdf' : '.txt'))
              return resolve
            }
          })
      })
    }
  } catch (e: any) {
    job.fail(e)
  }
})

jobQueue.on('start', (job: Job) => {
  console.log('Job %s starting for %s', job.attrs.name, job?.attrs?.data?.filename)
})

jobQueue.start().then()

export default jobQueue
