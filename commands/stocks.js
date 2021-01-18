const db = require('quick.db')
module.exports = {
  name: "stocks",
  usage: "!stocks",
  description: "See your stocks with this command!",
  run: async(msg, client) =>{
    var stocks = db.get(`User${msg.author.id}.stocks`)
    var text = "***Your stocks***\n"
    for (var i=0;i<stocks.length;i++){
      text+=stocks[i].split(" ")[0] + " : " + stocks[i].split(" ")[1] 
      text+="\n"
    }
    let embed = {
      description: text,
      color: "#FAFAFA"
    }
    msg.channel.send({
      embed: embed
    })
  }
  
}
