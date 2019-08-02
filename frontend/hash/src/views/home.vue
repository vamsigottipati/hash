<template>
  <div class="homeBody">
    <navBar/>
    <div class="lSideBar" ref="sidebar">
      <div class="forums">
        <div class="forumList" style="background: #ddd;">
          <img class="sideImg" src="../assets/icons/star.svg" alt>
          <p>All Sub Forums</p>
        </div>
        <div
          class="forumList"
          :key="`${index}`"
          :id="`forumList${index}`"
          v-for="(singleForum,index) in this.forumList"
        >
          <img class="sideImg" :src="singleForum.forumImg" alt>
          <p>{{ singleForum.forumName }}</p>
        </div>
        <div class="forumList">
          <img class="sideImg" src="../assets/icons/suggestions.svg" alt>
          <p>Suggestions</p>
        </div>
        <div class="forumList">
          <img class="sideImg" src="../assets/icons/bug.svg" alt>
          <p>Bug Report</p>
        </div>
        <div class="forumList">
          <img class="sideImg" src="../assets/icons/add.svg" alt>
          <p>Add Forum</p>
        </div>
      </div>
      <div class="groups"></div>
      <div class="people"></div>
    </div>
    <div class="main">
      <post style="height: auto;"/>
      <div class="fCard" :key="`${index}`" v-for="(sPost, index) in posts">
        <div class="fCardHeader">
          <p class="fCardHeaderTitle">
            By
            <strong style="margin-left: 15px;">{{sPost.postedBy}}</strong>
          </p>
          <p class="fCardHeaderSub">{{sPost.subForum}}</p>
        </div>
        <hr class="fCardHr">
        <div class="fCardBody">
          <pre class="fCardBodyText"> {{ sPost.bodyText }} </pre>
        </div>
        <p class="fullPostViewLink" @click="routeHandler(sPost._id)">View Post</p>
        <hr class="fCardHr">
        <div class="fCardFooter">
          <div class="fCardFooterUpvotes" style="flex: 2;">
            <span style="text-align: center;display: flex;">
              <img
                src="../assets/icons/positive-vote.svg"
                alt
                style="width: 25px; height: 25px;margin-left: 30px;transform: translateY(2px);cursor: pointer;"
                v-if="sPost.uVoted"
                @click="upVoteInc(index, sPost.id)"
              >
              <img
                src="../assets/icons/positive-vote-outline.svg"
                alt
                style="width: 25px; height: 25px;margin-left: 30px;transform: translateY(2px);cursor: pointer;"
                v-if="!sPost.uVoted"
                @click="upVoteInc(index, sPost.id)"
              >
              <p style="float: left;margin-left: 18px;color: #37323E;transform: translateY(50%);">
                {{sPost.upVotes}}
                <small>upvotes</small>
              </p>
            </span>
          </div>
          <div class="fCardFooterDownvotes" style="flex: 2;">
            <span style="text-align: center;display: flex;">
              <img
                src="../assets/icons/negative-vote.svg"
                alt
                style="width: 25px; height: 25px;margin-left: 30px;transform: translateY(2px);cursor: pointer;"
                v-if="sPost.dVoted"
                @click="downVoteInc(index, sPost.id)"
              >
              <img
                src="../assets/icons/negative-vote-outline.svg"
                alt
                style="width: 25px; height: 25px;margin-left: 30px;transform: translateY(2px);cursor: pointer;"
                v-if="!sPost.dVoted"
                @click="downVoteInc(index, sPost.id)"
              >
              <p style="float: left;margin-left: 18px;color: #37323E;transform: translateY(50%);">
                {{sPost.downVotes}}
                <small>downvotes</small>
              </p>
            </span>
          </div>
          <div class="miniSpacer" style="flex: 1;"></div>
        </div>
        <div class="fcardComment"></div>
      </div>
    </div>

    <div class="rSidebarP">
      <div class="card">
        <h2 class="cardHeader">Hackathon</h2>
        <hr class="addCardHr">
        <p
          class="cardBody"
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio?</p>
        <button
          class="cardBtn"
          @mouseover="isHovering1 = true"
          @mouseout="isHovering1 = false"
        >Visit The Contest</button>
      </div>
      <div class="card">
        <h2 class="cardHeader">Hackathon 2</h2>
        <hr class="addCardHr">
        <p
          class="cardBody"
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio?</p>
        <button
          class="cardBtn"
          @mouseover="isHovering2 = true"
          @mouseout="isHovering2 = false"
        >Visit The Contest</button>
      </div>
    </div>
    <div class="rSidebarS"></div>
  </div>
</template>

<script>
import navBar from "./navBar";
import post from "./post";
import * as firebase from "firebase";
import io from "socket.io-client";
import { EventBus } from "../eventbus.js";

export default {
  name: "Home",
  components: {
    navBar,
    post
  },
  data() {
    return {
      navSearch: "",
      isHovering1: false,
      isHovering2: false,
      posts: [],
      like_dislike_images: {
        like_plain: '../assets/icons/positive-vote-outline.svg',
        like_fill: '../assets/icons/positive-vote.svg',
        dislike_plain: '../assets/icons/negative-vote-outline.svg',
        dislike_fill: '../assets/icons/negative-vote.svg',
      },
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
      ]
    };
  },
  mounted: function() {
    this.getData();
    this.checkEventBus();
  },
  methods: {
    getData() {
      var vm = this;
      this.$http
        .get("http://localhost:8080/api/forms/")
        .then(resp => {
          console.log(resp);
          this.posts = resp.body;
        })
        .catch(err => {
          console.error(err);
        });
    },
    checkEventBus() {
      var vm = this;
      EventBus.$on("newPost", data => {
        vm.posts.unshift(data);
      });
    },
    routeHandler(e) {
      this.$router.push("/singlePost/" + e);
    },
    upVoteInc(u, i) {
      if (this.posts[u].uVoted) {
        this.posts[u].upVotes = this.posts[u].upVotes - 1;
        this.posts[u].uVoted = !this.posts[u].uVoted;
        this.$http
          .get("http://localhost:8080/api/forms/" + i)
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        this.posts[u].upVotes = this.posts[u].upVotes + 1;
        this.posts[u].uVoted = !this.posts[u].uVoted;
        this.$http
          .get("http://localhost:8080/api/forms/" + i)
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    downVoteInc(d, i) {
      if (this.posts[d].dVoted) {
        this.posts[d].downVotes = this.posts[d].downVotes - 1;
        this.posts[d].dVoted = !this.posts[d].dVoted;
      } else {
        this.posts[d].downVotes = this.posts[d].downVotes + 1;
        this.posts[d].dVoted = !this.posts[d].dVoted;
      }
    }
  },
  beforeCreate() {
    var vm = this;
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        vm.$router.push("login");
      } else {
        console.log("Auth Checked");
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sideImg {
  width: 25px;
  height: 25px;
  margin-right: 20px;
  margin-left: 20px;
}
.lSideBar {
  position: fixed;
  top: 8%;
  left: 0px;
  width: 20vw;
  height: 92%;
  z-index: 8;
  transition: 250ms linear;
  text-align: center;
  overflow: auto;
}

.main {
  position: absolute;
  left: 20vw;
  top: 8vh;
  width: 40vw;
  min-height: 92%;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0px; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
}
::-moz-scrollbar {
  width: 0px; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
}
::-o-scrollbar {
  width: 0px; /* remove scrollbar space */
  background: transparent; /* optional: just make scrollbar invisible */
}
.forumList {
  display: flex;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 1000px;
  cursor: pointer;
}
.forumList:hover {
  background: #ddd;
}
.forumList p {
  height: 20px;
  line-height: 20px;
  transform: translateY(10px);
  text-align: left;
  margin-left: 10px;
  font-weight: 200;
}
.forumList img {
  transform: translateY(7px);
}
.rSidebarP {
  position: absolute;
  top: 8%;
  right: 20vw;
  width: 20vw;
  height: 92%;
  z-index: 8;
  transition: 250ms linear;
  text-align: center;
}
.rSidebarP > .card:first-of-type {
  margin-top: 5vh;
}
.rSidebarS {
  position: fixed;
  top: 8%;
  right: 0vw;
  width: 17.5vw;
  min-height: 92%;
  z-index: 8;
  transition: 250ms linear;
  text-align: center;
  /* background: #37323E; */
}

.navSerachInput {
  all: unset;
  width: 70%;
  margin-left: 10%;
  background: #eeeff7;
  z-index: 999;
  color: #37323E;
  height: 4vh;
  border-radius: 2px;
}

.navSearchBtn {
  all: unset;
  width: 10%;
  color: rgb(10, 12, 75);
  background: #37323E;
  height: 4vh;
  border-radius: 2px;
  transform: translateY(3px);
  cursor: pointer;
}

.navIcon {
  color: #eeeff7;
  font-size: 1.5rem;
  cursor: pointer;
}

.fas {
  color: #177e89;
}

.card {
  width: 95%;
  min-height: 20vh;
  margin: 20px 2.5% 20px 2.5%;
  background: whitesmoke;
  border-radius: 15px;
  text-align: left;
  -webkit-animation: boxShadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: boxShadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.cardHeader {
  padding: 30px;
  color: #37323E;
}

.cardBody {
  padding: 30px;
}

.cardBtn {
  padding: 15px 40px 15px 40px;
  margin: 30px;
  background: #37323E;
  color: #eee;
  font-weight: 900;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 12px;
  transition: 250ms;
}
.forums {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
}

.forums span h2 {
  padding: 20px;
  color: #37323E;
}

.groups {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
}

.groups span h2 {
  padding: 20px;
  color: #37323E;
}

.people {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
}

.people span h2 {
  padding: 20px;
}

.fCard {
  width: 90%;
  margin-left: 5%;
  margin-top: 50px;
  margin-bottom: 50px;
  min-height: 20vh;
  background: whitesmoke;
  border-radius: 5px;
  text-align: left;
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
  min-height: calc(8vh - 20px);
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
  max-height: 30vh;
  font-family: "Ubuntu";
  overflow: hidden;
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
.addCardHr {
  border: 0;
  border-bottom: 1px dashed #ccc;
  background: #999;
  width: 85%;
  opacity: 1;
  margin-left: 7.5%;
  margin-top: -10px;
}
.fullPostViewLink {
  margin-left: 45px;
  font-size: 15px;
  color: #37323E;
  cursor: pointer;
  text-align: left;
  width: auto;
  max-width: 30%;
}
/*  Keyframes  */
@-webkit-keyframes boxShadow {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(100px);
    transform: translateZ(100px);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.15);
  }
}
@keyframes boxShadow {
  0% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(100px);
    transform: translateZ(100px);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.15);
  }
}

/* mobiles */

@media screen and (max-width: 992px) {
  .rSidebarS {
    display: none;
  }
  .main {
    width: 55vw;
    left: 20vw;
  }
  .lSideBar {
    width: 20vw;
    left: 0px;
  }
  .rSidebarP {
    width: 27.5vw;
    right: 0vw;
  }
}

@media screen and (max-width: 860px) {
  .miniSpacer {
    display: none;
  }
}

@media screen and (max-width: 768px) {
  .rSidebarP {
    display: none;
  }
  .main {
    width: 75vw !important;
    left: 27.5vw !important;
  }
  .lSideBar {
    width: 30vw !important;
  }
}

@media screen and (max-width: 498px) {
  .lSideBar {
    display: none;
  }
  .main {
    width: 100vw !important;
    left: 0vw !important;
  }
  .fCard {
    width: 100%;
    margin-left: 0%;
    border-radius: 0px;
  }
}
</style>
