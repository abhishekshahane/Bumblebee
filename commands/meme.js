const { meme } = require('memejs');
const Discord = require('discord.js');

module.exports = {
  name: "meme",
  run: async (msg, client) => {
    let m = await msg.channel.send("Retreiving meme....")
    meme('memes', (err, data) => {
      if (err) return console.log(err);
      const embed = new Discord.MessageEmbed()
      .setTitle(data.title)
      .setImage(data.url)
      .setColor("RANDOM")
      .setFooter(`r/memes | meme by u/${data.author}`);
      msg.channel.send(embed).catch(e => console.log(e)).then(() => m.delete())
    });
  }
}
