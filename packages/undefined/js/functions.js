const fs = require('fs')

module.exports = new Promise(resolve => {
  fs.readdir(`${__dirname}/functions/`, async (err, files) => {
    if (err) console.error(err)
    let fnc = {}
    await files.forEach(file => {
      if (/event\..+\.js\b/.test(file)) {
        let [, name] = file.match(/event\.(.+)\.js\b/)
        fnc[name] = require(`${__dirname}/functions/${file}`)
        mp.events.add(name, fnc[name])
      } else if (/(.+)\.js\b/.test(file)) {
        let [, name] = file.match(/(.+)\.js\b/)
        fnc[name] = require(`${__dirname}/functions/${file}`)
      }
    })
    resolve(fnc)
  })
})
