module.exports = {
  name: "role",
  usage: "!role [@user] [@color] [@role name]",
  run: (message, client) => {
    let toGive = message.mentions.members.first()
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      return message.channel.send({embed: {
        description: "You do not have the `MANAGE_ROLES` permission to give roles to users",
        color: "FF0000"
      }})
    }
    if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
      return message.channel.send({embed: {
        description: "I do not have the `MANAGE_ROLES` permission to give roles to users",
        color: "FF0000"
      }})
    }
    if (!toGive) {
      return message.channel.send({embed: {
        description: "Mention a user for me to give a role to!",
        color: "FF0000"
      }})
    }
    let args = message.content.split(' ').slice(1)
    let name = message.content.split(' ').slice(3).join(' ')
    console.log(args)
    if (args[0] != `<@!${toGive.id}>`) {
      return message.channel.send({embed: {
        description: "The correct format is `!role @USER [role name] [Color]`",
        color: "FF0000"
      }})
    }
    if (!isHexColor(args[1].split('#')[1])) {
      return message.channel.send({embed: {
        description: "The color must be in hexadecimal form!",
        color: "FF0000"
      }})
    }
    if (!name) {
      return message.channel.send({embed: {
        description: "Please provide a name for the role!",
        color: "FF0000"
      }})
    }
    message.guild.roles.create({
      data: {
        name: name,
        color: args[1]
      }
    }).then(r => {
      toGive.roles.add(r).then(member => {
        return message.channel.send({embed: {
          description: `Successfully gave ${r} to <@${member.id}>`,
          color: "00FF00"
        }})
      }).catch(e => {
        console.log(e)
        return message.channel.send({embed: {
          description: "An error occured when I was attempting to give the role to " + `<@${toGive.id}>`,
          color: "FF0000"
        }})
      })
    }).catch(e => {
      console.log(e)
      return message.channel.send({embed: {
        description: "An error occured when I was attempting to create the role",
        color: "FF0000"
      }})
    })
  }
}

//function to check if color gave is in hexadecimal form
function isHexColor (hex) {
  return typeof hex === 'string'
      && hex.length === 6
      && !isNaN(Number('0x' + hex))
}
