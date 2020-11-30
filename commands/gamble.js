//Yet to finish this
const db = require('quick.db')
const Discord = require('discord.js');
const random = require("random");
module.exports = {
  name: "gamble",
  usage: "!gamble [amount > 10]",
  run: async(msg, client)=> {
    let args = msg.content.split(' ')
    let f = {
      description: "Oops, please follow the format for gamble(!gamble [amount > 10]).",
      color: "#FF0000"//red in hex code
    }
    if (args.length===1 || parseInt(args[1])<11){
      const embed = new Discord.MessageEmbed()
      .setTitle(f.description)
      .setColor(f.color)
      msg.channel.send(embed)
    }
    else if(args.length>2){
      const embed = new Discord.MessageEmbed()
      .setTitle(f.description)
      .setColor(f.color)
      msg.channel.send(embed)
    }
    else{
      let diceToRoll = [[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6], [0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6],[0,1,2,3,4,5,6]]
      let newArr = []
      for (var i=0;i<diceToRoll.length;i++){
        let curr = diceToRoll[i][random.int(0,6)]
        newArr.push(curr)
        
      }
      console.log(newArr)
      let Check = newArr[0];
      let bool = true
      for (var j=1;j<newArr.length;j++){
        if (newArr[j]!=Check){
          bool=false
        }
        else{
          bool=true
          //same as it was
        }
      }
      if (bool==false){
        msg.channel.send("BYE")
      }
      else{
        msg.channel.send("HI")
      }
    }
  }
}
