//require the discord api
const first = require('discord.js');
const client = new first.Client();
var dict = require('./dict.json');
var dicta = require('./dicta.json');
//Copy paste bot token in empty quotes
client.login('')
client.on('ready', ready);
function ready(){
    console.log("Alright, we are ready!")
    client.user.setActivity("Drinking Water!🐱‍🏍✨")
}
//Call is working
function call(msg){
    if (dict[msg.author.discriminator]>=0){
        dict[msg.author.discriminator]+=1;
    }
    else if(dict.hasOwnProperty(msg.author.discriminator)!=true){
        dict[msg.author.discriminator] = 0;
        dicta[msg.author.discriminator] = msg.author.username;
    }
    if (msg.content==='--check'){
        msg.channel.send("Returning JSON data......");
        for (var key in dict){
            msg.channel.send(`${dicta[key]} : ${dict[key]+1}`)
        }
    }
    
}

client.on('message', call);
