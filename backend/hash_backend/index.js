var app = require("express")();
var cors = require("cors");
const express = require("express");
var server = require("http").Server(app);
var io = require("socket.io")(server);
const testfunc = require("./test")(io)
const formsock = require("./api/forms/form_sockets")(io)
const chatsock = require("./api/chat/chat_socket")(io)
setInterval(() => {
    test()
}, 1000000);
let test = () => console.log(`running on ${PORT}`)
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use("/api/forms", require("./api/forms/forms"))
app.use("/api/chat", require("./api/chat/chat"))
app.use("/api/user", require("./api/users/users"))
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
io.on('connection', socket => {
    console.log(`socket created with id ${socket.id}`)
})
const PORT = process.env.PORT || 8080;
server.listen(PORT, "0.0.0.0", () =>
    console.log(`server started on port ${[PORT]}`)
);