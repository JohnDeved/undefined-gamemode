mp.events.add('showGui', uid => {
  mp.browsers.new('localhost:3000/' + uid)
})
