//Require modules here.
const Discord = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");
const db = require("quick.db");

//Set variables here
var xp = {};
const prefix = "--";

const client = new Discord.Client(); //Creates the client.


client.login(`${process.env.TOKEN}`); //Starts the bot.

client.commands = new Discord.Collection(); //Saves the commands in a collection.

const commandFiles = fs
  .readdirSync("/app/commands/")
  .filter(File => File.endsWith(".js"));

for (const File of commandFiles) {
  let command;
  try {
    command = require(`/app/commands/${File}`);
    client.commands.set(command.name, command);
    console.log(`${command.name} is ready`);
  } catch (err) {
    console.log(err);
  }
}

//Put events here.

//Executes when the bot is ready.
client.on('ready', async() => {
  client.user.setActivity("Drinking Water!💧💦")
  .then(() => console.log("Alright, im ready!"))
});

//Executes when a message is sent.
client.on('message', async message => {
    if (message.author.bot || message.author === client.user) return; //Returns if a bot sends the message
    if (!message.guild) return; //Returns if the message isn't sent in a server
    //imma go read how the db works
   //there ezpz xd
    if (db.get(`User${message.author.id}`) === '') {
        db.set(`User${message.author.id}`);
        db.push(`User${message.author.id}.messages`, 0);
        db.push(`User${message.author.id}.xp`, Math.floor(Math.random() * (15 - 10) + 10));
    } else {
        db.add(`User${message.author.id}.messages`, 1);
        db.add(`User${message.author.id}.xp`,         Math.floor(Math.random() * (15 - 10) + 10));
    };

    if (message.content.toLowerCase().startsWith(prefix)) {
      try {
        let name = message.content.slice(prefix.length).split(" ")[0];
        let command = client.commands.find(x => x.name.toLowerCase() == name.toLowerCase());
        return command.run(message, client);
      } catch(err) {
        console.log(err)
      }
    }
});


client.on("guildMemberAdd", member => {
    try {
        member.guild.channels.cache
          .get("779759160220057612")
          .send(`Welcome ${member.displayName} to ${member.guild.name}`);
    } catch (e) {
        console.log(e);
    }
});
//Put functions here.


