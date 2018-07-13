const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class TavsiyeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'yaz',
            group: 'bot',
            memberName: 'yaz',
            description: 'Isdediniz Seyi Bota Yazdirirsiniz.',
            args: [
                {
                    key: 'tavsiye',
                    prompt: 'Ne Yazdirmak Istiyorsun?',
                    type: 'string'
                }
            ]
        });
    }

async run(msg, args) {
  msg.delete(1)
const embed = new RichEmbed()
.setDescription(`${args.tavsiye}`)
.setColor('RANDOM')
return msg.embed(embed)
}
}
