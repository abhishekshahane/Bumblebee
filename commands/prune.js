const Discord = require('discord.js');
//Keep in mind that the bot has to have admin perms for this to work!
module.exports = {
    name: "prune",
    description: "Delete messages with this!",
    usage: "!purge [integer n such that n>1 and n<100]",
    aliases: ["purge", "bulkdelete"],
    run: async (message, client, args) => {
        if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) { //check for perms
            return message.channel.send({embed: {color: "#008000", description: "You don't have access to this command."}})
        };
      //convert into an integer
        const amount = parseInt(args[0]);
  
        if (isNaN(amount)) { // if amount is not a number
            console.log(amount);
            console.log(args[0]);
            return message.reply({embed: {color: "#008000", description: "Please input a valid number."}}) // error
        } else if (amount <1 || amount > 100) { // if amount is less then 1 or more than 100(limit) 
            return message.reply({embed: {color: "#008000", description: "Please input a number between 1 and 100."}}) // error
        } else { 
            //bulk delete amount
            return message.channel.bulkDelete(amount, true).catch(err => {// if there is an error
            console.error(err);
            return message.reply({embed: {color: "#008000", description: "There was an error, please try again later."}}) // error
            });
        }
  }
};