const { check } = require("./commands")
const userMethods = require("./users")

exports.xp = function(msg,database){
if(check(msg,database,null,'check')&& randomNumber(0,3) == 2){
   
    user = finduserinDB(database,msg.author.id);
    
    user.xp += randomNumber(3,7);


} else if(!check(msg,database,null,'check')) {
    
    addUser(msg,database);
    msg.channel.send('Welcome to the Server, '+msg.author.tag);
}
}

function randomNumber(min,max){
    return Math.floor((Math.random() * max) + min);
}
function addUser(msg,database){
return userMethods.writeUser(msg.author.id,randomNumber(2,4),msg.guild.id);
};