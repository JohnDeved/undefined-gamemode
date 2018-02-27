const express = require('express')
const logger = require('morgan')
const app = express()

module.exports = () => {
  app.set('views', `${__dirname}/../views`)
  app.set('view engine', 'ejs')
  app.use(logger('dev'))
  app.use(express.static(`${__dirname}/..//public`))
  app.get('/:sid', (req, res) => {
    let playerInfo = mp.loki.players.findOne({ sid: req.params.sid })
    if (playerInfo) {
      res.render('ui')
    }
  })

  app.listen(mp.config.express)
}
