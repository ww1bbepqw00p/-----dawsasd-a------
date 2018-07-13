const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hoş-geldin-ayarla',
			aliases: ['hoşgeldinayarla', 'hoşgeldin', 'hoş-geldin'],
			group: 'ayarlar',
			memberName: 'hoş-geldin-ayarla',
			description: 'Hoş geldin kanalını değiştirmenizi sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'channel',
					prompt: 'Hangi Kanal Hoş Geldin Kanali Olsun?',
					type: 'channel',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {

  var ch = await args.channel;
if (ch.type == 'voice') return msg.reply('Sesli kanallar seçilemez!');
    if (args.channel) {
  const vt = this.client.provider.get(msg.guild.id, 'logsChannel', []);
  const db = this.client.provider.get(msg.guild.id, 'logsEnable', []);
  if (vt === args.channel.id) {
    this.client.provider.set(msg.guild.id, 'logsEnable', true);
    const embed = new RichEmbed()
    .setColor('RANDOM')
    .setDescription(`Hoş Geldin Kanali #${args.channel.name} Olarak Zaten Belirlenmis.`)
    .setFooter('Hoş Geldin Ayarlandı.')
    msg.embed(embed)

  } else {
    this.client.provider.set(msg.guild.id, 'logsChannel', args.channel.id);
    this.client.provider.set(msg.guild.id, 'logsEnable', true);
    const embed1 = new RichEmbed()
    .setColor('RANDOM')
    .setDescription(`Hoş Geldin Kanalı #${args.channel.name} Olarak Belirlendi.`)
    .setFooter('Hoş Geldin Ayarlandı.')
    return msg.embed(embed1)
  }
    }
  }
};
