const db = require('quick.db');

module.exports = {
  name: "xp",
  usage: "!xp [@user]",
  run: async (msg, client) => {
    let user = msg.mentions.users.first()
    let person = msg.author.username;
    if (!user) return msg.channel.send({embed: {
        description: `${person}, Mention a user to check their XP`,
      color: "FF0000"
    }})
    let xp = await db.get(`User${user.id}.xp`)
    msg.channel.send(`${user}, your xp is ${xp}`)
  }
}