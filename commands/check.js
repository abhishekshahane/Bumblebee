var dict = require('/app/dict.jsonc');
var dicta = require('/app/dicta.jsonc');

module.exports = {
  name: "check",
  run: (msg, client) => {
    msg.channel.send("Returning JSON data......");
    for (var key in dict){
      msg.channel.send(`${dicta[key]} : ${dict[key]+1}`);
    };
  }
}