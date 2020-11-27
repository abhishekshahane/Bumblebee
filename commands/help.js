module.exports = {
  name: "help",
  usage: "!help [command]",
  run: async (msg, client) => {
    let text = ""
    await client.commands.forEach(command => {
      text += command.name + " "+"usage:"+" " + command.usage +"\n"
    })
    let embed = {
      title: "HELP",
      description: text,
      color: "#00ff00"
    }
    msg.channel.send({embed: embed})
  }
}