const fs = require('fs')
const spawn = require('child_process').spawn
const find = require('find-process')
const handlebars = require('handlebars')
const jso = require('javascript-obfuscator')
const config = require('./conf')

find('name', 'server.exe').then(list => {
  list.forEach(p => {
    process.kill(p.pid)
  })

  fs.unlink(`${__dirname}/client_packages/.listcache`, (err) => {
    if (err) console.error(err)
    fs.readFile(`${__dirname}/client/index.js`, (err, data) => {
      if (err) return console.error(err)
      data = handlebars.compile(data.toString())(config)
      fs.writeFile(`${__dirname}/client_packages/index.js`, jso.obfuscate(data), (err) => {
        if (err) return console.error(err)

        spawn('./server.exe', {stdio: 'inherit'}, console.log)
      })
    })
  })
})
