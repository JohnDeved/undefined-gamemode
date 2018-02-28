module.exports = (player, vehicle, seat) => {
  if (vehicle.shopId) {
    mp.fnc.handleCarShop(player, vehicle, seat)
  }
}
