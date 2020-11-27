const db = require('quick.db')
module.exports = {
  name: "level",
  usage: "!level [@user]",
  run: async(msg, client) => { 
    let strsplit = msg.content.split(" ")
    if (strsplit.length === 1){
      msg.channel.send({embed: {
        description: "Oops, please follow the format !level [@USER]",
        color: "#008000"
      }})
    }
    else{
      const name = msg.mentions.members.first()
      if (name===undefined){
        msg.channel.send(
          {
            embed: {
              description: "Oops, You need to mention someone valid!",
              color: "#10D86D"
            }
          }
      )
      }
      else{
        const firstId = msg.mentions.members.first().id;
        let xp = await db.get(`User${firstId}.xp`)
        let level = await db.get(`User${firstId}.level`)
        let next = level+1
        const xpToNextLevel = 5 * Math.pow(level, 2)+50*level+100;
        let minus = xpToNextLevel-xp
        if (xp==xpToNextLevel){
          msg.channel.send({
            embed:{
                description: `Let's go! You are now on level ${next}, ${name}!`,
              color: "#7FD707"
            }
          })
        }
        else{
          msg.channel.send({
            embed:{
              description: `${name}, You are ${minus} XP points away from XP level ${next}`,
              color: "#7FD707"
            }
          })
        }
      }
    }

    
    
    
  }
}