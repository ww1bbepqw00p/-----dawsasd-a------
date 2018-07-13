const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tavsiye',
            group: 'bot',
            memberName: 'tavsiye',
            description: 'Bot için tavsiye bildirirsiniz',
            args: [
                {
                    key: 'tavsiye',
                    prompt: 'Ne tavsiyesi bildirmek istersiniz?',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {

    msg.reply('Tavsiyeniz bildirildi!');

    const embed = new RichEmbed()
    .setColor("RANDOM")
    .setTitle(`${msg.author.tag}, Tavsiye Bildirdi`)
    .addField(`》 Kulanıcı Hakkında`, `İsim: ${msg.author.tag}\nID: ${msg.author.id}`)
    .addField('》 Sunucu Hakkında', `Sunucu Ismi: ${msg.guild.name}\nSunucu ID: ${msg.guild.id}`)
    .addField("》 Tavsiye", args.tavsiye)
    .setThumbnail(msg.author.avatarURL)
    .setTimestamp()
    this.client.channels.get("465833842482216970").send(embed);
}
}
