const db = require('quick.db')
const imports = require('../consts/constants.js')
module.exports = {
  name: "buy",
  usage: "!buy [stock symbol] [shares]",
  run: async(msg, client) => {
    //Just console logs atm, will work on this later
    var strsplit = msg.content.split(" ")
    var shop = imports.thingsToBuy
    if (strsplit.length!=3){
      let embed = {
        color: "#FF0000",
        description: "Oops! Follow the format !buy [stock] [shares]"
      }
      msg.channel.send({
        embed:embed
      })
    }
    else{
      var money = db.get(`User${msg.author.id}.coins`)
      var list = []
      for (var i=0;i<shop.length;i++){
        //this way we get all the names of the current stocks
        list.push(shop[i]["name"])
      }
      /*
      List of checks:
      1. Check if the 1'st arg is a string, and if it is in the list I wrote above, 
      if so, then do the next step.
      2. Check if the maximum amount of shares are greater than the shares wanted, and check if the user has balance
      for the shares, and if the shares are a integer
      */
      //check 1 is done here
      if (typeof strsplit[1] === 'string' && list.includes(strsplit[1])){
        for (var j=0;j<shop.length;j++){
          if (shop[j]["name"]===strsplit[1]){
            var maxShares = shop[j]["maxAmountOfShares"]
            var price = shop[j]["price"]
            var percentageGrowth = shop[j]["percentageOfGrowth"]
          }
        }
        //to debug uncomment the comment below
        //console.log(maxShares, price, percentageGrowth)
        //these two if statements represent the conditions
        if (!isNaN(strsplit[2]) && parseInt(strsplit[2])<=maxShares && money>maxShares*price && strsplit[2].search('.')===-1){
          //code here
          console.log(strsplit[2])
        }
        
        else{
          let embed = {
            color: "#FF0000",
            description: "Oops, either you don't have enough money to buy that amount of shares, your shares are greater than the maximum amount allowed, or the argument you have entered is not a integer"
          }
          msg.channel.send({
            embed: embed
          })
          
        }
      }
      else{
        let embed = {
          color: "#FF0000",
          description: "Oops, your stock symbol isn't in the ones we gave you(our checker is case sensitive)."
        }
        msg.channel.send({
          embed: embed
        })
      }
      
    }
      
  }
}
