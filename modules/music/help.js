const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    aliases: [],
    inVoiceChannel: false,
    run: async (client, message) => {
        message.channel.send('Test')
        const exampleEmbed = {
            color: 0x0099ff,
            title: '**Commands Panel**',
            // url: 'https://discord.js.org',
            author: {
                name: 'Nyagami',
                icon_url: 'https://img.icons8.com/ios/344/fox--v2.png',
                url: 'https://discord.js.org',
            },
            description: 'Some description here',
            thumbnail: {
                url: 'https://img.icons8.com/ios/344/fox--v2.png',
            },
            fields: [
                {
                    name: 'cách dùng lệnh',
                    value: 'Sử dụng [prefix][lệnh (Viết hoa, thường tuỳ ý)] [tuỳ chọn kèm theo (có thể có nhiều)]'
                },
                {
                    name: 'play/p',
                    value: 'URL Youtub/ Tên bài hát',
                },
                {
                    name: 'stop/pause',
                    value: 'Không có'
                },
                {
                    name: 'pause/resume',
                    value: 'Không có'
                },
                {
                    name: 'join/j',
                    value: 'Không có'
                },
                {
                    name: 'leave/off',
                    value: 'Không có'
                },
                {
                    name: 'queue/q',
                    value: 'Không có'
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
                {
                    name: 'Inline field title',
                    value: 'Some value here',
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Classroom of the Elite',
                icon_url: 'https://img.icons8.com/ios/344/fox--v2.png',
            },
        };
        

        message.channel.send({ embeds: [exampleEmbed] });
    }
}