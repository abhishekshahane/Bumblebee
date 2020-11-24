const db = require('quick.db')

module.exports = {
  name: "check",
  run: (msg, client) => {
    let messagesSent = db.get(`User${msg.author.id}.messages`)
    msg.channel.send(messagesSent)
  }
}
