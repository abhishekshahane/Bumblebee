const db = require('quick.db')
module.exports = {
  name: "weekly",
  usage: "!weekly",
  run: async function(msg, client){

    let a = db.get(`User${msg.author.id}.stocks`)
    if (typeof a === 'undefined' || a.length===0){
      let embed = {
        color: "#FF0000",
        description: "You haven't purchased any stocks, would you like to buy one?"
      }
      msg.channel.send({embed: embed})
    }
    else{
      //code
    }
  }
}
