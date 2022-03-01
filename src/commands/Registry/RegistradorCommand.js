const { Command, colors } = require('../../utils')
const moment = require('moment')
moment.locale('pt-br')

module.exports = class Registrador extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'registrador'
    this.aliases = ['registrador']
    this.category = 'Registry'
    this.subcommandsOnly = false
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const guildTable = await this.client.database.guild.getOrCreate(message.guild.id)
    const obj = {
      m: 0,
      f: 0,
      n: 0,
      memberCount: message.guild.memberCount
    };
    guildTable.registradores.forEach(registrador => {
      registrador.membrosRegistrados.forEach(membro => {
        if (membro.genero === 'M') ++obj.m;
        if (membro.genero === 'F') ++obj.f;
        if (membro.genero === 'N') ++obj.n;
      });
    });
    const { MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed()
      .setTitle('Registrys do servidor:')
      .setDescription(
        `Masculino: ${obj.m}\nFeminino: ${obj.f}\nNão binário: ${obj.n}\n\n` +
                    `Total de usuários registrados: ${obj.m + obj.f + obj.n}\n` +
                    `Total de usuários sem Registrys: ${obj.memberCount - (obj.m + obj.f + obj.n)}`
      )
      .setColor(colors.default)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp();
    message.channel.send({ embeds: [embed] }).catch(() => { });
  }
}