//require the discord api
const first = require('discord.js');
const client = new first.Client();
var dict = require('./dict.json');
var dicta = {};
//Copy paste bot token in empty quotes
client.login('Nzc3Nzc5MjcyOTk4NzE1NDEz.X7IZZQ.5Z18MKScODCD16tSxm73bIq7LMY')
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
