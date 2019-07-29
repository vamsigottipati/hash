<template>
  <div ref="el" style="transition: 1s;" class="pageBody">
    <div class="loader"></div>
    <navBar/>
    <div ref="delModal" class="deleteModal">
      <i class="far fa-times-circle" @click="this.closeDelModal"></i>
      <div style="flex:2"></div>
      <p>Do You Want To delete The Post</p>
      <div class="btnCont">
        <div style="flex:2"></div>
        <button @click="this.closeDelModal" class="btn-agree">No</button>
        <div style="flex:1"></div>
        <button class="btn-cancel">Yes</button>
        <div @click="this.deletePost" style="flex:2"></div>
      </div>
    </div>
    <div ref="lSideBar" class="lSidebar"></div>
    <div ref="rSideBar" class="rSidebar"></div>
    <div ref="mainCont" class="mainCont">
      <div class="postBodyCont">
        <div class="fCard ">
          <div class="fCardHeader">
            <p class="fCardHeaderTitle">
              By
              <strong style="margin-left: 15px;">{{this.post.postedBy}}</strong>
            </p>
            <p class="fCardHeaderSub">{{this.post.subForum}}</p>
            <i
              @click="this.deletePostModal"
              class="far fa-trash-alt"
              style="margin: 30px;font-size: 15px;cursor: pointer;transform: translateY(-3px);color: red;"
            ></i>
          </div>
          <hr class="fCardHr">
          <div class="fCardBody">
            <pre class="fCardBodyText" ref="fCardBodyText"> {{this.post.bodyText}} </pre>
          </div>
          <hr class="fCardHr">
          <div class="fCardFooter">
            <div class="miniSpacer" style="flex: 1;"></div>
            <div class="fCardFooterUpvotes" style="flex: 3;">
              <i
                class="far fa-thumbs-up uDIcon"
                style="float: left;margin-left: 30px;font-size: 20px;transform: translateY(calc(50% - 5px));cursor: pointer;"
                @click="upVoteInc()"
                v-bind:class="[{ 'fas': this.post.uVoted }, 'far']"
              ></i>
              <p style="float: left;margin-left: 18px;color: #37323E;transform: translateY(50%);">
                {{this.post.upVotes}}
                <small>upvotes</small>
              </p>
            </div>
            <div class="fCardFooterDownvotes" style="flex: 3;">
              <i
                class="far fa-thumbs-down uDIcon"
                style="float: left;margin-left: 30px;font-size: 20px;transform: translateY(calc(50% - 5px));cursor: pointer;"
                v-bind:class="[{ 'fas': this.post.dVoted }, 'far']"
                @click="downVoteInc()"
              ></i>
              <p style="float: left;margin-left: 18px;color: #37323E;transform: translateY(50%);">
                {{this.post.downVotes}}
                <small>downvotes</small>
              </p>
            </div>
            <div class="fCardCommentHeader" v-scroll-to="'#commentInputCont'" style="flex: 3;">
              <i
                class="far fa-comment"
                style="float: left;margin-left: 30px;font-size: 20px;transform: translateY(calc(50% - 5px));cursor: pointer;color: #37323E;"
              ></i>
              <p style="float: left;margin-left: 18px;color: #37323E;transform: translateY(50%);">
                {{ this.comments.length }}
                <small>Comments</small>
              </p>
            </div>
            <div class="miniSpacer" style="flex: 1;"></div>
            <!-- <div class="fCardFooterComment" style="flex: 1;">

            </div>-->
          </div>
          <!-- <hr class="fCardHr"> -->
        </div>
      </div>
      <div class="bottomSection ">
        <div class="commentCont" :key="`${index}`" v-for="(singleComment, index) in this.comments">
          <div class="commentSelfCont" v-if="singleComment.senderId === yourId">
            <div class="commentPImg"></div>
            <div class="commentSelf">
              <p class="senderName">{{singleComment.sender}}</p>
              <p class="mainComment">{{singleComment.comment}}</p>
            </div>
          </div>
          <br>
          <div class="commentOtherCont" v-if="singleComment.senderId != yourId">
            <div class="commentPImg"></div>
            <div class="commentOther">
              <p class="senderName">{{singleComment.sender}}</p>
              <p class="mainComment">{{singleComment.comment}}</p>
            </div>
          </div>
          <br>
        </div>
        <div class="commentInputCont" id="commentInputCont" ref="commentInput">
          <textarea
            name="selfComment"
            ref="selfComment"
            placeholder="Enter Your Comment"
            style="resize: none; flex: 5; margin-right: 20px;border-radius: 5px;"
            v-model="selfComment"
            id="commentInput"
          ></textarea>
          <button @click="this.submitComment" class="btn btn-submit">Comment</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "./navBar";
import { scroller } from "vue-scrollto/src/scrollTo";
import * as firebase from "firebase";
import { EventBus } from "../eventbus.js";

export default {
  components: {
    navBar
  },
  name: "SinglePost",
  data() {
    return {
      postId: this.$route.params.id,
      curPost: [],
      yourId: "vamsi",
      selfComment: "",
      check: "",
      post: {},
      comments: [
        // {
        //     comment: 'Some Test Comment 1',
        //     commentId: 'asfadf',
        //     sender: 'Asdf',
        //     senderId: 'asdasdasdasdasd',
        //     reply: 0,
        //     replyId: 'awdasdq'
        // },
        // {
        //     comment: 'Some Test Comment 2',
        //     commentId: 'askjhgfcdxfadf',
        //     sender: 'Asdfas',
        //     senderId: 'asdasdasdasdasd'
        // },
        // {
        //     comment: 'Some Test  asdffaskjhfgijhsbdvijkh iuoadfh iouashdfgoau oiuashdfgoaiu ioausdg iusdg aisjdfhg  Comment 3',
        //     commentId: 'asasdaasfadf',
        //     sender: 'Asnda',
        //     senderId: 'asdasdasdasdasd'
        // },
        // {
        //     comment: 'Some Test Comment 4',
        //     commentId: 'asfakjhgftyujgfrtyuidf',
        //     sender: 'Asdfa',
        //     senderId: 'asdasdasdasdasd'
        // },
        // {
        //     comment: 'Some Test Comment 5',
        //     commentId: 'asfamkoytfvbnkdf',
        //     sender: 'vamsi',
        //     senderId: 'vamsi'
        // },
        // {
        //     comment: 'Some Test Comment 6',
        //     commentId: 'asfamko',
        //     sender: 'vamsi',
        //     senderId: 'vamsi'
        // },
        // {
        //     comment: 'Some Test Comment 7',
        //     commentId: 'mbgyujnbgrsdtyhgft',
        //     sender: 'jhyujbvg',
        //     senderId: 'nhyujgyu'
        // },
        // {
        //     comment: 'Some Test Comment 8',
        //     commentId: 'liuytdser56yujbvf',
        //     sender: 'jhfde456',
        //     senderId: 'hgt67ujksidtr678iwkejhqy'
        // },
      ]
    };
  },
  mounted: function() {
    this.getData();
    this.initTextAutoSetHeight();
    this.listenEventBus();
  },
  methods: {
    getData() {
      var vm = this;
      this.$http
        .get("http://localhost:8080/api/forms/" + vm.postId + "/")
        .then(resp => {
          console.log(resp.body);
          vm.post = resp.body[0];
        })
        .catch(err => {
          console.error(err);
        });
    },
    listenEventBus() {
      EventBus.$on("newComment", comment_resp => {
        this.comments.push(comment_resp);
      });
    },
    upVoteInc() {
      if (this.post.uVoted) {
        this.post.upVotes = this.post.upVotes - 1;
        this.post.uVoted = !this.post.uVoted;
      } else {
        this.post.upVotes = this.post.upVotes + 1;
        this.post.uVoted = !this.post.uVoted;
      }
    },
    downVoteInc() {
      if (this.post.dVoted) {
        this.post.downVotes = this.post.downVotes - 1;
        this.post.dVoted = !this.post.dVoted;
      } else {
        this.post.downVotes = this.post.downVotes + 1;
        this.post.dVoted = !this.post.dVoted;
      }
    },
    observe(el, event, handler) {
      if (window.attachEvent) {
        el.attachEvent("on" + event, handler);
      } else {
        el.addEventListener(event, handler, false);
      }
    },
    initTextAutoSetHeight() {
      var text = this.$refs.selfComment;
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
    submitComment() {
      var vm = this;
      if (this.selfComment) {
        EventBus.$emit("comment", {
          comment: this.selfComment,
          sender: "vamsi",
          id: vm.postId,
          senderId: firebase.auth().currentUser.uid
        });
        this.selfComment = "";
      } else {
        alert("Please Enter Some Comment");
      }
    },
    deletePostModal() {
      this.$refs.lSideBar.style.opacity = "0.2";
      this.$refs.rSideBar.style.opacity = "0.2";
      this.$refs.mainCont.style.opacity = "0.2";
      this.$refs.delModal.style.opacity = "1";
      this.$refs.delModal.style.zIndex = "999";
    },
    deletePost() {
      this.$http
        .delete("http://localhost:8080/api/forms/" + this.postId + "/")
        .then(resp => {
          console.log(resp);
          window.location.pathname = "/";
        });
    },
    closeDelModal() {
      this.$refs.lSideBar.style.opacity = "1";
      this.$refs.rSideBar.style.opacity = "1";
      this.$refs.mainCont.style.opacity = "1";
      this.$refs.delModal.style.opacity = "0";
      this.$refs.delModal.style.zIndex = "0";
    }
  }
};
</script>

<style scoped>
textarea:focus {
  outline: none;
}
input:focus {
  outline: none;
}
/*   Single Post Styles    */

.fCard {
  width: 90%;
  margin-left: 5%;
  margin-top: 50px;
  min-height: 20vh;
  background: whitesmoke;
  border-radius: 5px;
  text-align: left;
  z-index: 9;
}

.fCardHeader {
  background: transparent;
  height: 6vh;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fCardHeader p {
  flex: 1;
  font-size: 15px;
  padding-left: 30px;
  max-width: 50%;
  transform: translateY(5px);
}
.fCardHeaderSub {
  text-align: right;
  padding-right: 30px;
}

.fCardBody {
  width: calc(100% - 20px);
  margin: 10px;
}

.fCardFooter {
  background: transparent;
  height: 6vh;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fCardBodyText {
  padding: 30px;
  margin: 10px;
  text-align: left;
  width: 100%;
  height: auto;
  font-family: "Ubuntu";
}
.uDIcon {
  color: #37323E;
}
.fCardHr {
  border: 0;
  border-bottom: 1px dashed #ccc;
  background: #999;
  width: 85%;
  opacity: 0.7;
}
.fCardHr:nth-of-type(1) {
  margin: 0px 7.5% 30px 7.5%;
}
.fCardHr:nth-of-type(2) {
  margin: 30px 7.5% 0px 7.5%;
}
.fCardHr:nth-of-type(3) {
  margin: 1px 7.5% 30px 7.5%;
  width: 85% !important;
}
.fullPostViewLink {
  margin-left: 45px;
  font-size: 15px;
  color: #00052e;
  cursor: pointer;
  text-align: left;
  width: auto;
  max-width: 30%;
}

/*   Post Cont Styles    */
.mainCont {
  position: absolute;
  left: 15vw;
  top: 8vh;
  width: 70vw;
  min-height: 92%;
  margin-bottom: 30px;
  overflow: auto;
}
/*  Sidebar Styles   */

.lSidebar {
  position: fixed;
  background: #37323E;
  top: 8%;
  left: 0px;
  width: 15vw;
  height: 92%;
  z-index: 8;
  transition: 250ms linear;
  text-align: center;
}
.rSidebar {
  position: fixed;
  background: #37323E;
  top: 8%;
  right: 0px;
  width: 15vw;
  height: 92%;
  z-index: 8;
  transition: 250ms linear;
  text-align: center;
}

/*   Comments Styles    */
.bottomSection {
  width: 100%;
  height: auto;
  margin-bottom: 60px;
  margin-top: 60px;
}
.commentInputCont {
  height: auto;
  width: 90%;
  margin-left: 5%;
  margin-top: 100px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-end;
}
#commentInput {
  margin-left: 0px;
  overflow: hidden;
  font-size: 14px;
  background: #ddd;
  padding: 40px;
}
.commentInputCont button {
  flex: 1;
  margin-left: 0px;
  height: 50px;
  background: #37323E;
  color: white;
  border-radius: 5px;
  align-items: flex-end;
}
.commentCont {
  width: 90%;
  margin-left: 5%;
}
.commentSelfCont {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}
.commentSelf {
  max-width: 70%;
  width: auto;
  /* background: rgb(221, 221, 221); */
  margin-left: 30px;
  word-wrap: break-word;
  /* padding: 20px; */
  border-radius: 5px;
}
.commentOtherCont {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
}
.commentOther {
  max-width: 70%;
  width: auto;
  /* background: rgb(221, 221, 221); */
  margin-left: 30px;
  word-wrap: break-word;
  /* padding: 20px; */
  border-radius: 5px;
}
.commentPImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #aaa;
}
.senderName {
  text-align: left;
  font-size: 14px;
  font-weight: 600;
}
.mainComment {
  text-align: left;
  font-size: 12px;
  font-weight: 200;
}
.deleteModal {
  position: absolute;
  width: 30vw;
  height: 30vh;
  top: 25vh;
  left: 35vw;
  background: #f1f1f1;
  z-index: 0;
  transition: 150ms;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  opacity: 0;
}
.deleteModal i {
  position: absolute;
  right: 30px;
  top: 30px;
  color: #00052e;
  cursor: pointer;
  font-size: 20px;
}
.deleteModal i:hover {
  color: #00052e;
}
.deleteModal p {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
}
.deleteModal div {
  flex: 2;
  display: flex;
  flex-direction: row;
}
.deleteModal div button {
  flex: 1;
  height: 45px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid #00052e;
  border-radius: 5px;
  transition: 500ms;
}
.deleteModal div button:nth-of-type(1):hover {
  background: #00052e;
  color: white;
}
.deleteModal div button:nth-of-type(2):hover {
  background: red;
  border: 1px solid red;
  color: white;
}
</style>
