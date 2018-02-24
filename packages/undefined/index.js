const lowdb = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')
const adapter = new FileAsync(`${__dirname}/db.json`)

// const ipc = require('node-ipc')

// ipc.config.id = 'spawn'
// ipc.connectTo('host', ipc => {
//   const host = ipc.of.host
//   host.on('connect', () => {
//     host.emit('spawnMessage', 'The message we send')
//   })
// })

lowdb(adapter).then(db => {
  mp.low = require('./bin/database.js')(db)
  mp.fnc = require('./bin/functions.js')
  require('./bin/init.js')()
  require('./bin/events.js')()
  require('./bin/express.js')()
})
