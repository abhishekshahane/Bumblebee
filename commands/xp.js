const db = require('quick.db');

module.exports = {
  name: "xp",
  run: (msg, client) => {
    let user = msg.mentions.users.first()
    if (!user) return msg.channel.send({embed: {
      description: "Use the XP command in the form --xp [@USER])",
      color: "FF0000"
    }})
    let xp = db.get(`User${user.id}.xp`)
    msg.channel.send(xp)
  }
}
