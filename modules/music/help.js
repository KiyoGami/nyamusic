const { MessageActionRow, MessageSelectMenu, Interaction } = require('discord.js');
const { MessageEmbed} = require('discord.js')


const music = {
    color: [255, 0, 255],
    title: 'Music',
    author: {
        name: 'Nyagami',
        icon_url: 'https://pbs.twimg.com/profile_images/1461725089595269122/LOpLSfDa_400x400.jpg',
        url: 'https://twitter.com/Kiyoponya'
    },
    description: 'Sử dụng các lệnh kèm tuỳ chọn (nếu có)',
    thumbnail: {
        url: 'https://media.discordapp.net/attachments/993937119355609139/993937338268930078/KeiChibi.jpg'
    },
    fields: [
        
    ],
    timestamp: new Date(),
    footer:{
        text: 'Bảng lệnh âm nhạc',
        icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/993940553626566827/music_1.png'
    }
}

const info = {
    color: [255, 0, 255],
    title: 'Infomation',
    author: {
        name: 'Nyagami',
        icon_url: 'https://pbs.twimg.com/profile_images/1461725089595269122/LOpLSfDa_400x400.jpg',
        url: 'https://twitter.com/Kiyoponya'
    },
    description: 'Sử dụng các lệnh kèm tuỳ chọn (nếu có)',
    thumbnail: {
        url: 'https://media.discordapp.net/attachments/993937119355609139/993937338268930078/KeiChibi.jpg'
    },
    fields: [
        
    ],
    timestamp: new Date(),
    footer:{
        text: 'Bảng lệnh thông tin',
        icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/993941061338660944/information.png'
    }
}

const action = {
    color: [255, 0, 255],
    title: 'Action',
    author: {
        name: 'Nyagami',
        icon_url: 'https://pbs.twimg.com/profile_images/1461725089595269122/LOpLSfDa_400x400.jpg',
        url: 'https://twitter.com/Kiyoponya'
    },
    description: 'Sử dụng các lệnh kèm tuỳ chọn (nếu có)',
    thumbnail: {
        url: 'https://media.discordapp.net/attachments/993937119355609139/993937338268930078/KeiChibi.jpg'
    },
    fields: [
        
    ],
    timestamp: new Date(),
    footer:{
        text: 'Bảng lệnh hành động',
        icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/993941061565161512/people.png'
    }
}

const embeds = new Map()
    .set('music', music)
    .set('infomation', info)
    .set('action', action)

module.exports = {
    name: 'help',
    aliases: [],
    inVoiceChannel: false,
    run: async (client, message) => {
        let row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId('pannel')
                .setDisabled(false)
                .setPlaceholder('Bảng lệnh')
                .setOptions([{
                    label: "music",
                    value: "music",
                    description: "các lệnh về âm nhạc",
                    emoji: "🎧"
                },
                {
                    label: "info",
                    value: "infomation",
                    description: "các lệnh về thông tin",
                    emoji: "🌐"
                },
                {
                    label: "action",
                    value: "action",
                    description: "các lệnh về hành động",
                    emoji: "🔻"
                },
                ])
        )

        const embed = new MessageEmbed().setTitle('Chọn lệnh')
        
        const filter = (interaction) => interaction.isSelectMenu()

        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 10
        })

        const newembed = new MessageEmbed().setTitle('Chọn gì đó')

        let messageCollector
        
        collector.on('collect', async collected => {
            collected.message.edit({embeds: [embeds.get(collected.values[0])]})
            collected.deferUpdate()
            messageCollector = collected.message
        })

        collector.on('end', (collected) => {
            row.components[0].disabled = true
            messageCollector.edit({components: [row]})
        })

        message.channel.send({embeds: [embed], components: [row]})
    }
}
