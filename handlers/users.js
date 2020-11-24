exports.finduserinDB = (database,id) => {
    return database.users[database.ids.indexOf(id)];
 
 }

exports.writeUser = (id,xp,server,database)=>{
    let user = new userObject(id,xp,server);
    database.users.push(user);
    database.ids.push(id);
    return user;
}

function userObject(id, xp, server){
    this.id = id;
    this.server = server;
    this.xp = xp; 
    
   } 

exports.check = (msg,database,args,intent) => {
    if(database.ids.includes(msg.author.id)){
        let userObject = finduserinDB(database,msg.author.id);
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