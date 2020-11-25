module.exports = {
  name: "help",
  usage: "!help",
  aliases: ["commands"],
  run: async (msg, client) => {
    let text = "We have several commands, such as:\n"
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
