const Loki = require('lokijs')
const Lfsa = require('../../modules/loki-fs-structured-adapter.js')

const adapter = new Lfsa()
const db = new Loki('./db/undefined.db', {
  adapter: adapter,
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000
})

function databaseInitialize () {
  require('./js/functions.js').then(() => {
    mp.loki = require('./js/database.js')(db)
    require('./js/init.js')()
    require('./js/events.js')()
    require('./js/express.js')()
  })
}
