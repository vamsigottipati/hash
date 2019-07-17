<template>
<div class=main>
    <navBar />
    <div class="topCard">
        <div class="coverPicBar">
        </div>
        <div :class="[{fixTopBar2: this.var1}]" ref="topBar2" class="topBar2">
            <div class="topCardIcons">
                <span :class="{tabO: isActive1}" style="flex: 1" @click="isActive1 = !isActive1,isActive2 = false,isActive3 = false,isActive4 = false,isActive5 = false" class="barText"><i class="bx bx-body navIcon" style="flex: 1" alt="profile" > <br>Posts</i> </span>
                <span :class="{tabO: isActive2}" style="flex: 1" @click="isActive2 = !isActive2,isActive1 = false,isActive3 = false,isActive4 = false,isActive5 = false" class="barText"><i class="bx bx-bot navIcon" style="flex: 1" > <br>Following</i> </span>
                <span :class="{tabO: isActive3}" style="flex: 1" @click="isActive3 = !isActive3,isActive2 = false,isActive1 = false,isActive4 = false,isActive5 = false" class="barText"><i class="bx bxs-smiley-happy navIcon " style="flex: 1"> <br>Followers</i> </span>
                <span :class="{tabO: isActive4}" style="flex: 1" @click="isActive4 = !isActive4,isActive2 = false,isActive3 = false,isActive1 = false,isActive5 = false" class="barText"><i class="bx bx-code navIcon" style="flex: 1"> <br>Contributions</i></span>
                <span :class="{tabO: isActive5}" style="flex: 1" @click="isActive5 = !isActive5,isActive2 = false,isActive3 = false,isActive4 = false,isActive1 = false" class="barText"><i class="bx bx-show navIcon" style="flex: 1"><br>Showcase</i> </span>
            </div>
        </div>
        <div class="profilePic">
        </div>
    </div>
    <div class="body">
        <div class="lSidebar">
            <!--<div class="linkedProfiles" style="transform: scale(0.2)" >
               <img src="./fblogo.png" class="logo-1">
               <img src="./codeforces_logo.png" class="logo-2">
               <img src="./hackerEarth_logo.png" class="logo-3">
               <img src="./githublogo.png" class="logo-4">
               <img src="./220px-HackerRank_logo.png" class="logo-5">
            </div> -->
            <div class="logoCont">

            </div>
        </div>
        <div class="mainScroll">
            <div v-if="this.popup==false" class="sortBtn" @click="sortBtn()" style="display:flex;">
                        <strong class="sortText" style="flex:1;">SORT</strong>
                        <i style="flex:1" class='bx bxs-rocket sortIcon-2'></i>
                        <p class="sortText-2" style="flex:1;">Popular</p>
                        <i class="bx bx-chevron-down sortIcon" style="transform: translate(4px,2px), flex:1;"></i>
            </div>
            <div v-else class="sortBtn" @click="sortBtnClose()" style="display:flex ">
                        <strong class="sortText" style="flex:1;">SORT</strong>
                        <i style="flex:1" class='bx bxs-rocket sortIcon-2'></i>
                        <p class="sortText-2" style="flex:1;">Popular</p>
                        <i class="bx bx-chevron-down sortIcon" style="transform: translate(4px,2px), flex:1;"></i>
            </div>
            <div ref="sortPopup" class="sortPopup">
                <div class="sortPopupIcons" style="display:flex; transform: translateY(6px)">
                    <i style="flex:1" class='bx bxs-rocket'></i>
                    <p class="sortPopupText" style="flex:3">Popular</p>

                </div>
                <div class="sortPopupIcons" style="display:flex;">
                    <i style="flex:1" class="bx bxs-upvote"></i>
                    <p class="sortPopupText" style="flex:3 ;">Top</p>

                </div>
            </div>

            <div class="feed">

                <div class="fCard elevation-1" :key="sPost.Id in posts" v-for="sPost in posts">
                    <div class="fCardHeader">
                    <p class="fCardHeaderTitle">By <strong style="margin-left: 15px;">{{sPost.postedBy}}</strong> </p>
                    <p class="fCardHeaderSub">{{sPost.subForum}}</p>
                    </div>
                    <hr class="fCardHr">
                    <div class="fCardBody">
                    <p class="fCardBodyText">{{sPost.bodyText}}</p>
                    </div>
                    <hr class="fCardHr">
                    <div class="fCardFooter">
                    <div class="fCardFooterUpvotes" style="flex: 2;">
                        <span style="text-align: center;">
                        <i class="far fa-thumbs-up uDIcon" style="float: left;margin-left: 30px;font-size: 20px;transform: translateY(calc(50% - 5px));cursor: pointer;"></i>
                        <p style="float: left;margin-left: 18px;color: #DEB841;transform: translateY(50%);">100 <small>upvotes</small></p>
                        </span>
                    </div>
                    <div class="fCardFooterDownvotes" style="flex: 2;">
                        <span style="text-align: center;">
                        <i class="far fa-thumbs-up uDIcon" style="float: left;margin-left: 30px;font-size: 20px;transform: translateY(calc(50% - 5px));cursor: pointer;"></i>
                        <p style="float: left;margin-left: 18px;color: #DEB841;transform: translateY(50%);">100 <small>downvotes</small></p>
                        </span>
                    </div>
                    <div class="miniSpacer" style="flex: 1;"></div>
                    <!-- <div class="fCardFooterComment" style="flex: 1;">
                    </div> -->
                    </div>
                    <div class="fcardComment"></div>
      </div>
            </div>
        </div>

    </div>

</div>

</template>
<style scoped>

.coverPicBar{
    width: 100vw;
    height: 35vh;
    background-color: #DEB841;
}
.topBar2{
    background-color: #DEB841;
    height: 8vh;
    align-content: center;
}
.fixTopBar2{
    position: fixed;
}
.topCardIcons{
    display: flex;
    width: calc(40vw + 90px);
    margin-left: calc(30vw);
    text-align: center;
    color: white;
    background: rgb(56, 56, 56, 1);
}
.profilePic{
    background-color:#536aae;
    height: 13vw;
    width: 13vw;
    border-radius: 50%;
    position: absolute;
    top: 23vh;
    left:10vw;
    z-index: 999;

}
.barText{
    transition: 0.4s;
    margin: 8px;
    padding: 30px;
}
.barText:hover{
    color: aqua;
    border-radius: 5px;
    margin: 8px;
    cursor: pointer;
}
.tabO{
    background: #37323E;
    border-radius: 5px;
}
.backgroundFill {
    background: #536aae;
}
.body{

    padding: 0px;
    width: 100vw;
}
.lSidebar{
    position: absolute;
    border-radius: 5px;
    top: 47vh;
    background-color:grey;
    height: 70vh;
    padding: 0px;
    margin: 0px;
    width: 25vw;
    left: 2.5vw;
    overflow-y: scroll;

}
.mainScroll{
    margin-left:32.5vw;
    position: absolute;
    border-radius: 10px;
    width: 60vw;
    top: 47vh;
}
.rSidebar{
    flex:1;
    border-radius: 5px;
    background-color:grey;
    height: 90vh;
    padding: 5px;
    margin: 10px;
}
.sortBtn{
    margin-left: 20px;
    margin-top: 20px;
    background-color: #DEB841;
    width:12vw;
    text-align: center;
    padding: 5px;
    padding-top: 10px;
    padding-right: 0px;
    border-radius: 5px;
    height: 5vh;
}
.sortBtn:hover{
    cursor: pointer;
}
.sortText{

   text-align:left;
   padding-right:22px;
}
.sortIcon{
    text-align: left;
    margin: 0px;
    padding-left:0px;

}
.sortText-2{
   padding-right: 5px;
}
.sortIcon-2{
    transform: translate(-6px,2px)
}
.sortPopup{
    background: #DEB841;
      height: 10vh;
      width: 8vw;
      margin-top: 5px;
      z-index: 999;
      position: absolute;
      margin-left: 78px;
      border-radius: 5px;
      display: none;
      transform: translatex(-5px)
}
.sortPopupIcons{
    padding-top: 5px;
    padding-left: 10px;

}
.sortPopupIcons:hover{
   cursor:pointer
}
.sortPopupText{
    padding-right: 5px;
    text-align: left;
    padding-left: 7px;
}
.feed{
    z-index: 1;
    position: absolute;
    transform: translateX(-80px);
}
.fCard {
    width: 100%;
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
  .fCardHeader p{
    flex: 1;
    color: #DEB841;
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
   /* background: #ddd; */
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
    text-align: left;
    color: #DEB841;
    font-size: 14px;
  }
  .uDIcon {
    color: #DEB841;
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
  .linkedProfiles{

  }
  .logo-1{

  }
  .logoCont{
      background-color: darkgrey;
      height: 60px;
      margin: 10px;
      border-radius: 5px;
  }
  @media screen and (max-width: 498px) {
     .main{
         overflow-x: hidden;
     }
     .coverPicBar{
         width: 500px;

     }
     .lSidebar{
         width: 100vw;
         height: 10vh;
         padding: 0px;
         margin: 0px;
         left: 0px;

     }
     .topBar2{
         width: 500px;
     }
     .topCardIcons{
         margin-left: 0vw;
     }
     .sortBtn{
         position: absolute;
         font-size: 12px;
         margin-left: 0px;
         padding: 0px;
         width: 130px;
         height: 30px;
         padding-top: 5px;
         padding-left: 5px;
         margin-top: 90px;
         z-index: 999;

     }
     .sortPopup{
         width: 90px;
         padding: 0px;
         font-size: 12px;
         height: 60px;
         transform: translate(0px,0px);
         margin-top: 130px;
         margin-left: 40px;
     }
     .feed{
         position: absolute;
         width: 100vw;
         padding: 0px;
         margin: 0px;
         transform: translateX(0px);
         top: 18vh;

     }
     .mainScroll{
         padding: 0px;
         margin: 0px;
     }
     .fCard{
         width: 100vw;
         margin: 0px;
         margin-bottom: 10px;

     }
  }

    @media screen and (max-width: 768px ) {
        .main{
         overflow-x: hidden;
     }
     .coverPicBar{
         width: 100%;

     }
     .lSidebar{
         width: 100vw;
         height: 10vh;
         padding: 0px;
         margin: 0px;
         left: 0px;

     }
     .topBar2{
         width: 100%;
     }
     .topCardIcons{

         text-align: center;
         width: 40%;
         margin-left: 30%;
         margin-right: 30%;
     }
     .sortBtn{
         position: absolute;
         font-size: ;
         margin-left: 0px;
         padding: 0px;
         width: 140px;
         height: 30px;
         padding-top: 5px;
         margin-top: 10vh;
         z-index: 999;
         transform: translate(0px,80px)

     }
     .sortPopup{
         width: 90px;
         padding: 0px;
         font-size: ;
         height: 60px;
         transform: translate(10px,0px);
         margin-top: 130px;
         margin-left: 40px;
     }
     .feed{
         position: absolute;
         width: 100vw;
         padding: 0px;
         margin-top: 10px;
         transform: translateX(0px);
         top: 18vh;

     }
     .mainScroll{
         padding: 0px;
         margin: 0px;
     }
     .fCard{
         width: 100vw;
         margin: 0px;
         margin-bottom: 10px;

     }
     }
    @media screen and (max-width: 992px ) {
         .mainScroll{
         padding: 0px;
         /* margin: 0px; */
     }
     .fCard{
         width: 100%;
         margin: 0px;
         margin-bottom: 10px;
     }
     .feed{
         transform: translateX(0px);
     }
     .sortBtn{
         width: 150px;
         margin: 0px;
         margin-left: 10px;
         margin-bottom: 10px;

     }
     .sortPopup{
         width: 100px;
     }
    }
</style>
<script>
import navBar from './navBar'
export default {
  name: 'profile1',
  components: {
    navBar
  },
  mounted: function () {
    if (this.scrollTop > 40) {
      this.var1 = true
      this.$refs.topBar2.style.position = 'fixed'
    }
  },
  methods: {
    sortBtn () {
      this.$refs.sortPopup.style.display = 'block'
      this.popup = true
    },
    sortBtnClose () {
      this.$refs.sortPopup.style.display = 'none'
      this.popup = false
    }
  },
  data () {
    return {
      popup: false,
      tab: false,
      isActive1: false,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      isActive5: false,
      var1: false,
      navSearch: '',

      posts: [
        {
          postedBy: 'vamsi',
          Id: 'asd',
          subForum: 'SubForum',
          upvotes: '100',
          downvotes: '100',
          bodyText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio?',
          bodyImg: ''
        },
        {
          postedBy: 'vamsi',
          Id: 'asdasd',
          subForum: 'SubForum 2',
          upvotes: '101',
          downvotes: '101',
          bodyText: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi om5ugtregvteg3gwv53g nis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum laborum odit aut quos modi omnis aspernatur, unde provident quis repellat error, ullam, itaque necessitatibus numquam eaque atque consequatur autem optio? ',
          bodyImg: ''
        }
      ]
    }
  }

}
</script>
