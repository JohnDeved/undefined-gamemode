const crypto = require('crypto')
const base64url = require('base64url')

class Database {
  constructor (db) {
    this.db = db
    this.defaults = this.db.defaults({ players: [] }).write()
    this.getPlayerData = search => this.db.get('players').find(search).value()
    this.setPlayerData = (search, value, callback) => db.get('players').find(search).set(value).write().then(callback)
    this.generateId = num => base64url(crypto.randomBytes(num))
  }
}

module.exports = db => new Database(db)
