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
  require('./bin/functions.js').then(fnc => {
    mp.fnc = fnc
    mp.low = require('./bin/database.js')(db)
    require('./bin/init.js')()
    require('./bin/events.js')()
    require('./bin/express.js')()
  })
})
