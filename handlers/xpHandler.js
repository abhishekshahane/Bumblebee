const { check } = require("./commands")
const userMethods = require("./users")

exports.xp = function(msg,dictionary){
if(check(msg,dictionary,null,'check')&& randomNumber(0,3) == 2){
   
    user = finduserinDB(dictionary,msg.author.id);
    
    user.xp += randomNumber(3,7);


} else if(!check(msg,dictionary,null,'check')) {
    
    addUser(msg,dictionary);
    msg.channel.send('Welcome to the Server, '+msg.author.tag);
}
}

function randomNumber(min,max){
    return Math.floor((Math.random() * max) + min);
}
function addUser(msg,dictionary){
return userMethods.writeUser(msg.author.id,randomNumber(2,4),msg.guild.id);
};