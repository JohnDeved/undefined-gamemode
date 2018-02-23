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
  const low = require('./bin/database.js')(db)
  require('./bin/events.js')(low)
  require('./bin/express.js')(low)
})
