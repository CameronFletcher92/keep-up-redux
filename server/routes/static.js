'use strict'
module.exports = (app) => {
  // static routes
  app.get('/bundle.js', (req, res) => {
    console.log('GET /bundle.js')
    res.sendFile('bundle.js', { root: './client/build/' })
  })

  app.get('/*', (req, res) => {
    if (req.isAuthenticated() && req.user) {
      res.cookie('userid', req.user._id, { maxAge: 2592000000 })
    } else {
      res.clearCookie('userid')
    }

    console.log('GET /*')
    res.sendFile('index.html', { root: './client/build/' })
  })
}
