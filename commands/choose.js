module.exports = {
  name: "choose",
  aliases: ["pick"],
  run: (msg, client) => {
    let args = msg.content.split(' ').slice(1).join(' ')
    let options = args.split(" | ")
    if (!options) {
      return msg.channel.send("No option to choose from.")
    }
    let picked = options[Math.floor(Math.random() * options.length)]
    msg.channel.send(`I choose: ${picked}`)
  }
}
