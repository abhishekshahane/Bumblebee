const db = require('quick.db')
const imports = require('../consts/constants.js')

module.exports = {
  name: "weekly",
  usage: "!weekly",
  description: "Redeem money from your weekly stock purchases!",
  run: async function(msg, client){
    //we need to get this to work first, discord error or smth
    
    let a = db.get(`User${msg.author.id}.stocks`)
    if (typeof a === 'undefined' || a.length===0){
      let embed = {
        color: "#FF0000",
        description: "You haven't purchased any stocks, would you like to buy one?"
      }
      msg.channel.send({embed: embed})
    }
    else{
      //ok
      let percentageOfGrowth = [];
      for (let i = 0; i < imports.thingsToBuy.length; i++) {
        percentageOfGrowth.push(imports.thingsToBuy[i].percentageOfGrowth)
      }
    }
    
  }
}
