const chatmodel = require('../../models/chat/chat_model')

const csocket = io => {
    io.on("connection", (socket) => {
        // console.log("connected to chat")
        socket.on("room_name", data => {
            console.log("jfd")
            console.log(data)
            socket.join(data)
        })
        io.setMaxListeners(1000000)
        socket.on('new_message', data => {
            console.log(data[0][3])
            io.in(data[0][1]).emit("newmsg", {
                text: data[0][0],
                senderId: data[0][2],
                img: '',
                emoji_data: data[0][3]
            })
            chatmodel.findOne({
                    _id: data[0][1]
                })
                .then(
                    resp => {
                        resp.messages.push({
                            "senderId": data[0][2],
                            "text": data[0][0],
                            "img": "null",
                            "emoji_data": data[0][3]
                        })

                        // console.log(resp.comments)
                        resp.save()
                        // console.log(resp)
                    }
                )
                .catch(err => {
                    console.log(err)
                })
        })
        socket.emit("hey")
    })
}
module.exports = csocket;