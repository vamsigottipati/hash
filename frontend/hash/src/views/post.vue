<template>
  <div class="userPost" v-click-outside="outside" ref="postBody" style="text-align:center;">
    <div class="postHeader">
      <img class="userPostImg" src alt>
      <p>Create A post</p>
      <i
        class="material-icons closeIcon"
        @click="outside"
        ref="closeIcon"
        style="float: right;transform: translateY(10px);margin-right: 20px;"
      >clear</i>
    </div>
    <div class="postBody">
      <textarea
        name="post"
        v-model="postBody"
        ref="post"
        @click="showForumSelection"
        placeholder="Write Your Post Here"
        class="userPostInput"
      ></textarea>
    </div>
    <div class="forumSelection" ref="showForumSelection">
      <h3 style="color: white;margin: 50px;">Select Sub Forum Name</h3>
      <div style="width: 100%;height: 100px;margin-left: 0%;margin-right: 0%;display: flex;">
        <div class style="flex: 1;display: flex;flex-direction: column;">
          <div
            style="margin-left: 50px;margin-bottom: 15px;text-align: left;"
            :key="`${index}`"
            v-for="(singleForumName, index) in this.forumListPrimary"
          >
            <!-- <div style="display: flex;justify-content: flex-start;"  @click="changeSubForm(singleForumName.forumName)">
              <img style="width: 20px; height: 20px;" :src="singleForumName.forumImg" alt="">
              <p style="color: #eee;margin-left: 30px;"> {{ singleForumName.forumName }} </p>
            </div>-->
            <label class="inputCont" @click="changeSubForm(singleForumName.forumName)">
              <div style="display: flex;">
                <!-- <img style="width: 15px; height: 15px;margin-left: 30px;" :src="singleForumName.forumImg" alt=""> -->
                <p style="margin-left: 40px;">{{ singleForumName.forumName }}</p>
              </div>
              <input type="radio" name="forumSelection">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
        <div class style="flex: 1;display: flex; flex-direction: column">
          <div
            style="margin-left: 30px;margin-bottom: 15px;text-align: left;"
            :key="`${index}`"
            v-for="(singleForumName, index) in this.forumListSecondary"
          >
            <!-- <div style="display: flex;justify-content: flex-start;"  @click="changeSubForm(singleForumName.forumName)">
              <img style="width: 20px; height: 20px;" :src="singleForumName.forumImg" alt="">
              <p style="color: #eee;margin-left: 30px;"> {{ singleForumName.forumName }} </p>
            </div>-->
            <label class="inputCont" @click="changeSubForm(singleForumName.forumName)">
              <div style="display: flex;">
                <!-- <img style="width: 15px; height: 15px;margin-left: 30px;" :src="singleForumName.forumImg" alt=""> -->
                <p style="margin-left: 40px;">{{ singleForumName.forumName }}</p>
              </div>
              <input type="radio" name="forumSelection">
              <span class="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="tags" ref="tagsCont" style="display: flex;">
      <div style="flex: 6"></div>
      <button class="tagBtn" style="flex:4 ;">
        <i class="bx bx-code tagIcons" style></i>
      </button>
      <div style="flex: 2"></div>
      <button class="tagBtn" style="flex:4 ;">
        <i class="bx bx-image-alt tagIcons"></i>
      </button>
      <div style="flex: 2"></div>
      <button class="tagBtn" style="flex:4 ;">
        <i class="bx bx-video tagIcons"></i>
      </button>
      <div style="flex: 2"></div>
      <button class="tagBtn" style="flex:4 ;">
        <i class="bx bx-file-blank tagIcons"></i>
      </button>
      <div style="flex: 6"></div>
    </div>-->
    <button ref="postSubmitBtn" @click="submitPost" class="postSubmitBtn">Post</button>
  </div>
</template>

<style scoped>
.userPost {
  width: 90%;
  margin-left: 5%;
  margin-top: 5vh;
  margin-bottom: 5vh;
  height: auto;
  background: #37323e;
  border-radius: 5px;
  transition: 0.2s;
}

.postHeader {
  display: flex;
  align-content: center;
  color: white;
  text-align: left;
  border-radius: 5px;
  z-index: 9;
}
.postHeader p {
  font-size: 15px;
  padding: 15px;
  flex: 10;
  align-self: center;
}
.postHeader img {
  flex: 1;
}
.postBody {
  height: auto;
  width: 100%;
  background: #eeeff7;
  border: 0.5px solid #aaaaaa;
  z-index: 1;
  display: flex;
}
.userPostImg {
  height: auto;
  background: #eee;
  -webkit-clip-path: circle(25% at 50% 50%);
  clip-path: circle(25% at 50% 50%);
}
.userPostInput {
  background: whitesmoke;
  color: rgb(56, 56, 56);
  text-align: center;
  line-height: 20px;
  margin: auto 0;
  padding: 30px;
  padding-top: 5vh;
  flex: 9;
  height: 15vh;
  text-decoration: none;
  resize: none;
}

input:focus,
textarea:focus {
  outline: 0;
}

.inputCont {
  display: block;
  position: relative;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #eeeff7;
}

.forumSelection {
  display: none;
  margin-bottom: 40px;
}

/* Hide the browser's default radio button */
.inputCont input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  /* border-radius: 50%; */
}

.inputCont:hover input ~ .checkmark {
  background-color: #ccc;
}

.inputCont input:checked ~ .checkmark {
  background-color: #eee;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.inputCont input:checked ~ .checkmark:after {
  display: block;
}

.inputCont .checkmark:after {
  top: 5px;
  left: 5px;
  width: 10px;
  height: 10px;
  /* border-radius: 50%; */
  background: #37323e;
}

.tagBtn {
  all: unset;
  text-align: center;
  background: #eeeeee;
  padding: 12px;
  border-radius: 1000px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 12px;
  cursor: pointer;
  margin-bottom: 20px;
}
.tagBtn:hover {
  transform: translateY(-1px) scale(1.1, 1.1);
  transition: 0.1s;
  cursor: pointer;
}

.tags {
  text-align: center;
}

.tagIcons {
  text-align: center;
  margin-right: 20px;
  transform: scale(1.5, 1.5) translateY(0.5px);
  color: darkOrange;
  font-weight: 900;
  padding-left: 14px;
}

.postSubmitBtn {
  all: unset;
  color: #37323e;
  background: #eee;
  border-radius: 5px;
  width: 30%;
  margin-top: 100px;
  margin-left: 35%;
  transform: translateY(-30px);
  padding-top: 15px;
  padding-bottom: 15px;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  font-family: Montserrat;
  display: none;
}

.closeIcon {
  color: #eeeff7;
  display: none;
  cursor: pointer;
}
@media screen and (max-width: 420px) {
  .userPostImg {
    padding-left: 5vw;
  }
  .postHeader p {
    padding-left: 10px;
  }
  .userPost {
    width: 100%;
    margin-left: 0%;
  }
}

@media screen and (max-width: 498px) {
  .userPost {
    width: 100%;
    margin-left: 0%;
    border-radius: 0px;
  }
}
</style>

<script>
import * as firebase from "firebase";
import { EventBus } from "../eventbus.js";

export default {
  name: "post",
  data() {
    return {
      textClickCounter: 0,
      postBody: "",
      subForumName: "",
      forumList: [
        {
          forumName: "Tech",
          forumImg:
            "https://firebasestorage.googleapis.com/v0/b/sip-bphc.appspot.com/o/forumImg%2Fdatabase-3.svg?alt=media&token=c47185eb-d11e-4b14-9011-20388cd3798f",
          forumId: "asdasd"
        },
        {
          forumName: "Non Tech",
          forumImg:
            "https://firebasestorage.googleapis.com/v0/b/sip-bphc.appspot.com/o/forumImg%2Fovertime.svg?alt=media&token=af7e1671-6bfe-4dd5-b6bd-e9ace6300a62",
          forumId: "asdaasdasdsd"
        },
        {
          forumName: "Higher Studies",
          forumImg:
            "https://firebasestorage.googleapis.com/v0/b/sip-bphc.appspot.com/o/forumImg%2Flearning.svg?alt=media&token=32ce3c6d-ad45-4d20-91e5-50341992b061",
          forumId: "asdghfdasd"
        },
        {
          forumName: "Campus Whizz",
          forumImg:
            "https://firebasestorage.googleapis.com/v0/b/sip-bphc.appspot.com/o/forumImg%2Frol-game.svg?alt=media&token=587dffc3-69fb-48f8-8f0e-fd384025426c",
          forumId: "asdasuytred"
        },
        {
          forumName: "Health",
          forumImg:
            "https://firebasestorage.googleapis.com/v0/b/sip-bphc.appspot.com/o/forumImg%2Fdoctor-bag.svg?alt=media&token=54c4aba5-80a9-428c-a459-cda119ec73e9",
          forumId: "asdfbuhsdgkjscdiyg"
        }
      ],
      forumListPrimary: [],
      forumListSecondary: []
    };
  },
  mounted: function() {
    this.initTextAutoSetHeight();
    this.forumListPrimary = this.splitArray({
      alternate: true,
      array: this.forumList
    })[0];
    this.forumListSecondary = this.splitArray({
      alternate: true,
      array: this.forumList
    })[1];

    console.log(this.forumListPrimary);
    console.log(this.forumListSecondary);
  },
  methods: {
    // emit event bus to listen if the modal is open or not to change the background opacity
    changeSubForm(e) {
      this.subForumName = e;
      console.log(this.subForumName);
    },
    submitPost() {
      var vm = this;
      if (this.postBody && this.subForumName) {
        EventBus.$emit("createPost", {
          postedBy: firebase.auth().currentUser.displayName,
          subForum: vm.subForumName,
          bodyText: vm.postBody
        });
        vm.postBody = "";
        vm.outside();
      } else {
        alert("Write Something and Select A sub forum tou want to post in.");
      }
    },
    showForumSelection() {
      ++this.textClickCounter;
      // this.$refs.postBody.style.background = 'rgb(56, 56, 56)'
      if (this.textClickCounter % 2 == 0) {
        /* this.$refs.showForumSelection.style.display = 'none'
                this.$refs.postSubmitBtn.style.display = 'none'
                this.$refs.postBody.style.width = '80%'
                this.$refs.postBody.style.marginLeft = '10%' */
        if (window.innerWidth <= "498") {
          this.$refs.postBody.style.width = "100%";
          this.$refs.postBody.style.marginLeft = "0%";
        } else {
          this.$refs.postBody.style.width = "90%";
          this.$refs.postBody.style.marginLeft = "5%";
        }
        this.$refs.showForumSelection.style.display = "block";
        this.$refs.postSubmitBtn.style.display = "block";
        this.$refs.closeIcon.style.display = "block";
      } else {
        this.$refs.showForumSelection.style.display = "block";
        this.$refs.postSubmitBtn.style.display = "block";
        if (window.innerWidth <= "498") {
          this.$refs.postBody.style.width = "100%";
          this.$refs.postBody.style.marginLeft = "0%";
        } else {
          this.$refs.postBody.style.width = "90%";
          this.$refs.postBody.style.marginLeft = "5%";
        }
        this.$refs.closeIcon.style.display = "block";
      }
    },
    outside() {
      // this.$refs.postBody.style.background = 'rgb(56, 56, 56, 0.75)'
      this.$refs.showForumSelection.style.display = "none";
      this.$refs.postSubmitBtn.style.display = "none";
      this.textClickCounter = 0;
      if (window.innerWidth <= "498") {
        this.$refs.postBody.style.width = "100%";
        this.$refs.postBody.style.marginLeft = "0%";
      } else {
        this.$refs.postBody.style.width = "90%";
        this.$refs.postBody.style.marginLeft = "5%";
      }
      this.$refs.closeIcon.style.display = "none";
    },
    observe(el, event, handler) {
      if (window.attachEvent) {
        el.attachEvent("on" + event, handler);
      } else {
        el.addEventListener(event, handler, false);
      }
    },
    initTextAutoSetHeight() {
      var text = this.$refs.post;
      function resize() {
        text.style.height = "auto";
        text.style.height = text.scrollHeight + "px";
      }
      /* 0-timeout to get the already changed text */
      function delayedResize() {
        window.setTimeout(resize, 0);
      }
      this.observe(text, "change", resize);
      this.observe(text, "cut", delayedResize);
      this.observe(text, "paste", delayedResize);
      this.observe(text, "drop", delayedResize);
      this.observe(text, "keydown", delayedResize);

      text.focus();
      text.select();
      resize();
    },
    splitArray({ alternate, array }) {
      const halfIndex = Math.ceil(array.length / 2) - 1;
      let firstArray = true;
      return array.reduce(
        (res, item, index) => {
          if (firstArray) {
            res[0].push(item);
            if (alternate || index >= halfIndex) {
              firstArray = false;
            }
          } else {
            res[1].push(item);
            if (alternate) {
              firstArray = true;
            }
          }
          return res;
        },
        [[], []]
      );
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          const compName = vNode.context.name;
          let warn = `[Vue-click-outside:] provided expression '${
            binding.expression
          }' is not a function, but has to be`;
          if (compName) {
            warn += `Found in component '${compName}'`;
          }

          console.warn(warn);
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;

        // add Event Listeners
        document.addEventListener("click", handler);
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>
