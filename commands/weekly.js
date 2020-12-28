const db = require('quick.db')
module.exports = {
  name: "weekly",
  usage: "!weekly",
  run: (msg, async) => {
    //TO FIX
    var a = db.get(`User${msg.author.id}.stocks`)
    if (!a){
      let embed = {
        color: "#FF0000",
        description: "You haven't purchased any stocks, would you like to buy one?"
      }
      msg.channel.send(embed)
    }
  }
}
