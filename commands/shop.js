const db = require('quick.db')
var imports = require('../consts/constants.js')
module.exports = {
  name: "shop",
  usage: "!shop", 
  run: async(message, client) => {
      var second = imports.thingsToBuy
    
      let text = "Welcome to the stock market!\n\nKeep in mind that these are *fictional* prices.\n\n";
      for (let i = 0; i < second.length; i++) {
        //This is very long, so please don't strain your eyes reading this :)
        text += `Name: ${second[i].name}\nPrice per share: ${second[i].price}\nPercentage Of Growth(You will get this much back every week based on the shares you buy in that week): ${second[i].percentageOfGrowth}\n${second[i].emoji}\nMaximum amount of shares you can buy in a week: ${second[i].maxAmountOfShares}\n\n`;
      }
      let embed = {
        color: "#00FFFF",
        description: text
      };
      message.channel.send({
        embed: embed
      });
    
  }
}
