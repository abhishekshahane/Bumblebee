const db = require("quick.db");
const Discord = require("discord.js");
const random = require("random");
const set = new Set();
module.exports = {
  name: "gamble",
  usage: "!gamble [amount > 10]",
  run: async (msg, client) => {
    if (set.has(msg.author.id)) {
      let embed = {
        title: "Wait for some time before running this command again!",
        description: "Stop lol don't gamble that much",
        color: "#ffcccb"
      };
      msg.channel.send({
        embed: embed
      });
    } else {
      let args = msg.content.split(" ");
      let f = {
        description:
          "Oops, please follow the format for gamble(!gamble [1500 > amount > 10]).",
        color: "#FF0000" //red in hex code
      };
      if (
        args.length === 1 ||
        parseInt(args[1]) < 11 ||
        parseInt(args[1]) > 1500
      ) {
        const embed = new Discord.MessageEmbed()
          .setTitle(f.description)
          .setColor(f.color);
        return msg.channel.send(embed);
      } else if (args.length > 2) {
        const embed = new Discord.MessageEmbed()
          .setTitle(f.description)
          .setColor(f.color);
        return msg.channel.send(embed);
      }
      let msgtodelete = await msg.channel.send({
        embed: {
          description: "Rolling the dice :game_die:",
          color: "#008000"
        }
      });
      //you can use foreach for this, but i wanted to make this more logical:)
      let diceToRoll = [
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6]
      ];
      let newArr = [];
      for (var i = 0; i < diceToRoll.length; i++) {
        let curr = diceToRoll[i][random.int(0, 6)];
        newArr.push(curr);
      }
      console.log(newArr);
      let Check = random.int(0, 6);
      let bool = true;
      let firstOccur = [];
      for (var j = 1; j < newArr.length; j++) {
        if (newArr[j] != Check) {
          firstOccur.push(newArr[j]);
          bool = false;
          break;
        } else {
          bool = true;
          //same as it was
        }
      }
      if (firstOccur === []) {
        firstOccur[0] = newArr[0];
      }
      if (bool == false) {
        //choose a number between the max and min
        let num = random.int(2, parseInt(args[1]));
        db.subtract(`User${msg.author.id}.coins`, num);
        let embed1 = {
          description: `
              ***LOL*** you didn't roll straight dice unfortunately so you lost ${num} coins lol. Here are your stats:
              `,
          color: "#FF0000",
          fields: [
            {
              name: "You rolled a\n",
              value: `${Check}`
            },
            {
              name: "The computer rolled a\n",
              value: `${firstOccur[0]}`
            }
          ]
        };
        msgtodelete.delete();
        msg.channel.send({
          embed: embed1
        });
      } else {
        let num = random.int(2, parseInt(args[1]));
        db.subtract(`User${msg.author.id}.coins`, num);
        let embed1 = {
          description: `
              ***YES*** you rolled straight dice so you won ${num} coins. Here are your stats:
              `,
          color: "#00FF00",
          fields: [
            {
              name: "You rolled a\n",
              value: `${Check}`
            },
            {
              name: "The computer rolled a\n",
              value: `${firstOccur[0]}`
            }
          ]
        };
        msgtodelete.delete();
        msg.channel.send({
          embed: embed1
        });
        
      }
    }
    set.add(msg.author.id);
    setTimeout(() => {
      set.delete(msg.author.id);
    }, 5000);
  }
};

