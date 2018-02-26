const fs = require('fs')

module.exports = new Promise(resolve => {
  fs.readdir(`${__dirname}/functions/`, async (err, files) => {
    if (err) console.error(err)
    let fnc = {}
    await files.forEach(file => {
      let [, name] = file.match(/(.+)\.js\b/)
      fnc[name] = require(`${__dirname}/functions/${file}`)
    })
    resolve(fnc)
  })
})
