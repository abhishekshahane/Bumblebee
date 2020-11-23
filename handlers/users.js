exports.finduserinDB = (dictionary,id) => {
    return dictionary.users[dictionary.ids.indexOf(id)];
 
 }

exports.writeUser = (id,xp,server)=>{
    let user = new userObject(id,xp,server);
    dictionary.users.push(user);
    dictionary.ids.push(id);
    return user;
}

function userObject(id, xp, server){
    this.id = id;
    this.server = server;
    this.xp = xp; 
    
   } 

exports.check = (msg,dictionary,args,intent) => {
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
    
    }