const db = require('quick.db')//we'll need quick.db

module.exports={
  name: "todo",
  usage: "!todo add [STUFF] or !todo delete [number of the todo] or !todo",
  run: async(message, client) => {
    //so first, we need to add this in the db
    //done, now for checking what the args is 
    let strsplit = message.content.split(" ")
    if (strsplit[1]==='add'){
      //get the persons todo
      const args = message.content.split("add ")
      //removes the add, so the todo will be args[1]
      const todo = args[1];
      const arr = await db.get(`User${message.author.id}.todo`)
      if (!arr) {
        await db.set(`User${message.author.id}.todo`, [])
        arr = await db.get(`User${message.author.id}.todo`) 
      }
      arr.push(args[1])
      await db.set(`User${message.author.id}.todo`, arr)
      let embed = {
        description: `We've added that todo to your todos list, ${message.author.username}!`,
        color: "#808000"//olive in hexcode
      }
      return message.channel.send({
        embed: embed
      })
    }
    else if(strsplit[1]==='delete'){
      //get the persons todo
      const args = message.content.split("delete")
      //removes the add, so the todo will be args[1]
      const todo = parseInt(args[1]);
      let arr = await db.get(`User${message.author.id}.todo`)
      if (!arr) {
        await db.set(`User${message.author.id}.todo`, [])
        arr = await db.get(`User${message.author.id}.todo`) 
      }
      let i = arr[todo-1];
      if (i == -1) {
        let embed = {
          description: `We could not find "${todo}" in your todo list`, 
          color: "RED"
        }
        return message.channel.send({embed: embed})
      }
      arr.splice(todo-1, 1)
      await db.set(`User${message.author.id}.todo`, arr)
      let embed = {
        description: `We've deleted your todo from your todos list ${message.author.username}!`,
        color: "#808000"//olive in hexcode
      }
      return message.channel.send({
        embed: embed
      });
    }
    //if the user enters just !todo
    else if(!strsplit[1] && strsplit[0]==='!todo'){
      let allforUser = await db.get(`User${message.author.id}.todo`);
      if (!allforUser) {
        await db.set(`User${message.author.id}.todo`, [])
        allforUser = await db.get(`User${message.author.id}.todo`) 
      }
      console.log(allforUser)
      let text = `${message.author.username}'s Todolist:\n`;
      //lol js isnt like python
      //it kinda is
      for (let i = 0; i < allforUser.length; i++){
        let next = i+1
        text+=`${next}. `
        text+=allforUser[i]
        text+='\n'
      }
      
      if (text===`${message.author.username}'s Todolist:`){
        text = `You don't have any todos, ${message.author.username}! Add one by typing !todo add [TODO].`
      }
      let embed = {
        description: text,
        color: "#808000"//olive in hexcode
      }
      return message.channel.send({
        embed: embed
      });
    }
    
  }
}
