const db = require('quick.db')
const alreadyClaimed = new Set()
const random = require('random')

module.exports = {
  name: "daily",
  usage: "!daily",
  run: async(msg, client) =>{
    if (alreadyClaimed.has(msg.author.id)) return msg.channel.send("already claimed daily") //if already claimed daily
    let coins = db.get(`User${msg.author.id}.coins`) // get user's balance
    let amt = (1/random.int(10,20))*coins//amount of coins to give
    await db.add(`User${msg.author.id}.coins`, amt) // add amount to balance
    msg.channel.send("Added " + amt + " coins") // send confirmation message
    alreadyClaimed.add(msg.author.id) // add user to the Set
    setTimeout(() => {
      alreadyClaimed.delete(msg.author.id) //after 24hrs remove user from Set
    }, 8.64e+7)
  }
}
