var dicta = require('/app/dicta.jsonc');

module.exports = {
  name: "xp",
  run: async (msg, client, xp) => {
    var strsplit = msg.content.split(" ");
            if (strsplit.length===2){
                var get = msg.mentions.users.first().discriminator;
                if (dicta[get]===undefined){
                    msg.channel.send("This user has not said anything yet, so their XP is 0.");
                }
                else{
                    msg.channel.send(`${dicta[get]} : ${xp[get]}`);
                };
            }
            else{
                msg.channel.send("The syntax of your command is incorrect. Please follow the format --xp @[USER].");
            };
  }
}