const { MessageActionRow, MessageSelectMenu, Interaction } = require('discord.js');
const { MessageEmbed} = require('discord.js')


const music = {
    color: [255, 169, 71],
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
        {
            name: 'phát nhạc',
            value: '[play/p]+[URL/tên]',
            inline: true,
        },
        {
            name: 'tạm dừng',
            value: 'pause/stop',
            inline: true
        },
        {
            name: 'phát tiếp',
            value: 'resume/continue',
            inline: true
        },
        {
            name: 'vào phòng',
            value: 'join/j',
            inline: true
        },
        {
            name: 'rời đi',
            value: 'leave/off',
            inline: true
        },
        {
            name: 'danh sách',
            value: 'queue/q',
            inline: true
        },
        {
            name: 'bỏ qua',
            value: 'skip',
            inline: true 
        },
        {
            name: 'nhảy',
            value: 'jump+[vị trí hợp lệ]',
            inline: true
        },
        {
            name: 'âm lượng',
            value: 'volume/vol+[(%)]',
            inline: true
        },
        {
            name: 'đang phát',
            value: 'playing/np',
            inline: true
        },
    ],
    timestamp: new Date(),
    footer:{
        text: 'Bảng lệnh âm nhạc',
        icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/993940553626566827/music_1.png'
    }
}

const info = {
    color: [255, 169, 71],
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
        {
            name: 'Dánh sách guilds',
            value: 'server/guilds/g',
            inline: true,
        },
        {
            name: 'Độ trễ',
            value: 'ping',
            inline: true,
        },
    ],
    timestamp: new Date(),
    footer:{
        text: 'Bảng lệnh thông tin',
        icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/993941061338660944/information.png'
    }
}

const action = {
    color: [255, 169, 71],
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
        {
            name: 'Nói',
            value: 's'
        }
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

const panelEmbed = {
    color: [255, 169, 71],
    title: 'Bảng lệnh',
    author: {
        name: 'Nyagami',
        icon_url: 'https://pbs.twimg.com/profile_images/1461725089595269122/LOpLSfDa_400x400.jpg',
        url: 'https://twitter.com/Kiyoponya'
    },
    description: '**Dùng lệnh**: [prefix][lệnh] [tuỳ chọn]\n**Ví dụ**: !p classroom of the elite op',
    thumbnail: {
        url: 'https://media.discordapp.net/attachments/993937119355609139/993937338268930078/KeiChibi.jpg'
    },
    timestamp: new Date(),
    footer:{
        text: 'Bảng hướng dẫn lệnh',
        icon_url: 'https://cdn.discordapp.com/attachments/993937119355609139/994075767581454366/command.png'
    }
}

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
        
        const filter = (interaction) => interaction.isSelectMenu()

        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 10
        })

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

        message.channel.send({embeds: [panelEmbed], components: [row]})
    }
}
