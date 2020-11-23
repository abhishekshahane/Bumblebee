//require the discord api

const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const database = require('quick.db');
const dotenv = require('dotenv');



dotenv.config({ path: './.env'});
//Creates a client.
const client = new Discord.Client();

var CommandHandler = require('./handlers/commands');
const { xp } = require('./handlers/xpHandler');

var dictionary = database.get('main'); 

const prefix = '--';



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




async function main(msg){
    if (!msg.channel.type=='dm'||!msg.guild){
        msg.channel.send('This bot does not respond to DMs.\n Please send your command in a server')
    }else{
    if (msg.content.startsWith(prefix)){
        let args = msg.content.substring(prefix.length).split(' ');
        switch (args[0]){
            case 'xp' :
                CommandHandler.xpGet(msg,dictionary,args);
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
        xp(msg,dictionary);

        return;
    }
}
}


client.on('message', main);

client.login(process.env.TOKEN);
    


