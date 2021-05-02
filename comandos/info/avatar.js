const Discord = require("discord.js");
const quote = require("../../utils/quote.js")
const error = require("../../utils/errors.js")

module.exports = {
  name: "avatar",
  aliases: ["av"],
  usage: "avatar (@usuario/id)",
  description: "Mostra o avatar de um user mencionado",
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)

    let user = message.mentions.users.first() || await client.users.cache.get(args[0]) || message.author;

    let avatar = user.displayAvatarURL({ size: 2048, dynamic: true, format: "png" })

    const embed = new Discord.MessageEmbed()
      .setTitle(`**Avatar de ${user.username}**`)
      .setDescription(`**[Clique Aqui](${avatar}) para baixar o avatar**`)
      .setImage(avatar)
      .setColor("BLACK")
    message.quote(embed)

  }
}