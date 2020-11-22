//require the discord api
const first = require('discord.js');
const client = new first.Client();
var dict = require('./dict.jsonc');
var dicta = require('./dicta.jsonc');
var CommandHandler = require('./commands/commands');
var dictionary = {
    users = [],
    ids = []
}
function userObject(id, xp){
 this.id = id;
 this.xp = xp; 
} 
const prefix = '--';

//Copy paste bot token in empty quotes
client.on('ready', ready);
function ready(){
    console.log("Alright, we are ready!")
    client.user.setActivity("Drinking Water!💧💦")
}
/*/Call is working
function call(msg){
    var f =0;
    if (msg.channel.name == undefined){
        if (f==0 && !msg.author.bot){
            msg.reply("Sorry, us bots don't respond to DM's. Try adding me to a server if you want to speak to me.")
            f=1;
        }
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
function main(msg){
    if (msg.content.startsWith(prefix)){
        let args = msg.content.substring(1).split('');
        switch (args[0]){
            case 'xp' :
                CommandHandler.xp(msg,dictionary,args);
            break;
            case 'check': 
                CommandHandler.check(msg,dictionary,args);
            break;
            case 'joke':
                CommandHandler.joke(msg,dictionary,args);
            default:
                msg.channel.send("That is not a valid command.")


        }

    } else {
        return;
    }
}


client.on('message', main);

client.login('Nzc3Nzc5MjcyOTk4NzE1NDEz.X7IZZQ.a-1jFit4CoRnmvJrAFZA6ZXgZyk');