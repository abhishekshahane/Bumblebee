const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
  name: "topfive",
  usage: "!topfive",
  description: "Get the top 5 people with the highest xp in your server!",
  aliases: ["top", "leaderboard", "lb"],
  run: async (msg, client) => {
    let all = db.all() //grab everything in the db
    let xpUsers = []
    await all.forEach(user => {
      if (!user.ID.startsWith("User")) return; 
      //push only necessary objects from the db into a different array
      xpUsers.push(user)
    })
    await xpUsers.sort((a, b) => a .xp - b.xp); // sort from highest xp to lowest xp
    let embed = new Discord.MessageEmbed() //create embed
    .setTitle("TOP FIVE")
    .setColor("#00FF00")
    let i = 0; //index number
    await xpUsers.forEach(xp => {
      i++ //add 1 to the index number
      embed.addField(`${i}. ${getUser(i)}`, "`level: "+xp.data.level+"` `xp: "+xp.data.xp+"`")//addField to the embed
    })
    msg.channel.send(embed)// send embed
    
    
    
    function getUser(num) {
      let userid = xpUsers[num - 1].ID.split("User")[1] //get a user's id from the db
      let name = msg.guild.members.cache.get(userid) //find it in the bot
      if (!name) {
        return "Someone unknown to us!"; //if cant find the user, name will be "Unknown"
      } else {
        return name.user.username; // if it can, it will be the original user's name
      }
    }
  }
}


