//require the discord api

const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');

const dotenv = require('dotenv');



dotenv.config({ path: './.env'});
//Creates a client.
const client = new Discord.Client();

var CommandHandler = require('./handlers/commands');
const { xp } = require('./handlers/xpHandler');

var database = fs.readFileSync('./database.json','utf8');
database = JSON.parse(database);

const prefix = '--';



function saveDB(){
    fs.writeFile('database.json',database, function (err) {
        if (err) throw err;
        console.log('Saved db');
      });
}

setInterval(saveDB,10000);

//Copy paste bot token in empty quotes
client.on('ready', ready);
function ready(){
    console.log("Alright, we are ready!")
    client.user.setActivity("Drinking Water!💧💦")
}




async function main(msg){
    if (!msg.guild){
        msg.channel.send('This bot does not respond to DMs.\n Please send your command in a server')
    }else{
    if (msg.content.startsWith(prefix)){
        let args = msg.content.substring(prefix.length).split(' ');
        switch (args[0]){
            case 'xp' :
                CommandHandler.xpGet(msg,database,args);
            break;
            case 'check': 
                CommandHandler.check(msg,database,args,'message');
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
        xp(msg,database);

        return;
    }
}
}


client.on('message', main);

client.login(process.env.TOKEN);
    


