'use strict';

import express from 'express'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'

const upload = multer({ dest: 'uploads/' });
const app = express()

dotenv.config()
app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (_req, res) => {
    res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, _next) => {
    res.json({
        'original file name': req.file.originalname,
        'file name': req.file.filename,
        size: req.file.size,
    })
})

app.get('/hello', (_req, res) => {
    res.json({ greetings: 'Hello, API' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Your app is listening on port ' + port)
})
