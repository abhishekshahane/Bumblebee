const fetch = require('node-fetch');
const { meme } = require('memejs')

const role = require('./role');

exports.check = function check(msg,dictionary,args, intent){
if(dictionary.ids.contains(msg.author.id)){
    let userObject = finduserinDB(dictionary,msg.author.id);
    if(intent="message"){
        msg.channel.send('User is in database:');
        msg.channel.send('User xp is '+userObject.xp);
    }
  else if(intent = 'get'){
    return userObject;

    }
  else if(intent = 'check'){
    return true;
  }
} else if(intent = 'check'){
    return false; 
} else if(intent = 'get'){
    throw new Error; 
}   

};
exports.xp = function xp(msg,dictionary, args){
    if(args[1]){
        try {
            
            var mentioned = msg.mentions.users.first().id;
            let userObject = finduserinDB(dictionary,mentioned);
            if (dictionary.userObject.xp == 0){
                msg.channel.send("This user has not said anything yet, so their XP is 0.")
            }
            else{
                msg.channel.send(msg.mentions.users.first().tag+"'s xp is: "+dictionary.userObject.xp);
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
function finduserinDB(dictionary,id){
   return dictionary.users[dictionary.ids.indexOf(id)];

}

let getJoke = async () => {
    
  }