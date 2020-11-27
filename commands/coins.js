const db = require('quick.db')
module.exports = {
  name: "coins",
  usage: "!coins [USER MENTION]",
  run: async(msg, client) =>{
    let a = msg.mentions.members.first().user.username
    let getcoins = msg.mentions.members.first().id
    let coins = db.get(`User${getcoins}.coins`);
    var embed = {
      color: "#fafafa",
      description: `Your coins are ${coins}, ${a}!`
    }
    return msg.channel.send({
      embed: embed
    })
  }
}