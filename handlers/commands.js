const fetch = require('node-fetch');
const { meme } = require('memejs');
const userMethods = require('./users');

const role = require('./role');

exports.check = (msg,database,args,intent) => {
    userMethods.check(msg,database,args,intent);
};
exports.xpGet = function xp(msg,database, args){
    if(args[1]){
        try {
            
            var mentioned = msg.mentions.users.first().id;
            let userObject = userMethods.finduserinDB(database,mentioned);
            if (database.userObject.xp == 0){
                msg.channel.send("This user has not said anything yet, so their XP is 0.")
            }
            else{
                msg.channel.send(msg.mentions.users.first().tag+"'s xp is: "+database.userObject.xp);
            }
        } catch (error) {
           if (error){
            msg.channel.send('The syntax of your command is incorrect. Please follow this format --xp @[USER]')
           }
        }
        }
        else{
        msg.channel.send("The syntax of your command is incorrect. Please follow the format --xp @[USER].")
    }
};
exports.joke = async (msg, client) => {
    let result = await fetch('https://official-joke-api.appspot.com/random_joke')
    
    let json = await result.json()
    
    let joke = json 
    
    msg.channel.send(`${joke.setup}\n||${joke.punchline}||`)
      
}; 
exports.meme = async (msg, client, Discord) => {
    let m = await msg.channel.send("Retreiving meme....")
    meme('memes', (err, data) => {
      if (err) return console.log(err);
      const embed = new Discord.MessageEmbed()
      .setTitle(data.title)
      .setImage(data.url)
      .setColor("RANDOM")
      .setFooter(`r/memes | meme by u/${data.author}`);
      msg.channel.send(embed).catch(e => console.log(e)).then(() => m.delete())
    });
};
exports.role =  (message, client) =>{
    role.role(message,client);
}


let getJoke = async () => {
    
  }