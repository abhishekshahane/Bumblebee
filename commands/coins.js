const db = require('quick.db')
module.exports = {
  name: "coins",
  description: "Get your coin number with this!",
  usage: "!coins [USER MENTION]",
  run: async (msg, client) => {
    var strsplit = msg.content.split(" ")
    if (strsplit.length===2){
      let a = msg.mentions.members.first().user.username;
      let getcoins = msg.mentions.members.first().id;
      let coins = Math.floor(db.get(`User${getcoins}.coins`));
      var embed = {
        color: "#fafafa",
        description: `You have ${coins}, ${a}!`
      };
      return msg.channel.send({
        embed: embed
      });
    }
    
  }
};
