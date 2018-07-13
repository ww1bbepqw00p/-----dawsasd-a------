const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'uyar',
            group: 'moderasyon',
            memberName: 'uyar',
            description: 'Belirlediniz Kisiyi Uyarir.',
            args: [
                {
                    key: 'kisi',
                    prompt: 'Kimi Uyarmak Istiyorsunuz?',
                    type: 'user'
                },
                {
                  key: 'sebep',
                  prompt: 'Neden Uyarmak Istiyorsunuz?',
                  type: 'user',
                }
            ]
        });
    }
    hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
    }

    run(msg, args) {
        const kanal = msg.guild.channels.get(msg.guild.settings.get('modLog'));
        if (!kanal) return msg.reply('Mod Log kanalını bulamıyorum. Lütfen `mod-log-ayarla` komutu ile bir mod log kanalı belirleyin.');

          msg.reply('İşlem Başarılı!');
       const embed = new RichEmbed()
       .setColor('RANDOM')
       .addField('Uyarılan Kisi', args.kisi)
       .addField('Uyarma Sebebi', args.sebep)
       .addField('Uyaran Yetkili', msg.author.tag)
       .setFooter('Uyarilmasi | 1')
        return kanal.send(embed);

    }
}
