const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class fake extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'fake'
    this.aliases = ['fake']
    this.category = 'Fun'
  }

  async run(message, args) {
    const embedA = new MessageEmbed()
      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
      .setFooter('🧁・Discord da Jeth', message.author.displayAvatarURL({ dynamic: true, size: 1024 }))

    if (!message.member.permissions.cache.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedA] })

    const user = message.mentions.users.first();
    const botmessage = args.slice(1).join(' ')

    if (user == null) {
      message.reply('`Faltou você mencionar o usuario`')
    }
    if (botmessage == null) {
      message.reply('`Ops parace que você esqueceu de colocar a mensagem`')
    }
    message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL({ format: 'png' }) }).then(async w => {
      w.send(botmessage);
    })
  }
}