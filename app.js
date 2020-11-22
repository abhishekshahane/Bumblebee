//Require modules here.
const Discord = require('discord.js');
const fetch = require('node-fetch');

//require otherfiles here.
var dict = require('./dict.jsonc');
var dicta = require('./dicta.jsonc');

//Creates a client.
const client = new Discord.Client();

//set variables here.
var xp = {};
const prefix = '--' 

//Copy paste bot token in empty quotes.
client.login('')

//Executes when the bot is ready.
client.once('ready', () => {
    console.log('Ready');
    client.user.setActivity('Drinking Water!💧💦');
});

//Call is working
function call(msg){
    var f =0;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    
    if (msg.channel.name == undefined){
        if (f==0 && !msg.author.bot){
            msg.reply("Sorry, us bots don't respond to DM's. Try adding me to a server if you want to speak to me.");
            f=1;
        };
    }
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
            console.log(serverName);
            var person = dicta[msg.author.discriminator];
            if (!msg.author.bot){
                msg.author.send(`Welcome to ${serverName}, ${person}!`);
            };
        };
        if (msg.content==='--check'){
            msg.channel.send("Returning JSON data......");
            for (var key in dict){
                msg.channel.send(`${dicta[key]} : ${dict[key]+1}`);
            };
        }
        else if(msg.content.startsWith("--xp")){
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
        } else if (command === 'joke') {
              let joke = await getJoke()
              message.channel.send(`${joke.setup}\n||${joke.punchline}||`)
        };
    };
    
};

client.on('message', call);

let getJoke = async () => {
  let result = await fetch('https://official-joke-api.appspot.com/random_joke')
  let json = await result.json()
  return json
}
