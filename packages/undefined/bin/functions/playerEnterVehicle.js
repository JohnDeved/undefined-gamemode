module.exports = (player, vehicle, seat) => {
  if (vehicle.shopId) {
    console.log(player.name, 'entered shop vehicle with shop id', vehicle.shopId)
    player.call('showDialog', [{text: 'tester test test'}])
  }
}
