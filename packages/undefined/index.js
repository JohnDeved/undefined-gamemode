const lowdb = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter = new FileAsync(`${__dirname}/db.json`)

lowdb(adapter).then(db => {
  require('./bin/functions.js').then(fnc => {
    mp.fnc = fnc
    mp.low = require('./bin/database.js')(db)
    require('./bin/init.js')()
    require('./bin/events.js')()
    require('./bin/express.js')()
  })
})
