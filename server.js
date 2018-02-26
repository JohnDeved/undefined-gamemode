const fs = require('fs')
const program = require('commander')
const spawn = require('child_process').spawn
const find = require('find-process')
const handlebars = require('handlebars')
const jso = require('javascript-obfuscator')
const config = require('./conf')

program.option('-d, --debug', 'Enable Debug').parse(process.argv)
let debugging = program.debug || config.debugging

find('name', 'server.exe').then(list => {
  list.forEach(p => {
    process.kill(p.pid)
  })

  fs.unlink(`${__dirname}/client_packages/.listcache`, (err) => {
    if (err) console.info('.listcache not found')
    fs.readFile(`${__dirname}/client/index.js`, (err, data) => {
      if (err) return console.error(err)
      data = handlebars.compile(data.toString())(config)
      if (config.obfuscate) { data = jso.obfuscate(data) }
      fs.writeFile(`${__dirname}/client_packages/index.js`, data, (err) => {
        if (err) return console.error(err)

        spawn('./server.exe', debugging ? ['--inspect'] : [], {stdio: 'inherit'}, console.log)
      })
    })
  })
})
