const fetch = require('node-fetch');

module.exports = {
  name: "joke",
  run: async (msg, client) => {
    let joke = await getJoke()
    msg.channel.send(`${joke.setup}\n||${joke.punchline}||`)
  }
}

let getJoke = async () => {
  let result = await fetch('https://official-joke-api.appspot.com/random_joke')
  let json = await result.json()
  return json
}