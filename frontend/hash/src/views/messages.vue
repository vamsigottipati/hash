<template>
  <div class="msgPageBody" id="msgPageBody" ref="pageBody">
    <!-- <navBar/> -->

    <div ref="fileModal" class="dropDownModal">
      <i @click="closeFileModal" class="material-icons modalCloseBtn">highlight_off</i>
      <p>File Upload Modal</p>
    </div>
    <div ref="emogiModal" style="height: auto;" class="dropDownModal">
      <i @click="closeEmojiModal" class="material-icons modalCloseBtn">highlight_off</i>
      <p style="color: white;padding: 20px;font-size: 18px; text-align: left;padding-left: 40px;padding-top: 4vh;">Chose
        Your Emoji</p>
      <div
        style="display: flex; flex-direction: row;width: calc(60vw-80px); height: auto;margin-top: 30px; margin-right: 40px;">
        <p @click="changeEmojiDisp('all')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">All</p>
        <p @click="changeEmojiDisp('smileys')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">Smileys
        </p>
        <p @click="changeEmojiDisp('animals')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">Animals
        </p>
        <p @click="changeEmojiDisp('places')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">Places</p>
        <p @click="changeEmojiDisp('objects')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">Objects
        </p>
        <p @click="changeEmojiDisp('symbols')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">Symbols
        </p>
        <p @click="changeEmojiDisp('flags')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">Flags</p>
        <p @click="changeEmojiDisp('food')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">food</p>
        <!-- <p @click="changeEmojiDisp('activities')" style="color: #bbb;flex: 1;text-align: center;cursor: pointer;">activities</p> -->
      </div>
      <div v-if="emoji_active == 'all'"
        style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in all_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.unified)"
          style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div>
      <div v-if="emoji_active == 'smileys'"
        style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in smiley_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.unified)"
          style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div>
      <div v-if="emoji_active == 'animals'"
        style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in animals_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.unified)"
          style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div>
      <div v-if="emoji_active == 'places'"
        style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in places_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.unified)"
          style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div>
      <div v-if="emoji_active == 'objects'"
        style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in objects_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.unified)"
          style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div>
      <div v-if="emoji_active == 'symbols'"
        style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in symbols_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.unified)"
          style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div>
      <div v-if="emoji_active == 'flags'"
        style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in flags_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.name)"
          style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div>
      <div v-if="emoji_active == 'food'"
        style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in food_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.unified)"
          style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div>
      <!-- <div v-if="emoji_active == 'activities'" style="display: flex; flex-direction: row;width: calc(60vw - 100px); height: 50vh;background: transparent;margin-left: 40px; margin-bottom: 50px;margin-top: 30px;flex-wrap: wrap;overflow: auto;">
        <img v-for="(se, i) in activities_emoji" :key="i" :src="getImageUrl(se.image)" @click="addEmoji(se.unified)" style="width: 25px; height: 25px; margin: 20px;cursor: pointer" alt="">
      </div> -->
    </div>
    <div class="chatSection" ref="chatSection">
      <div class="sidebar">
        <div class="searchBar">
          <input type="text" style="transition: 0.5s" placeholder="Search" class="fListSearch">
          <button class="fListSearchBtn" style="transition: 0.5s">
            <i class="bx bx-search-alt"></i>
          </button>
        </div>
        <div class="friendList" :key="singleF.id" v-for="singleF in fList">
          <div class="sFriend" @click="openChat(singleF.id, singleF.username)">
            <img src class="sFriendImg" alt>
            <p class="sFriendName">{{singleF.username}}</p>
            <br>
            <p class="sFriendText">{{singleF.lastText}}</p>
          </div>
        </div>
      </div>
      <div class="mainSection">
        <p style="position: relative; padding: 40px;font-size: 16px; background: #f1f1f1;border-radius: 10px;font-weight: 600;word-spacing: 10px;width: 60%;margin-left: 20%;margin-top: 30%;"
          v-if="!this.userSelected">Click On A User To get the messages</p>
        <div class="chatHeader" style="display: flex; flex-direction: row;background: #37323E;"
          v-if="!this.chatLoading && this.userSelected">
          <div style="display: flex;flex-direction: column;align-self: center;justify-content: center;  ">
            <p style="font-size: 20px;font-weight: 600;align-self: center;margin-left: 40px;color: white"
              class="chatHeadPersonName">{{ this.currentChatHead.username }}</p>
            <p style="font-size: 12px;font-weight: 250;align-self: center;margin-left: 42px;line-height: 24px;color: white"
              class="chatHeadLastSeen">Last Seen</p>
          </div>
        </div>
        <div class="chatLoader" v-if="this.chatLoading && this.userSelected">
          <svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
            <circle fill="#44AF69" stroke="none" cx="10" cy="50" r="3.5">
              <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite" begin="0.1"></animateTransform>
            </circle>
            <circle fill="#44AF69" stroke="none" cx="22" cy="50" r="3.5">
              <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite" begin="0.2"></animateTransform>
            </circle>
            <circle fill="orange" stroke="none" cx="34" cy="50" r="3.5">
              <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite" begin="0.3"></animateTransform>
            </circle>
          </svg>
          <h2 class="chatLoaderText">Loading ...</h2>
        </div>
        <div class="chatBody" id="chatBody" ref="chatBody" v-if="!this.chatLoading && this.userSelected">
          <div class="msgCont" ref="msgCont" style="display: flex;flex-direction: column;width: 100%;"
            :key="singleChat.msgId" v-for="singleChat in this.chatMsg">
            <div class="selfMsg"
              style="align-self: flex-end;height: auto;color: white;background: rgb(55, 50, 62, 0.7);padding: 5px 40px 0px 40px;margin:15px 30px 15px 30px;border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-left-radius: 20px;max-width: 45%;text-align: left;"
              v-if="singleChat.senderId == yourId">
              <!-- <div v-if="singleChat.text && singleChat.text != '\n'" style="padding: 5px;"> -->
                <singleMsg v-if="singleChat.text && singleChat.text != '\n'" style="padding: 5px;" :message_array="setMsgData(singleChat)" />
              <!-- </div> -->
            </div>
            <img :src="singleChat.img" v-if="singleChat.img != 'null' && singleChat.senderId == yourId" alt>
            <div class="otherMsg"
              style="align-self: flex-start;height: auto;color: #37323E;background: #ddd;padding: 5px 40px 0px 40px;margin:15px 30px 15px 30px;border-top-left-radius: 20px;border-top-right-radius: 20px;border-bottom-right-radius: 20px;max-width: 45%;text-align: left;"
              v-if="singleChat.senderId != yourId">
              <singleMsg v-if="singleChat.text && singleChat.text != '\n'" style="padding: 5px;" :message_array="setMsgData(singleChat)" />
            </div>
            <img v-if="singleChat.img != 'null' && singleChat.senderId != yourId" :src="singleChat.img"
              style="margin-top:15px;" alt>
          </div>
          <!-- <singleMsg :message_array="setMsgData(chatMsg[chatMsg.length-1])" /> -->
        </div>
        <div class="chatInput" v-if="!this.chatLoading && this.userSelected">
          <i @click="openEmojiModal" class="emoji-1f60e "
            style="width: 25px; height: 25px; align-self: center;cursor: pointer; margin-right: 30px;margin-left: 30px;background-size: 25px 25px;"></i>
          <div id="chatInputCont" v-on:keyup.enter.prevent="sendMsg('enter')" ref="chatInputCont" contenteditable="true" style="text-align: left;padding: 12px 40px 12px 40px;font-size: 15px;margin-right: 30px;flex: 8; background: #ddd; color: black;height: auto;align-self: center;border-radius: 1000000px;display: flex; flex-direction: row;"></div>
          <i class="material-icons chatInputIcon" @click="sendMsg('normal')">send</i>
          <i class="material-icons chatInputIcon" @click="openFileModal">attach_file</i>
        </div>
      </div>
    </div>
    <div class="sidebarS">
      <img src="../assets/icons/flash_white.png"
        style="width: 30px; height: 30px;align-self: center;margin: 0px; padding: 0px;margin-top: 5vh;cursor: pointer;"
        alt="">
    </div>
  </div>
</template>

<script>

  import navBar from "./navBar";
  import * as firebase from "firebase";
  import { EventBus } from "../eventbus.js";
  import all_emoji from '../../emoji_json_files/all.json'
  import smiley_emoji from '../../emoji_json_files/smileys.json'
  import objects_emoji from '../../emoji_json_files/objects.json'
  import animals_emoji from '../../emoji_json_files/animals.json'
  import food_emoji from '../../emoji_json_files/food.json'
  import symbols_emoji from '../../emoji_json_files/symbols.json'
  import places_emoji from '../../emoji_json_files/travel.json'
  import activities_emoji from '../../emoji_json_files/activities.json'
  import flags_emoji from '../../emoji_json_files/flags.json'
  import singleMsg from '../components/singleMsg'

  export default {
    name: "messages",
    components: {
      navBar,
      singleMsg
    },
    data() {
      return {
        dialog: false,
        userSelected: false,
        chatInput: "",
        chatLoading: false,
        isHovering: false,
        yourId: firebase.auth().currentUser.uid,
        currentChatHead: {},
        threadId: "",
        temp: [],
        chatHeads: {},
        fList: [],
        currentMsgData: {
          text: '',
          senderId: this.yourId,
          img: 'null',
          emoji_data: []
        },
        chatMsg: [],
        all_emoji: all_emoji,
        smiley_emoji: smiley_emoji,
        animals_emoji: animals_emoji,
        objects_emoji: objects_emoji,
        symbols_emoji: symbols_emoji,
        flags_emoji: flags_emoji,
        places_emoji: places_emoji,
        food_emoji: food_emoji,
        activities_emoji: activities_emoji,
        image_loc: [],
        emoji_active: 'all',
        test: [
          {
            text: 'some data dasuduiasuidaisud uiahsuidh 1',
            senderId: 'asdasdasdasd',
            img: 'null',
            emoji_data: [
              {
                position: 2,
                class: 'emoji-1f60e'
              },
              {
                position: 12,
                class: 'emoji-1f60e'
              }
            ]
          },
          {
            text: 'some data asdasd jiabsid ashda sdasdasd asdiasda sddiasd 2',
            senderId: 'asdasdasdasd',
            img: 'null',
            emoji_data: [
              {
                position: 12,
                class: 'emoji-1f60e'
              },
              {
                position: 25,
                class: 'emoji-1f60e'
              },
            ]
          },
          {
            text: 'some asdsaasdas asd asnda sodna sdoiajsd aosjida saijis dasdopjpos fasjdpiasjdjaspoasdpoajspdasd data3',
            senderId: 'asdasdasdasd',
            img: 'null',
            emoji_data: [
              {
                position: 5,
                class: 'emoji-1f60e'
              },
              {
                position: 12,
                class: 'emoji-1f60e'
              },
            ]
          },
        ]
      };
    },
    mounted: function () {
      this.setData()
      this.listenToEventBus()
      this.setEmojiLoc()
      this.setTestText()
    },
    methods: {
      setTestText() {
        var vm = this
      },
      remInitMsg () {
        this.$refs.initMsg.innerText = ''
      },
      setMsgData(msg_data) {
        var vm = this
        var arr = []
        var prev_pos = 0
        if (Object.keys(msg_data).indexOf("emoji_data") > -1) {
          for (let index = 0; index < msg_data.emoji_data.length; index++) {
            var x = msg_data.emoji_data[index].position
            var text_obj = {
              'value': msg_data.text.substring(prev_pos, x),
              'type': 'text'
            }
            var emoji_obj = {
              'value': msg_data.emoji_data[index].class,
              'type': 'emoji'
            }
            console.log(text_obj)
            console.log(emoji_obj);
            
            arr.push(text_obj)
            arr.push(emoji_obj)
            prev_pos = x
          }
          arr.push({
            'value': msg_data.text.substring(prev_pos, msg_data.text.length),
            'type': 'text'
          })
          // this.message_array = arr
          console.log(arr)
          return arr
        } else {
          // this.message_array = msg_data.text
          console.log('no emoji')
          return msg_data.text
        }
      },
      openFileModal() {
        this.$refs.fileModal.style.display = "block";
        this.$refs.chatSection.style.opacity = "0.5";
      },
      listenToEventBus() {
        var vm = this;
        EventBus.$on("recv_msg", r => {
          console.log(r.emoji_data)
          console.log(typeof(r.emoji_data[1]))
          vm.chatMsg.push(r);
        });
      },
      setData() {
        var vm = this;
        this.$http.get("http://localhost:8080/api/user").then(usersResp => {
          var temp2 = usersResp.body;
          vm.fList = temp2;
        });
      },
      setEmojiLoc() {
        var vm = this
        for (let index = 0; index < this.all_emoji.length; index++) {
          vm.image_loc.push({ image: vm.all_emoji[index].image })
        }
      },
      getImageUrl(a) {
        var images = require.context('../assets/emoji', false, /\.png$/)
        return images('./' + a)
      },
      openChat(e, username) {
        var vm = this;
        vm.currentChatHead.username = username
        vm.chatLoading = true;
        vm.userSelected = true;
        var a = this.yourId;
        var x = a > e ? a + e : e + a;
        vm.threadId = x;
        console.log(vm.threadId)
        this.$http
          .get("http://localhost:8080/api/chat/" + x)
          .then(Response => {
            vm.chatMsg = Response.body;
            vm.chatLoading = false;
            EventBus.$emit("getUserChatDetails", x);
          });
        var el = document.querySelectorAll(".msgCont");
        if (el.length > 0) {
          el[el.length - 1].scrollIntoView(false);
        }
        setTimeout(() => {
          var el = document.querySelectorAll(".msgCont");
          if (el.length > 0) {
            el[el.length - 1].scrollIntoView(false);
          }
        }, 100);
      },
      closeFileModal() {
        this.$refs.fileModal.style.display = "none";
        this.$refs.chatSection.style.opacity = "1";
      },
      openEmojiModal() {
        this.$refs.emogiModal.style.display = "block";
        this.$refs.chatSection.style.opacity = "0.2";
      },
      closeEmojiModal() {
        this.$refs.emogiModal.style.display = "none";
        this.$refs.chatSection.style.opacity = "1";
      },
      sendMsg(e) {
        if (e == 'enter') {
          this.$refs.chatInputCont.lastChild.remove()
          var text2Send = this.$refs.chatInputCont.textContent
          this.currentMsgData.text = text2Send
          var temp = this.currentMsgData
          EventBus.$emit("sendMessage", [this.currentMsgData.text, this.threadId, this.yourId, this.currentMsgData.emoji_data])
          this.currentMsgData = {
            text: '',
            senderId: this.yourId,
            img: 'null',
            emoji_data: []
          }
          setTimeout(() => {
            var el = document.querySelectorAll(".selfMsg");
            if (el.length > 0) {
              el[el.length - 1].scrollIntoView(false);
            }
          }, 100);
        } else {
          var text2Send = this.$refs.chatInputCont.textContent
          this.currentMsgData.text = text2Send
          EventBus.$emit("sendMessage", [this.currentMsgData.text, this.threadId, this.yourId, this.currentMsgData.emoji_data])
          this.currentMsgData = {
            text: '',
            senderId: this.yourId,
            img: 'null',
            emoji_data: []
          }
          setTimeout(() => {
            var el = document.querySelectorAll(".selfMsg");
            if (el.length > 0) {
              el[el.length - 1].scrollIntoView(false);
            }
          }, 100);
        }
      },
      changeEmojiDisp(a) {
        this.emoji_active = a
      },
      addEmoji(e) {
        var l = e
        var x = `<img src="${process.env.BASE_URL}emoji/${e}.png" style="width: 20px; height: 20px;margin-left: 7px; margin-right: 7px;" />`
        var y = `&nbsp;`
        this.$refs.chatInputCont.innerHTML = this.$refs.chatInputCont.innerHTML + x
        this.$refs.chatInputCont.innerHTML = this.$refs.chatInputCont.innerHTML + y
        this.closeEmojiModal()
        var vm = this
        var len2Push = 0
        if (this.$refs.chatInputCont.textContent.length == 0) {
          len2Push = this.$refs.chatInputCont.textContent.length
        } else {
          len2Push = this.$refs.chatInputCont.textContent.length - 1
        }
        this.currentMsgData.emoji_data.push({
          position: len2Push,
          class: l
        })
      }
    }
  };
</script>

<style scoped>
  @import '../assets/main.css';

  .msgPageBody {
    word-wrap: break-word;
  }

  .inPEmoji {
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
    margin-left: 10px;
  }
  div[data-placeholder]:not(:focus):not([data-div-placeholder-content]):before {
    content: attr(data-placeholder);
    float: left;
    margin-left: 2px;
    color: #b3b3b3;
  }

  .chatSection {
    position: absolute;
    top: 0px;
    width: 100vw;
    height: 100vh;
    left: 0px;
    background: #f1f1f1;
    transition: 0.5s;
  }

  .sidebar {
    position: fixed;
    width: 25vw;
    background: #ddd;
    height: 100vh;
    overflow: auto;
    margin-left: 5vw;
    /* border-right: 1px solid grey; */
  }

  .mainSection {
    position: fixed;
    overflow: hidden;
    width: 70vw;
    height: 100vh;
    right: 0vw;
    top: 0px;
    background: #f1f1f1;
  }
  [contenteditable]:focus {
    outline: 0px solid transparent;
  }
  .chatHeader {
    position: relative;
    height: 9vh;
    width: 100%;
    z-index: 99;
    -webkit-animation: shadow-drop-bottom 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both !important;
    animation: shadow-drop-bottom 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both !important;
  }

  .chatBody {
    position: relative;
    height: 82vh;
    background: #f1f1f1;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    z-index: 9;
  }

  .chatInput {
    position: fixed;
    height: 8vh;
    bottom: 0px;
    right: 0px;
    background: #f1f1f1;
    width: 70vw;
    z-index: 9;
    display: flex;
    box-shadow: 0 -12px 20px -12px rgba(0, 0, 0, 0.15)
  }

  hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.75),
        rgba(0, 0, 0, 0));
  }

  .chatInputIcon {
    align-self: center;
    color: #37323E;
    cursor: pointer;
    margin-right: 30px;
  }

  .chatInputText {
    all: unset;
    height: 5.5vh;
    background: #ddd;
    flex: 8;
    align-self: center;
    border-radius: 100px;
    text-align: center;
    font-size: 14px;
  }

  .chatBody {
    padding: 30px 10px 30px 10px;
  }

  /* loadr */

  svg {
    width: 200px;
    height: 200px;
    margin: 20px;
    display: inline-block;
  }

  .chatLoader {
    position: absolute;
    top: calc(40% - 100px);
    right: calc(50% - 200px);
  }

  .chatLoaderText {
    transform: translateY(-6vh);
    color: #44af69;
    text-align: left;
    margin-left: 30px;
  }

  /*  File Upload Modal  */

  .dropDownModal {
    display: none;
    position: absolute;
    width: 60vw;
    height: 70vh;
    right: 22.5vw;
    top: 15vh;
    background: #37323E;
    z-index: 20;
    border-radius: 10px;
    -webkit-animation: modalBoxEntrance 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: modalBoxEntrance 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .modalCloseBtn {
    position: absolute;
    top: 4vh;
    right: 2vw;
    cursor: pointer;
    color: white;
  }

  .searchBar {
    width: 90%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 50px;
    margin-left: 5%;
  }

  .fListSearch {
    all: unset;
    background: #eee;
    color: #2c2c2c;
    flex: 4;
    height: 40px;
    margin-left: 30px;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    text-align: center;
  }

  .fListSearchBtn {
    all: unset;
    text-align: center;
    cursor: pointer;
    flex: 1;
    margin-right: 30px;
    background: #37323E;
    color: white;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
  }

  .fListSearchBtn i {
    transform: translateY(2px) scale(1.3, 1.3);
  }

  .sFriend {
    width: 90%;
    margin: 10px 5% 10px 5%;
    border-radius: 10px;
    display: grid;
    height: 7vh;
    padding: 0px;
    padding-left: 5%;
    cursor: pointer;
    padding-right: 5%;
    grid-template-areas:
      "left main main main main main main main main"
      "left footer footer footer footer footer footer footer footer";
  }

  .sFriendImg {
    grid-area: left;
    background: grey;
    height: 40px;
    margin-top: 1vh;
    border-radius: 50%;
    width: 40px;
  }

  .sFriendName {
    grid-area: main;
    margin: 0px;
    padding-left: 10px;
    text-align: left;
    font-size: 14px;
    padding-top: 1vh;
  }

  .sFriendText {
    grid-area: footer;
    padding-left: 10px;
    text-align: left;
    font-size: 10px;
    padding-top: 10px;
  }

  .sidebarS {
    position: fixed;
    width: 5vw;
    height: 100vw;
    top: 0px;
    left: 0px;
    background: #37323E;
    display: flex;
    flex-direction: column;
  }

  /*    Bounce In Animation     */

  @-webkit-keyframes modalBoxEntrance {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes modalBoxEntrance {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }

    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }

  @-webkit-keyframes shadow-drop-bottom {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }

    100% {
      box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.15);
    }
  }

  @keyframes shadow-drop-bottom {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }

    100% {
      box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.15);
    }
  }


  /* Media Queries */
  /* 
@media screen and (max-width: 1080px) {
    .sidebarS {
        display: none;
    }
    .mainSection{
        right: 0vw;
        width: 70vw;
    }

    .sidebar
     {
         width: 30vw;
     }
    .selfMsg {
        max-width: 33vw;
        transform: translateX(35vw);
    }
    .otherMsg {
        max-width: 33vw;
    }
}

@media screen and (max-width: 940px) {
    .sidebarS {
        display: none;
    }
    .mainSection{
        right: 0vw;
        width: 70vw;
    }

    .sidebar
     {
         width: 30vw;
     }
    .selfMsg {
        max-width: 33vw;
        transform: translateX(35vw);
    }
    .otherMsg {
        max-width: 33vw;
    }
}

@media screen and (max-width: 790px) {
    .sidebarS {
        display: none;
    }
    .mainSection{
        right: 0vw;
        width: 70vw;
    }

    .sidebar
     {
         width: 30vw;
     }
    .selfMsg {
        max-width: 33vw;
        transform: translateX(35vw);
    }
    .otherMsg {
        max-width: 33vw;
    }
}

@media screen and (max-width: 640px) {
    .sidebarS {
        display: none;
    }
    .mainSection{
        right: 0vw;
        width: 70vw;
    }

    .sidebar
     {
         width: 30vw;
     }
    .selfMsg {
        max-width: 33vw;
        transform: translateX(35vw);
    }
    .otherMsg {
        max-width: 33vw;
    }
}

@media screen and (max-width: 560px) {
    .sidebarS {
        display: none;
    }
    .mainSection{
        right: 0vw;
        width: 70vw;
    }

    .sidebar
     {
         width: 30vw;
     }
    .selfMsg {
        max-width: 33vw;
        transform: translateX(35vw);
    }
    .otherMsg {
        max-width: 33vw;
    }
}

@media screen and (max-width: 460px) {
    .sidebarS {
        display: none;
    }
    .mainSection{
        right: 0vw;
        width: 70vw;
    }

    .sidebar
     {
         width: 30vw;
     }
    .selfMsg {
        max-width: 33vw;
        transform: translateX(35vw);
    }
    .otherMsg {
        max-width: 33vw;
    }
} */
</style>