const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer')
const Micropub = require('micropub-helper')
const shorthash = require('shorthash')

// const storage = multer.memoryStorage();
const upload = multer({
  // storage: storage,
  dest: './tmp',
  limits: { fileSize: 50 * 1024 * 1024 },
})

let micropub = new Micropub({
  clientId: process.env.URL,
  redirectUri: process.env.URL,
  scope: 'create',
})

const applyMicropubOptions = (options) => {
  for (const key in options) {
    if (options[key]) {
      micropub.options[key] = options[key]
    }
  }
}

const server = express()

server.use(cors())
server.use(bodyParser.json({ limit: '50mb' }))

// Serve the static build folder
server.use(express.static('build'))

// Get the authentication url
server.post('/authurl', function (req, res, next) {
  applyMicropubOptions(req.body)
  micropub
    .getAuthUrl()
    .then((url) =>
      res.json({
        url: url,
        authEndpoint: micropub.options.authEndpoint,
        tokenEndpoint: micropub.options.tokenEndpoint,
        micropubEndpoint: micropub.options.micropubEndpoint,
      })
    )
    .catch(next)
})

// Get the access token
server.post('/token', function (req, res, next) {
  applyMicropubOptions(req.body)
  micropub
    .getToken(req.body.code)
    .then((token) => {
      micropub.options.token = token
      micropub
        .query('config')
        .then((data) => {
          if (data && data['media-endpoint']) {
            res.json({
              token: token,
              mediaEndpoint: data['media-endpoint'],
            })
          } else {
            next(new Error('Missing media endpoint'))
          }
        })
        .catch(next)
    })
    .catch(next)
})

// Upload a file to the media endpoint
server.post('/media', upload.single('file'), function (req, res, next) {
  if (req.body && req.body.mediaEndpoint && req.body.token && req.file) {
    req.setTimeout(0) // Disable timeouts
    applyMicropubOptions(req.body)
    const folder = __dirname + '/tmp/' + shorthash.unique(req.body.token)
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    const filePath = folder + '/' + req.file.originalname
    fs.renameSync(req.file.path, filePath)

    micropub
      .postMedia(fs.createReadStream(filePath))
      .then((url) => {
        fs.unlinkSync(filePath)
        res.json({ url: url })
      })
      .catch((err) => {
        fs.unlinkSync(filePath)
        next(err)
      })
  } else {
    next(new Error('Missing parameters'))
  }
})

// Send the photo micropub
server.post('/photo', function (req, res, next) {
  applyMicropubOptions(req.body.user)
  micropub
    .create(req.body.micropub, 'json')
    .then((url) => res.json({ url: url }))
    .catch(next)
})

// Send gallery micropub
server.post('/gallery', function (req, res, next) {
  applyMicropubOptions(req.body.user)
  micropub
    .create(req.body.micropub, 'json')
    .then((url) => res.json({ url: url }))
    .catch(next)
})

// Error handler
server.use((err, req, res, next) => {
  if (err && err.error && err.error.response && err.error.response.data) {
    console.log('Error Response', err.error.response.data)
  } else {
    console.log('Ran into an error:', err)
  }
  res.status(err.status || 500)
  if (err.message) {
    err = err.message
  }
  res.json({ error: err })
})

server.listen(process.env.PORT || 10003, () =>
  console.log(
    process.env.NODE_ENV === 'production'
      ? 'App started on port ' + (process.env.PORT || 10003)
      : 'Development api server started',
    server.name
  )
)
