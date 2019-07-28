const formmodel = require("../../models/forms/forms_model");
const posts = io => {
    io.on("connection", socket => {
        // console.log("connected sucessfull on form");
        socket.emit("post2", "whats uppppppp");
        socket.on("po", (s) => {
            console.log(s)
        })
        socket.on("comment", (data_comment) => {
            // console.log("comment recieved")
            // console.log(data_comment)
            io.emit("resp_comment", data_comment);
            // console.log(data_comment.id)
            formmodel.findOne({
                    _id: data_comment.id
                })
                .then(
                    resp => {
                        // console.log(resp)
                        // console.log(resp.comments)
                        l = resp.comments.length
                        resp.comments.push({
                            [data_comment.sender]: [data_comment.comment]
                        })
                        resp.comments[l].subcomment = []
                        // console.log(resp.comments)
                        resp.save()
                    }
                )
                .catch(err => {
                    console.log(err)
                })
            // formmodel.findById(data_comment.id, (p, err) => {
            //     console.log(p)
            //     p.comments.push({
            //         [data_comment.sender]: [data_comment.comment]
            //     })
            //     console.log(p)

            // })
            // io.close()
        });
        socket.on("reply_comment", data => {
            // console.log(data)
            formmodel.findOne({
                    _id: data_comment.id
                })
                .then(
                    resp => {
                        // console.log(resp)
                        // console.log(resp.comments)
                        resp.comments[index].subcomment.push({
                            [data_commentsender]: [data_comment.comment]
                        })
                        // console.log(resp.comments)
                        resp.save()
                    }
                )
                .catch(err => {
                    console.log(err)
                })
        })
        socket.on("post", data => {
            if (!data) {
                return res.status(400).send("Request data is missing");
            }
            let model = new formmodel(data);
            model.comments = []
            model.upVotes = 0;
            model.downVotes = 0;
            model.dVoted = false;
            model.uVoted = false;
            model.noComments = 0;
            model.save();
            // console.log(model);
            io.emit("post_resp", model);
            // console.log(data);
            // console.log("it works yay");
            800
        });
        socket.on("hey", data => {
            console.log(data);
        });
    });
};

module.exports = posts;