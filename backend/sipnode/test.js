const k = (io) => {
    a = "hello"
    io.on("connection", (socket) => {
        // console.log("connected sucessfully")
        socket.emit(a, "whats up")
        socket.on("hey", (data) => {
            console.log(data)
        })
    })
}
// export {
//     k
// }
module.exports = k