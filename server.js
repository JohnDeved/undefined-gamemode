const fs = require('fs')
const ipc = require('node-ipc')
const spawn = require('child_process').spawn
const find = require('find-process')
const handlebars = require('handlebars')
const jso = require('javascript-obfuscator')
const config = require('./conf')

// const handleMessage = msg => console.log(msg)

find('name', 'server.exe').then(list => {
  list.forEach(p => {
    process.kill(p.pid)
  })

  fs.unlink(`${__dirname}/client_packages/.listcache`, (err) => {
    if (err) console.error(err)
    fs.readFile(`${__dirname}/client/index.js`, (err, data) => {
      if (err) return console.error(err)
      data = handlebars.compile(data.toString())(config)
      if (config.obfuscate) { data = jso.obfuscate(data) }
      fs.writeFile(`${__dirname}/client_packages/index.js`, data, (err) => {
        if (err) return console.error(err)

        spawn('./server.exe', {stdio: 'inherit'}, console.log)

        // ipc.config.id = 'host'
        // ipc.serve()
        // ipc.server.start()
        // ipc.server.on('spawnMessage', handleMessage)
      })
    })
  })
})
