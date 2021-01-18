const db = require('quick.db')
const imports = require('../consts/constants.js')
const random = require('random')
function sum(arr){
  var sum=0;
  for (var i=0;i<arr.length;i++){
    sum+=arr[i]
  }
  return sum
}
module.exports = {
  name: "weekly",
  usage: "!weekly",
  description: "Redeem money from your weekly stock purchases!",
  run: async function(msg, client){

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
          var moneygot = parseInt(splitit[1])*dict[splitit[0]][0];
          var percents = dict[splitit[0]]
          var final = percents[1].split("-")
          var randoms = [parseInt(final[0]), parseInt(final[1])]
          var randomInt = random.int(randoms[0], randoms[1])
          price.push((randomInt/100)*moneygot)
       
        }
        var ans = Math.round(sum(price))
        db.set(`User${msg.author.id}.coins`, ans)
        let embed = {
          description: `${ans} coins were just added to your account, ${msg.author.username}!`,
          color: "#00FFFF"
        }
        msg.channel.send({
          embed:embed
        })
        db.set(`User${msg.author.id}.stocks`, [])
        
      }
    }
    
  }
}
