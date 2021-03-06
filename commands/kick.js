//done by haru#0001.
module.exports = {
  name: "kick",
  description: "kick a member from your server.",
  usage: "!kick [member]",
  run: async (message, client) => {
     const user = message.mentions.users.first();
    if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])){
      msg.channel.send({
        description:"Sorry, you can't use that.",
        color: "#FAFAFA"
      })
    }
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            message.reply('I was unable to kick the member');
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
}
