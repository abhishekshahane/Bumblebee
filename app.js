//Require modules here.
const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");
const db = require("quick.db");
const random = require("random");
//Set variables here
var xp = {};
const prefix = "!";

const client = new Discord.Client(); //Creates the client.

client.login("Nzc3Nzc5MjcyOTk4NzE1NDEz.X7IZZQ.Vm0lDiDYyP9-0dzXbg5o_WRw85o"); //Starts the bot.

client.commands = new Discord.Collection(); //Saves the commands in a collection.
client.aliases = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter(File => File.endsWith(".js"));

for (const File of commandFiles) {
  let command;
  try {
    command = require(`./commands/${File}`);
    client.commands.set(command.name, command);
    if (command.aliases) {
      command.aliases.forEach(alias => {
        client.aliases.set(alias, command);
      });
    }
    console.log(`${command.name} is ready`);
  } catch (err) {
    console.log(err);
  }
}

//Put events here.
//Executes when bot is ready.
client.on("ready", async () => {
  client.user
    .setActivity("Relaxing🍹🏖️")
    .then(() => console.log("Alright, im ready!"));
});

//Executes when a message is sent.
client.on("message", async message => {
  if (message.author.bot || message.author === client.user) return; //Returns if a bot sends the message
  if (!message.guild) {} //Does nothing if the message isn't sent in a server
  if (message.guild){
    if (db.get(`User${message.author.id}`) === "") {
      db.set(`User${message.author.id}`);
      db.push(`User${message.author.id}.messages`, 0);
      db.push(
        `User${message.author.id}.xp`,
        Math.floor(Math.random() * (15 - 10) + 10)
      );
      message.author.send(`Welcome to Bumblebee, ${message.author.username}`);
    } else {
      db.add(`User${message.author.id}.messages`, 1);
      db.add(
        `User${message.author.id}.xp`,
        Math.floor(Math.random() * (15 - 10) + 10)
      );
      db.add(`User${message.author.id}.level`, 0);
      db.add(`User${message.author.id}.coins`, 0);
      let currlev = db.get(`User${message.author.id}.level`);
      let currxp = db.get(`User${message.author.id}.xp`);
      let next = currlev + 1;
      let formulaForNextCoins = Math.pow(currlev, 2) + (13 % random.int(0, 100));
      //checker for formula
      //if it is not a num, make the var 200
      if (isNaN(formulaForNextCoins)) {
        formulaForNextCoins = 200;
      }
      let XPtoNextLevel = 5 * Math.pow(currlev, 2) + 50 * currlev + 100;
      if (currxp >= XPtoNextLevel) {
        message.channel.send({
          embed: {
            description: `Congrats ${message.author.username}! You've advanced to level ${next}!\nYou've also received ${formulaForNextCoins} coins`,
            color: [255, 255, 254] //white in RGB
          }
        });
        db.add(`User${message.author.id}.level`, 1);
        db.add(`User${message.author.id}.coins`, formulaForNextCoins);
      }
    }
  }
  if (message.guild){
    if (message.content.toLowerCase().startsWith(prefix)) {
      try {
        let cmd = message.content.slice(prefix.length).split(" ")[0];
        let command = client.commands.get(cmd) || client.aliases.get(cmd);
        let args = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g);
        let cmd2 = args.shift().toLowerCase();
        return command.run(message, client, args);
      } catch (err) {
        console.error(err);
      }
    }
  }
});

client.on("guildMemberAdd", member => {
  try {
    member.id.send(`Welcome ${member.displayName} to ${member.guild.name}`);
  } catch (e) {
    console.log(e);
  }
});
//Put functions here.
