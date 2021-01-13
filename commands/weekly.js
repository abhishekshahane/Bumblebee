const db = require('quick.db')
const imports = require('../consts/constants.js')
const random = require('random')
module.exports = {
  name: "weekly",
  usage: "!weekly",
  description: "Redeem money from your weekly stock purchases!",
  run: async function(msg, client){
    //we need to get this to work first, discord error or smth
    var strsplit = msg.content.split(" ")
    if (strsplit.length===1){
      let a = db.get(`User${msg.author.id}.stocks`)
      if (typeof a === 'undefined' || a.length===0){
        let embed = {
          color: "#FF0000",
          description: "You haven't purchased any stocks, would you like to buy one?"
        }
        msg.channel.send({embed: embed})
      }
      else{
        var dict = {}
        var userID = msg.author.id;
        var userStocks = db.get(`User${userID}.stocks`)
        var coins = db.get(`User{userID}.coins`)
        var price = [];
        var shop = imports.thingsToBuy
        var stocks = imports.stocksList
        for (var i=0;i<stocks.length;i++){
            dict[`${shop[i]["name"]}`] = [`${shop[i]["price"]}`, `${shop[i]["percentageOfGrowth"]}`]
        }
        console.log(userStocks)
        for (var i=0;i<userStocks.length;i++){
          var splitit = userStocks[i].split(" ")
          var percents = dict[splitit[0]]
          var final = percents[1].split("-")
          var randoms = [parseInt(final[0]), parseInt(final[1])]
          var randomInt = random.int(randoms[0], randoms[1])
          console.log(randomInt)
       
       }
      }
    }
    
  }
}
