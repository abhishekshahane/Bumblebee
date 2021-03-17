const db = require("quick.db");

module.exports = {
  name: "check",
  description: "Check how many messages someone has sent on the server with this!",
  usage: "!check [@user]",
  run: async (msg, client) => {
    let strsplit = msg.content.split(" ");
    if (strsplit.length === 1) {
      return msg.channel.send({
        embed: {
          description: "Oops, please follow the format !check [@USER]",
          color: "#FF0000" //red for alert
        }
      });
    }

    let firstMentionID = msg.mentions.members.first().id;
    if (!firstMentionID) {
      return msg.channel.send({
        embed: {
          description: "Oops, please follow the format !check [@USER]",
          color: "#FF0000" //red for alert
        }
      });
    }
    //first mention
    let messagesSent = db.get(`User${firstMentionID}.messages`);
    msg.reply(`You've sent ${messagesSent} messages today.`);
  }
};
