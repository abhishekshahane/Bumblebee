module.exports = {
  name: "help",
  usage: "!help [page]",
  description: "Get help with this!",
  run: async (msg, client) => {
    var splitit = msg.content.split(" ")
    if (splitit.length!=2 || msg.content == '!help'){
      let embed = {
        color: "#FAFAFA",
        description: "An invalid message was sent. Follow the format help [page]"
      }
      msg.channel.send({embed: embed})
    }
    else{
      let text = ""
      var count=0;
      await client.commands.forEach(command => {
        text += `***${command.name}:***` + "\n"+"\n\tusage:"+" " + command.usage +"\n" + "\n\tdescription: " + command.description + "\n\n";
        count++;
        if (count%5==0){
          text+= "--"
        }
      })
      var splited = text.split('--')
      var pagenum = parseInt(splitit[1])
      if (pagenum>=4){
        let embed={
          color: "#FAFAFA",
          description: "Invalid index provided."
        }
        msg.channel.send({embed:embed})
      }
      else{
        let embed = {
          title: "HELP",
          description: splited[pagenum],
          color: "#00ff00"
        }
        msg.channel.send(
          {embed: embed}
        )
      }
    }
  }
}
