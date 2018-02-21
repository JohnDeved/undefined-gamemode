mp.events.add('showGui', sid => {
  mp.players.local.sid = sid
  mp.gui.chat.push('playerObj sid: !{Green}' + mp.players.local.sid)
  mp.browser = mp.browsers.new('http://{{host}}:{{express}}/' + mp.players.local.sid)
})

mp.events.add('alert', data => {
  mp.browser.execute(`vue.alert(${JSON.stringify(data)})`)
})

mp.keys.bind(0x71, true, () => {
  mp.gui.cursor.show(!mp.gui.cursor.visible, !mp.gui.cursor.visible)
})
