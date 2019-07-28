<template>
  <div class="navBody" style="background: #37323E;">
    <div class="top-nav">
      <div @click="$router.push('/home')" class="logo" style="display: flex;cursor: pointer;margin-left: 0px;">
        <img src="../assets/icons/logo_white.svg" style="cursor: pointer;width: 20px; height : 20px;margin-top: 2px"  alt="">
        <div class="logo_text" style="margin-left: 30px;align-self: center">
          <p  style="font-size: 20px;font-weight: 600;cursor: pointer; margin: auto;color: white;"> Hash</p>
          <!-- <p style="flex:1;font-size: 14px;font-weight: 100;transform: translateY(-15px);cursor: pointer;"> A BITSian Initiative </p> -->
        </div>
      </div>
      <div style="width: 40px; height: 40px; border-radius: 50%;margin-right: 30px;margin-left: auto;display: flex; flex-direction: column;justify-content: center;" data-tooltip='Profile' class="navIcontCont" @click="$router.push('/profile')">
        <img style="" class="navIcon" src="../assets/icons/person-outline.svg" alt="">
      </div>
      <div style="width: 40px; height: 40px; border-radius: 50%;margin-right: 50px;display: flex; flex-direction: column;justify-content: center;" data-tooltip='Messages' class="navIcontCont" @click="$router.push('/messages')">
        <img class="navIcon" src="../assets/icons/message-square-outline.svg" alt="">
      </div>
      <div style="width: 40px; height: 40px; border-radius: 50%;margin-right: 50px;display: flex; flex-direction: column;justify-content: center;" data-tooltip='Code' class="navIcontCont" @click="$router.push('/code')">
        <img class="navIcon" src="../assets/icons/code-outline.svg" alt="">
      </div>
      <div style="width: 40px; height: 40px; border-radius: 50%;margin-right: 50px;display: flex; flex-direction: column;justify-content: center;" data-tooltip='Coolab Mode' class="navIcontCont" @click="$router.push('/collab')">
        <img class="navIcon" src="../assets/icons/radio-outline.svg" alt="">
      </div>
      <div style="width: 40px; height: 40px; border-radius: 50%;margin-right: 50px;display: flex; flex-direction: column;justify-content: center;" data-tooltip='Showcase' class="navIcontCont" @click="$router.push('/showcase')">
        <img class="navIcon" src="../assets/icons/npm-outline.svg" alt="">
      </div>
      <div style="width: 40px; height: 40px; border-radius: 50%;margin-right: 50px;display: flex; flex-direction: column;justify-content: center;" data-tooltip='Logout' class="navIcontCont" @click="this.logout">
        <img class="navIcon" src="../assets/icons/power-outline.svg" alt="">
      </div>
      <div style="width: 40px; height: 40px; border-radius: 50%;margin-right: 50px;display: flex; flex-direction: column;justify-content: center;" data-tooltip=' Toggle Menu' class="navIcontCont"  @click="toggleDisplay">
        <img class="hiddenNavIcon" src="../assets/icons/menu.svg" alt="">
      </div>
    </div>
    <div class="rightSideBar" v-if="this.openRSb" ref="rightSidebar">
      <span class="navIconMobCont" @click="$router.push('/profile')">
          <i class="material-icons navIconMob"  style="flex: 1;color: #44AF69;">person</i>
          <p class="navIconMobText" style="color: white;">Profile</p>
      </span>
      <br>
      <span class="navIconMobCont" @click="$router.push('/messages')">
          <i class="bx bx-message-detail navIconMob"  style="flex: 1;color: #44AF69;"></i>
          <p class="navIconMobText" style="color: white;">Messages</p>
      </span>
      <br>
      <span class="navIconMobCont" @click="$router.push('/code')">
          <i class="bx bx-code navIconMob"  style="flex: 1;color: #44AF69;"></i>
          <p class="navIconMobText" style="color: white;">Code</p>
      </span>
      <br>
      <span class="navIconMobCont" @click="$router.push('/collab')">
          <i class="bx bx-horizontal-center navIconMob"  style="flex: 1;color: #44AF69;"></i>
          <p class="navIconMobText" style="color: white;">Collab</p>
      </span>
      <br>
      <span class="navIconMobCont" @click="$router.push('/showcase')">
          <i class="material-icons navIconMob"  style="flex: 1;color: #44AF69;">collections</i>
          <p class="navIconMobText" style="color: white;">Showcase</p>
      </span>
      <br>
      <span class="navIconMobCont" @click="logout">
          <i class="material-icons navIconMob"  style="flex: 1;color: #44AF69;">power_settings_new</i>
          <p class="navIconMobText" style="color: white;">Logout</p>
      </span>
      <div class="searchContMob">
        <input class="searchInputMob" placeholder="Search Post" type="text">
        <button><i class="bx bx-search-alt searchBtnMob"></i></button>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: 'navbar',
  data () {
    return {
      navSearch: '',
      openRSb: false,
      homeRoute: false
    }
  },
  mounted: function () {
    if (window.location.pathname == '/home') {
      this.homeRoute = true
    } else {
      this.homeRoute = false
    }
  },
  methods: {
    logout () {
      var vm = this
      firebase.auth().signOut().then(
        resp => {
          alert('SignOut Succesful')
          vm.$router.push('login')
        }
      )
    },
    toggleDisplay () {
      this.openRSb = !this.openRSb
    }
  }
}
</script>

<style scoped>
  .top-nav {
    position: fixed;
    background: #37323E;
    top: 0px;
    left: 0px;
    height: 8%;
    width: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 0px;
  }
.logo {
  margin-left: 30px;
  text-align: left;
}
.logo img{
  width: 40px;
  height: 40px;
  margin-left: 30px;
}
.navIcontCont:hover::after {
  content: attr(data-tooltip);
	max-width: 500px;
	position: absolute;
	left: auto;
  margin-left: -50px;
  top: 7vh;
	padding: 20px;
  background: #eeeeee;
  border-radius: 10px;
  z-index: 999;
  -webkit-animation: bg-shadow 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: bg-shadow 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
.searchBar {
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  flex: 3;
}
  ::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
  }

  .navSerachInput {
    all: unset;
    flex: 5;
    background: whitesmoke;
    z-index: 999;
    color: #222222;
    height: 3vh;
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .navSearchBtn {
    all: unset;
    flex: 1;
    color: white;
    background: #44AF69;
    height: 3vh;
    border-radius: 2px;
    cursor: pointer;
    border-top-right-radius: 1000px;
    border-bottom-right-radius: 1000px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .spacer{
    flex: 3;
  }

  .navIcon {
    /* color: #EEEFF7; */
    cursor: pointer;
    width: 20px;
    height: 20px;
  }

  .hiddenNavIcon {
    flex: 1;
    color: white;
    display: none;
  }

  .rightSideBar {
    position: fixed;
    top: 8vh;
    z-index: 999;
    background: #44AF69;
    height: 92vh;
    right: 0px;
    cursor: pointer;
  }
  .searchContMob{
    position: absolute;
    bottom: 15vh;
    right: 4.5vw;
    width: 60vw;
    height: auto;
    opacity: 0;
  }
  .searchContMob input{
    all: unset;
    background: #eeeeee;
    color: 222;
    height: 5.5vh;
    margin: 0px;
    width: 50vw;
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    text-align: center;
  }
  .searchContMob button{
    all: unset;
    background: #37323E;
    color: white;
    height: 5.5vh;
    transform: translateX(-10px);
    width: 10vw;
    border-top-right-radius: 1000px;
    border-bottom-right-radius: 1000px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    text-align: center;
  }
  /* mobiles */

@media screen and (max-width: 420px ) {
  .searchBar{
   display: none;
   flex: 0;
  }
  .searchContMob{
    opacity: 1;
  }
  .logo{
    text-align: left;
  }
  .spacer{
    display: none;
  }
  .miniSpacer {
    display: none;
    flex: 0;
  }
  .navIcon{
    display: none;
  }
  .hiddenNavIcon{
    display: block;
    flex:2;
    text-align: right;
    padding-right: 30px;
    transform: translateY(-2px);
  }
  .rightSideBar{
    width: 70vw;
    height: 100vh;
  }

  .navIconMob {
    font-size: 20px;
    cursor: pointer;
    flex: 1;
    text-align: center;
  }
  .navIconMobText {
    flex: 1;
    text-align: left;
    transform: translateY(8px);
    color: white;
  }

  .navIconMobCont {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .navIconMobCont:nth-of-type(1){
    margin-top: 50px;
  }

}

@media screen and (max-width: 620px ) {
  .logo{
    text-align: left;
  }
  .spacer{
    display: none;
    flex: 0;
  }
  .navIcon{
    display: none;
  }
  .hiddenNavIcon{
    display: block;
    flex:2;
    text-align: right;
    padding-right: 30px;
    transform: translateY(-2px);
  }
  .rightSideBar{
    top: 10vh;
    height: 90vh;
    width: 70vw;
  }

  .navIconMob {
    font-size: 20px;
    color: black;
    cursor: pointer;
    flex: 1;
    text-align: center;
  }
  .navIconMobText {
    flex: 1;
    text-align: left;
    transform: translate(0px, 8px);
  }

  .navIconMobCont {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .navIconMobCont:nth-of-type(1){
    margin-top: 50px;
  }
  .top-nav{
    height: 10vh;
  }
}

@media screen and (max-width: 768px ) {
  .searchBar {
    flex: 4;
  }
  .logo {
    transform: scale(0.75)
  }
  .spacer {
    display: none;
  }
  .navIcon:nth-of-type(3) {
    display: none;
  }
  .navIcon:nth-of-type(4) {
    display: none;
  }
  .navIcon:nth-of-type(1) {
    display: none;
  }
  .navIcon:nth-of-type(6) {
    display: none;
  }
  .navIcon:nth-of-type(5) {
    display: none;
  }
  .hiddenNavIcon {
    display: block;
    transform: scale(0.75)
  }
  .rightSideBar {
    width: 70vw;
    height: 100vh;
  }
  .navIconMob {
    font-size: 20px;
    color: black;
    cursor: pointer;
    flex: 1;
    text-align: center;
  }
  .navIconMobText {
    flex: 1;
    text-align: left;
    transform: translate(-35px, 8px);
  }

  .navIconMobCont {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .navIconMobCont:nth-of-type(1){
    margin-top: 50px;
  }
}

@media screen and (max-width: 872px ) {
  .searchBar {
    flex: 8;
  }
  .navIcon:nth-of-type(3) {
    display: none;
  }
  .navIcon:nth-of-type(4) {
    display: none;
  }
  .navIcon:nth-of-type(5) {
    display: none;
  }
  .hiddenNavIcon {
    display: block;
    transform: scale(0.75)
  }
  .rightSideBar {
    width: 70vw;
    height: 100vh;
  }
  .navIconMob {
    font-size: 20px;
    color: black;
    cursor: pointer;
    flex: 1;
    text-align: center;
  }
  .navIconMobText {
    flex: 1;
    text-align: left;
    transform: translate(-35px, 8px);
  }
  .navSearchBtn {
    width: 15%;
  }
  .navIconMobCont {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .navIconMobCont:nth-of-type(1){
    margin-top: 50px;
  }
}

@media screen and (max-width: 1140px ) {
  .spacer {
    display: none;
  }
  .logo {
  }
  .navIcon{
    transform: scale(0.75)
  }
  .searchBar {
    flex: 6;
  }
  .navSearchBtn {
    width: 13.5%;
  }
}


/* keyframes */

@-webkit-keyframes bg-shadow {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.25);
  }
}
@keyframes bg-shadow {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
  100% {
    -webkit-transform: translateZ(50px);
            transform: translateZ(50px);
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.25);
  }
}

</style>
