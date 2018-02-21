mp.events.add('loadUi', sid => {
  mp.players.local.sid = sid
  mp.gui.chat.push('playerObj sid: !{Green}' + mp.players.local.sid)
  mp.browser = mp.browsers.new('http://{{host}}:{{express}}/' + mp.players.local.sid)
})

mp.events.add('alert', data => {
  mp.browser.execute(`vue.alert(${JSON.stringify(data)})`)
})

mp.keys.bind(113, true, () => {
  if (!mp.gui.cursor.visible) {
    mp.game.graphics.transitionToBlurred(100)
    mp.browser.execute(`vue.$router.push('/buttons')`)
    mp.gui.cursor.show(true, true)
  } else {
    mp.game.graphics.transitionFromBlurred(100)
    mp.browser.execute(`vue.$router.push('/')`)
    mp.gui.cursor.show(false, false)
  }
})

mp.keys.bind(116, true, () => {
  mp.browser.reload(false)
})
