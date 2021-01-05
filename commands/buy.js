const db = require('quick.db')
const imports = require('../consts/constants.js')
module.exports = {
  name: "buy",
  description: "Buy stocks with this!",
  usage: "!buy [stock symbol] [shares]",
  run: async function(msg, client){
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
            var name = shop[j]["name"]
            var maxShares = shop[j]["maxAmountOfShares"]
            var price = shop[j]["price"]
            var percentageGrowth = shop[j]["percentageOfGrowth"]
          }
        }
        //to debug uncomment the comment below
        //console.log(maxShares, price, percentageGrowth)
        //these two if statements represent the conditions
        //for debugging
        //console.log(isNaN(strsplit[2]), parseInt(strsplit[2])<=maxShares, money>maxShares*price, strsplit[2].search('\\.')===-1)
        if (!isNaN(strsplit[2]) && parseInt(strsplit[2])<=maxShares && money>maxShares*price && strsplit[2].search('\\.')===-1){
          //then, we check if a arr is made
          let arr = db.get(`User${msg.author.id}.stocks`, [])
          if (!arr){
            await db.set(`User${msg.author.id}.stocks`,[])
            arr = db.get(`User${msg.author.id}.stocks`)
          }
          var str = "";
          str=str+strsplit[1]+" "
          str+=strsplit[2] + " "
          const t = Date.now()
          str+=t
          arr.push(str)
          db.set(`User${msg.author.id}.stocks`, arr)
          let embed = {
            color: "#00FFFF",
            description: "Stock bought!"
          }
          msg.channel.send({
            embed: embed
          })
          //then, we need to check if it's been a week later, in the case that we remove the user's stock from the db, so
          //settimeout will work
          setTimeout(() => {
            var ar = db.get(`User${msg.author.id}.stocks`)
            var new_arr = [];
            for (var i=0;i<ar.length;i++){
              if (parseInt(ar[i].split(" ")[2]) - t>=6.048e+8){}
              else{
                new_arr.push(ar[i])
              }
            }
            
            db.set(`User${msg.author.id}.stocks`, new_arr)
            let embed={
              color: "#FF0000",
              description: `${msg.author.username}, unfortunately, you didn't utilise your stocks, so they've disappeared. You can always get more from the store though.`
            }
            msg.channel.send(embed)
          }, 6.048e+8)
          
          
          
          
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
