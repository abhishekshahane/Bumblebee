//require the discord api

const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const database = require('quick.db');
const dotenv = require('dotenv');



dotenv.config({ path: './.env'});
//Creates a client.
const client = new Discord.Client();

var CommandHandler = require('./commands/commands');

var dictionary = database.get('main'); 
function user(id, xp, server){
 this.id = id;
 this.server = server;
 this.xp = xp; 
 
} 
const prefix = '--';

function writeUser(id,xp,server){
    let user = new userObject(id,xp,server);
    dictionary.users.push(user);
    dictionary.ids.push(id);
}
function saveDB(){
      database.set('main.users',dictionary.users);
      database.set('main.ids',dictionary.ids);

}

setInterval(saveDB,10000);

//Copy paste bot token in empty quotes
client.on('ready', ready);
function ready(){
    console.log("Alright, we are ready!")
    client.user.setActivity("Drinking Water!💧💦")
}


//Call is working
/*async function call(msg){

    }
  
    else{
        if (dict[msg.author.id]>=0){
            dict[msg.author.id]+=1;
            xp[msg.author.id]+=Math.floor(Math.random()*(15-10)+10);
        }
        else if(dict.hasOwnProperty(msg.author.id)!=true){
            xp[msg.author.id] = Math.floor(Math.random() * (15 - 10) + 10);
            dict[msg.author.id] = 0;
            dicta[msg.author.id] = msg.author.username;
            //Gets server id from message, and uses that in server name
            var ida = msg.channel.guild.id;
            var serverName = client.guilds.cache.get(`${ida}`).name;

            console.log(serverName)
            var person = dicta[msg.author.id];
            if (!msg.author.bot){
                msg.author.send(`Welcome to ${serverName}, ${person}!`)
            }
        }
        if (msg.content==='--check'){
            
        }
        else if(msg.content.startsWith("!joke"){
            //Put your code here
        }
        else if(msg.content.startsWith("--xp")){
            var strsplit = msg.content.split(" ");
            if (strsplit.length===2){
                var get = msg.mentions.users.first().id;
                if (dicta[get]===undefined){
                    msg.channel.send("This user has not said anything yet, so their XP is 0.")
                }
                else{
                    msg.channel.send(`${dicta[get]} : ${xp[get]}`)
                }
            }
            else{
                msg.channel.send("The syntax of your command is incorrect. Please follow the format --xp @[USER].")
            }
        }
    }
    
}
*/
async function main(msg){
    if (!msg.channel.type=='dm'||!msg.guild){
        msg.channel.send('This bot does not respond to DMs.\n Please send your command in a server')
    }else{
    if (msg.content.startsWith(prefix)){
        let args = msg.content.substring(prefix.length).split('');
        switch (args[0]){
            case 'xp' :
                CommandHandler.xp(msg,dictionary,args);
            break;
            case 'check': 
                CommandHandler.check(msg,dictionary,args,'message');
            break;
            case 'joke':
                CommandHandler.joke(msg,client);
            case 'meme':
                CommandHandler.meme(msg,client,Discord);
            break;
            case 'role':
                CommandHandler.role(msg,client);
            break;
            default:
                msg.channel.send("That is not a valid command.")


        }

    } else {
        //xp giving thing here
        return;
    }
}
}


client.on('message', main);

client.login(process.env.TOKEN);
    


