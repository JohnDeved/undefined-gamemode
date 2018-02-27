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
  require('./bin/functions.js').then(fnc => {
    mp.fnc = fnc
    mp.loki = require('./bin/database.js')(db)
    require('./bin/init.js')()
    require('./bin/events.js')()
    require('./bin/express.js')()
  })
}
