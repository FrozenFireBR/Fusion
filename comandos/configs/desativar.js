const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const error = require("../../utils/errors.js")
const emoji = require("../../utils/emojis.js")
const quote = require("../../utils/quote.js")

module.exports = {
  name: "desativar",
  aliases: ["configoff"],
  description: "Feito para desativar as configurações do servidor!",
  usage: "desativar",
  run: async (client, message, args) => {
if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return error.permissionFor(message)
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**${emoji.errado} |Você precisa da permissão de \`Administrador\` para realizar este comando**`)


const embed = new MessageEmbed()
.setTitle(`${emoji.config} Config off ${message.guild.name}`)
.setDescription("Para desativar cada opção basta reagir ao emoji indicado:\n\n**<a:download_Fusion:826103385623101470> <a:setaFusion:816816386843738162> `Entrada`**\n**<:b_delete:835233267640434750> <a:setaFusion:816816386843738162> `Saída`**\n**<:b_link:835234866878087179> <a:setaFusion:816816386843738162> `Level Up`**\n**<:c:835236250558005269> <a:setaFusion:816816386843738162> `Mod Log`**\n**<:b_mundo:835235915319869451> <a:setaFusion:816816386843738162> `Sugestão`**\n** <:rei_Fusion:831121925820121118> <a:setaFusion:816816386843738162> `Prefixo`**\n**<:host_Fusion:831121757732601898> <a:setaFusion:816816386843738162> `AutoRole`**\n**<:suporte_Fusion:824603708783460422> <a:setaFusion:816816386843738162> `AntiRaid`**")
.setColor("BLACK")
.setThumbnail(message.guild.iconURL())
.setFooter(`Requisitado por ${message.author.tag}`, message.author.displayAvatarURL())
var msg = await message.quote(embed)
await msg.react("<a:download_Fusion:826103385623101470>")
await msg.react("<:b_delete:835233267640434750>")
await msg.react("<:b_link:835234866878087179>")
await msg.react("<:b_wifi:835236250558005269>")
await msg.react("<:b_mundo:835235915319869451>")
await msg.react("<:rei_Fusion:831121925820121118>")
await msg.react("<:host_Fusion:831121757732601898>")
await msg.react("<:suporte_Fusion:824603708783460422>")


const filtro = (reacao, usuario) => usuario.id === message.author.id
const coletor = msg.createReactionCollector(filtro, {
  time: 90000
})

coletor.on("collect", (reacao, usuario) => {
  switch (reacao.emoji.name) {
case "download_Fusion":
db.delete(`welcome_${message.guild.id}`)
db.delete(`welmsg_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Entrada desativado com sucesso!**`)
break;
case "b_delete":
db.delete(`bye_${message.guild.id}`)
db.delete(`byemsg_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Saída desativado com sucesso!**`)
break;
case "b_link":
db.delete(`channelup_${message.guild.id}`)
db.delete(`lvlM_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Level Up desativado com sucesso!**`)
break;
case "b_wifi":
db.delete(`cMod_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Logs desativado com sucesso!**`)
break;
case "b_mundo":
db.delete(`suggestchan_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Sugestões desativado com sucesso!**`)
break;
case "rei_Fusion":
db.delete(`${message.guild.id}.prefix`)
message.channel.send(`${emoji.certo} **Prefixo resetado com sucesso!**`)
break;
case "host_Fusion":
db.delete(`autorole_${message.guild.id}`)
message.channel.send(`${emoji.certo} **Sistema de Autorole desativado com sucesso!**`)
break;
case "suporte_Fusion":
db.delete(`antilink_${message.guild.id}`)
db.delete(`antifake_${message.guild.id}`)
db.delete(`antibot_${message.guild.id}`)
message.channel.send("** AntiRaid Desativado Com Sucesso**")
break;

  }
})

coletor.on("end", () => {
      msg.delete({timeout: 90000}).catch(console.error)
    })

  }
}