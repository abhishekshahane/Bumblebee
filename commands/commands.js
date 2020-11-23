exports.check = function check(msg,dictionary,intent){
if(dictionary.ids.contains(msg.author.id)){
    let userObject = finduserinDB();
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
exports.xp = function xp(msg,dictionary){};
exports.joke = function joke(msg,dictionary){}; 

function finduserinDB(dictionary,id){
   return dictionary.users[dictionary.ids.indexOf(id)];

}