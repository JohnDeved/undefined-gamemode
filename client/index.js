mp.fnc = require('./js/functions.js')
require('./js/keys')()
require('./js/events')()

setInterval(mp.fnc.interval, 50)

if (mp.gui.cursor.visible) {
  mp.gui.cursor.show(false, false)
}
mp.game.graphics.transitionFromBlurred(100)
