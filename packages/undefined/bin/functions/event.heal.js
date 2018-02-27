module.exports = player => {
  player.health = 100
  if (player.vehicle) {
    player.vehicle.repair()
  }

  player.call('alert', [{text: `Your all fixed up 👍`, type: 'success', icon: 'fa-medkit'}])
}
