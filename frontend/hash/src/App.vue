<template>
  <div id="app" ref="app">
    <!-- <div class="snackbar elevation-24" ref="snackbar">{{this.notificationMessage}}</div> -->
    <router-view/>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway");

#app {
  font-family: "Raleway";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import io from "socket.io-client";
import { EventBus } from "./eventbus.js";
import * as firebase from "firebase";

export default {
  name: "app",
  data() {
    return {
      socket: io("http://172.16.108.14:8080/"),
      notificationMessage: "New Post From subform  - "
    };
  },
  mounted: function() {
    this.getSocket();
    this.listenEventBus();
  },
  methods: {
    getSocket() {
      var vm = this;
      this.socket.on("post_resp", data => {
        console.log(data);
        EventBus.$emit("newPost", data);
        // var x = `${data.subForum}`
        var temp = document.createElement("div");
        temp.style.position = "fixed";
        temp.style.bottom = "5vh";
        temp.style.left = "2vw";
        temp.style.background = "#2c3e50";
        temp.style.width = "auto";
        temp.style.height = "auto";
        temp.style.zIndex = "999";
        temp.style.borderRadius = "10px";
        temp.style.transition = "1s";
        temp.classList.add("elevation-24");
        temp.setAttribute("id", "snackbarCont");
        temp.innerHTML = `
        <div ref="snackbar" style="display: flex;flex-direction: row;">
          <img src="https://firebasestorage.googleapis.com/v0/b/sip-bphc.appspot.com/o/forumImg%2Falarm.svg?alt=media&token=c985f18d-fd0c-4979-9f3c-c4d2a859adec" 
            style="height: 25px;width: 25px;margin-right: 20px;margin-top: 20px;margin-left: 30px"  />
          <p style="color: #ddd; padding: 20px;font-size: 14px;margin-top: 5px;margin-right: 40px;"> Got A Noew Post in subForum - 
            <strong style="color: white; font-size: 15px;margin-right: 8px;margin-left: 5px">
            ${data.subForum} 
            </strong> 
            by ${data.postedBy}
          </p>
        </div>
        `;
        if (data.postedBy == firebase.auth().currentUser.displayName) {
          alert("Posted");
        } else {
          vm.$refs.app.appendChild(temp)(() => {
            document.getElementById("snackbarCont").style.opacity = "0";
            setTimeout(() => {
              document.getElementById("snackbarCont").remove();
            }, 1000);
          }, 10000);
        }
      });
      this.socket.on("resp_comment", comment_resp => {
        EventBus.$emit("newComment", comment_resp);
      });
      console.log("yo");
    },
    listenEventBus() {
      var vm = this;
      vm.socket.on("newmsg", data => {
        EventBus.$emit("recv_msg", data);
      });
      EventBus.$on("getUserChatDetails", x => {
        vm.socket.emit("room_name", x);
      });
      EventBus.$on("sendMessage", (e, x, s) => {
        vm.socket.emit("new_message", [e, x, s]);
      });
      EventBus.$on("createPost", data => {
        vm.socket.emit("post", data);
        console.log(data);
      });
      EventBus.$on("comment", commentData => {
        vm.socket.emit("comment", commentData);
      });
    }
  }
};
</script>
