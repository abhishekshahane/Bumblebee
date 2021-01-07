const fetch = require('node-fetch');

module.exports = {
  name: "joke",
  description: "Get a funny joke with this!",
  usage: "!joke",
  run: async (msg, client) => {
    let result = await fetch('https://official-joke-api.appspot.com/random_joke')
    
    let joke = await result.json()
    
    msg.channel.send(`${joke.setup}\n||${joke.punchline}||`)
  }
}