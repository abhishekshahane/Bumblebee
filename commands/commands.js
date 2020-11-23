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
exports.joke = function joke(msg,dictionary){}; 

function finduserinDB(dictionary,id){
   return dictionary.users[dictionary.ids.indexOf(id)];

}