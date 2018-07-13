const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')

module.exports = class JoinRoleCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'otorol',
			aliases: ['girişrolüayarla', 'girişrolü', 'giriş-rolü', 'girisrolu', 'girisrol', 'girişrol', 'girisroluayarla'],
			group: 'ayarlar',
			memberName: 'otorol',
			description: 'Giriş rolünü belirlemenizi/ayarlamanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'rol',
					prompt: 'Oto Rol Hangi Rol Olsun\n',
					type: 'role',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			const vt = this.client.provider.get(msg.guild.id, 'girisRol', []);
			const db = this.client.provider.get(msg.guild.id, 'girisRolK', []);
			if (vt === args.rol.id) {
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
        const embed = new RichEmbed()
        .setColor('RANDOM')
				.setTittle('Deneme')
        .setDescription(`Giriş rolü zaten **${args.rol.name}** olarak ayarlı.`)
        .setFooter('Oto Rol Ayarlandı.')
        msg.embed(embed)
			} else {
				this.client.provider.set(msg.guild.id, 'girisRol', args.rol.id);
				this.client.provider.set(msg.guild.id, 'girisRolK', true);
        const embed1 = new RichEmbed()
        .setColor('RANDOM')
        .setDescription(`Oto rol olarak ayarlanan rol: **${args.rol.name}**.`)
        .setFooter('Oto Rol Ayarlandı.')
        return msg.embed(embed1)
			}
	}
};
