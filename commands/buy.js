const db = require('quick.db')
const imports = require('../consts/constants.js')
module.exports = {
  name: "buy",
  usage: "!buy [item.id]",
  run: async(msg, client) => {
    //Just console logs atm, will work on this later
    console.log(imports.thingsToBuy)
      
  }
}
