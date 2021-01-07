module.exports = {
  name: "choose",
  aliases: ["pick"],
  description: "Have the bot decide with this!",
  usage: "!choose [option] | [option2]",
  run: (msg, client) => {
    let strsplit = msg.content.split(" ");
    if (strsplit.length === 1) {
      return msg.channel.send({
        embed: {
          description:
            "Oops, please follow the format !choose [option] | [option2]",
          color: "#008000"
        }
      });
    } else {
      let options = strsplit
        .slice(1)
        .join(" ")
        .split(" | ");
      let picked = options[Math.floor(Math.random() * options.length)];
      msg.channel.send(`I choose: ${picked}`);
    }
  }
};
