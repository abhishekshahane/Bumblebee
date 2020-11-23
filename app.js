//require the discord api
const first = require('discord.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs')
var dict = require('./dict.jsonc');
var dicta = require('./dicta.jsonc');
const database = require('quick.db')
//Creates a client.
const client = new Discord.Client();
var xp = {};

const prefix = '--' 
//Copy paste bot token in empty quotes
client.login(`${process.env.TOKEN}`)
//Executes when the bot is ready.
client.once('ready', () => {
    console.log('Ready');
    client.user.setActivity('Drinking Water!💧💦');
});

client.commands = new Discord.Collection();
//What does this code do?
//that saves the commands in a collection
//a collection is kinda like a map just discord's version

const commandFiles = fs.readdirSync('/app/commands/').filter(File => File.endsWith('.js'));

for(const File of commandFiles){
  let command;
  try {
    command = require(`/app/commands/${File}`);
    client.commands.set(command.name, command);
    console.log(`${command.name} is ready`)
  } catch (err) {
    console.log(err);
  }
} 

//Call is working
async function call(msg){
    var f =0;

    if (msg.author.bot) return;
    
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    if (!msg.guild) {
        if (f==0 && !msg.author.bot){
            msg.reply("Sorry, us bots don't respond to DM's. Try adding me to a server if you want to speak to me.");
            f=1;
        };
    }
  //TODO: remove dict.jsonc dicta.jsonc, and integrate db with it
  
    else{
        if (dict[msg.author.discriminator]>=0){
            dict[msg.author.discriminator]+=1;
            xp[msg.author.discriminator]+=Math.floor(Math.random()*(15-10)+10);
        }
        else if(dict.hasOwnProperty(msg.author.discriminator)!=true){
            xp[msg.author.discriminator] = Math.floor(Math.random() * (15 - 10) + 10);
            dict[msg.author.discriminator] = 0;
            dicta[msg.author.discriminator] = msg.author.username;
            //Gets server id from message, and uses that in server name
            var ida = msg.channel.guild.id;
            var serverName = client.guilds.cache.get(`${ida}`).name;
            var person = dicta[msg.author.discriminator];
            if (!msg.author.bot){
                msg.author.send(`Welcome to ${serverName}, ${person}!`);
            };
        };
        if (msg.content.toLowerCase().startsWith(prefix)) {
          try {
            let name = msg.content.slice(prefix.length).split(" ")[0];
            let command = client.commands.find(x => x.name.toLowerCase() == name.toLowerCase());
            return command.run(msg, client, xp);
          } catch(err) {
            console.log(err)
          }
        }
    };
    
};

client.on('message', call);
