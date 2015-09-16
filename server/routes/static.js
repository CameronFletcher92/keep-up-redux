module.exports = function(app) {
  // static routes
  app.get('/bundle.js', function(req, res) {
    console.log('GET /bundle.js')
    res.sendFile('bundle.js', {root: './client/build/'})
  })

  app.get('*', function(req, res) {
    console.log('GET *')
    res.sendFile('index.html', {root: './client/build/'})
  })
}
