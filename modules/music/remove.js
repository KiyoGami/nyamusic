module.exports = {
    name: 'remove',
    aliases: ['delete', 'erase', 'del'],
    inVoiceChannel: true,
    run:async (client, message, args) => {
        if(!args.length) return message.channel.send('Cần có vị trí hoặc khoảng cần xoá')
        index = []
        args.forEach(n => {
            const x = Number(n)
            if(Number.isInteger(x)) index.push(x)
        })
        console.log(index)
        const queue = client.distube.getQueue(message)
        if(!queue) return message.channel.send('Hàng đợi rỗng!')
        let songs = queue.songs
        if(index[0] >= songs.length) return message.channel.send('Ví trí cần xoá không tồn tại')
        if(index.length == 1){
            songs.spilce(index[0],1)
        }else{
            if(index[1] < index[0]) return message.channel.send('Ví trí sau cần lớn hơn hoặc bằng vị trí trước.')
            if(index[1] >= songs.length) return message.channel.send('Ví trí cần xoá không tồn tại')
            songs.spilce(index[0], index[1] - index[0] +1 )
        }
    }
}       