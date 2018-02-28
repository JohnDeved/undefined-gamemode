const fs = require('fs')

module.exports = new Promise(resolve => {
  fs.readdir(`${__dirname}/functions/`, async (err, files) => {
    if (err) console.error(err)
    mp.fnc = {}
    await files.forEach(file => {
      if (/^event\..+\.js$/.test(file)) {
        let [, name] = file.match(/^event\.(.+)\.js$/)
        mp.fnc[name] = require(`${__dirname}/functions/${file}`)
        mp.events.add(name, mp.fnc[name])
      } else if (/^(.+)\.js$/.test(file)) {
        let [, name] = file.match(/^(.+)\.js$/)
        mp.fnc[name] = require(`${__dirname}/functions/${file}`)
      }
    })
    resolve()
  })
})
