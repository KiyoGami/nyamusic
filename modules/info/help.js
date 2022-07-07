const { MessageActionRow, MessageSelectMenu} = require('discord.js');
const config = require('../../config.json')

const musicCommmands = [
    {
        name: 'phát nhạc',
        value: '\`play/p\`+[URL/tên]',
        inline: true,
    },
    {
        name: 'tạm dừng',
        value: '\`pause/stop\`',
        inline: true
    },
    {
        name: 'phát tiếp',
        value: '\`resume/continue\`',
        inline: true
    },
    {
        name: 'vào phòng',
        value: '\`join/j\`',
        inline: true
    },
    {
        name: 'rời đi',
        value: '\`leave/off\`',
        inline: true
    },
    {
        name: 'danh sách',
        value: '\`queue/q\`',
        inline: true
    },
    {
        name: 'bỏ qua',
        value: '\`skip\`',
        inline: true 
    },
    {
        name: 'nhảy',
        value: '\`jump\`+[vị trí hợp lệ]',
        inline: true
    },
    {
        name: 'âm lượng',
        value: '\`volume/vol\`+[(%)]',
        inline: true
    },
    {
        name: 'đang phát',
        value: '\`playing/np\`',
        inline: true
    },
]
const infoCommands  = [
    {
        name: 'Trợ giúp',
        value: '\`help/h\`',
        inline: true,
    },
    {
        name: 'Dánh sách guilds',
        value: '\`servers/guilds/g\`',
        inline: true,
    },
    {
        name: 'Độ trễ',
        value: '\`ping\`',
        inline: true,
    },
    {
        name: 'Đang sử dụng',
        value: '\`nowusing/nu/using\`',
        inline: true,
    },
]

const actionCommands = [{name: 'Nói', value: '\`s\`+[...]', inline: true,}]

const embedCommands = (title, commands, footer) => embed = {
    color: config.botColor,
    title: title,
    author: {
        name: config.ownerName,
        icon_url: config.ownerAvatar,
        url: config.ownerTwitter,
    },
    description: `**Dùng lệnh**: [prefix][lệnh] [tuỳ chọn]\n\n**Ví dụ**: \`!p Youzitsu Opening\`
                    --------------------------------------`,
    thumbnail: {
        url: config.botAvatar
    },
    fields: commands,   
    timestamp: new Date(),
    footer: footer
}

const Embeds = new Map()
    .set('music', embedCommands('Muic', musicCommmands, {text: 'Bảng lệnh âm nhạc', icon_url: config.icon.mussicCommand}))
    .set('infomation', embedCommands('Infomation', infoCommands, {text: 'Bảng lệnh thông tin', icon_url: config.icon.infoCommand}))
    .set('action', embedCommands('Action', actionCommands, {text: 'Bảng lệnh hành động', icon_url: config.icon.actionCommand}))
    .set('pannel', embedCommands('Bảng lệnh', [], {text: 'Bảng hướng dẫn lệnh', icon_url: config.icon.helpPannel}))
    
module.exports = {
    name: 'help',
    aliases: ['h'],
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

        const msg = await message.channel.send({embeds: [Embeds.get('pannel')], components: [row]})

        const collector = msg.createMessageComponentCollector({
            componentType: 'SELECT_MENU',
            time: 30000,
        })
        
        collector.on('collect', async interaction => {
            interaction.update({embeds: [Embeds.get(interaction.values[0])]})
            collector.resetTimer()
        })

        collector.on('end', (collected) => {
            row.components[0].disabled = true
            msg.edit({content: 'Đã hết thời gian',components: [row]})
        })
    }
}
