//require the discord api
const first = require('discord.js');
const client = new first.Client();
var dict = require('./dict.json');
var dicta = require('./dicta.json');
var xp = {};
//Copy paste bot token in empty quotes
client.login('')
client.on('ready', ready);
function ready(){
    console.log("Alright, we are ready!")
    client.user.setActivity("Drinking Water!💧💦")
}
//Call is working
function call(msg){
    var f =0;
    if (msg.channel.name == undefined){
        if (f==0 && !msg.author.bot){
            msg.reply("Sorry, we bots don't respond to DM's. Try adding me to a server if you want to speak to me.")
            f=1;
        }
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
        }
        if (msg.content==='--check'){
            msg.channel.send("Returning JSON data......");
            for (var key in dict){
                msg.channel.send(`${dicta[key]} : ${dict[key]+1}`)
            }
        }
        else if(msg.content.startsWith("--xp")){
            //var strsplit = msg.content.split(" ");
            //console.log(strsplit[0])
            var get = msg.mentions.users.first().discriminator;
            msg.channel.send(`${dicta[get]} : ${xp[get]}`)
        }
    }
    
}

client.on('message', call);
