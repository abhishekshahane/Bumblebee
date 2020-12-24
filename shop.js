const db = require('quick.db')
var imports = require('../consts/constants.js')
module.exports = {
  name: "shop",
  usage: "!shop", 
  run: async(message, client) => {
      var second = imports.thingsToBuy
    
      let text = "";
      for (let i = 0; i < second.length; i++) {
        //This is very long, so please don't strain your eyes reading this :)
        text += `Name: ${second[i].name}\nPrice: ${second[i].price}\nDescription: ${second[i].description}\n${second[i].emoji}\nPercentage of growth(your money will grow every week based on this): ${second[i].percentageOfGrowth}\n\n`;
      }
      let embed = {
        color: "#fafafa",
        description: text
      };
      message.channel.send({
        embed: embed
      });
    
  }
}
