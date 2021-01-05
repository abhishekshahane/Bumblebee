module.exports = {
  name: "help",
  usage: "!help [command]",
  description: "Get help with this!",
  run: async (msg, client) => {
    let text = ""
    await client.commands.forEach(command => {
      text += command.name + " "+"\n\tusage:"+" " + command.usage +"\n" + "\n\tdescription" + command.description
    })
    let embed = {
      title: "HELP",
      description: text,
      color: "#00ff00"
    }
    msg.channel.send({embed: embed})
  }
}
