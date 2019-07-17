    <template>
    <div class="pageBody">
        <navBar />
        <!-- <div class="circle-highlight"></div> -->
        <div style="display: flex;flex-direction: column;margin-top: 8vh;width: 100vw;height: 92vh;">
            <div class="navPadding"></div>
            <div class="cont">
                <div class="profile">
                    <div class="profilePicCont">
                        <div class="profilePic"></div>
                    </div>
                    <div class="profileInfo"></div>
                </div>
                <div class="main">
                    <div class="secondaryNavBar">
                        <span class="secondaryNavBarSpan" :class="[(this.activeTab === 'post' ? 'activeNavBg' : 'defaultBg')]" @click="changeTab('post')" >
                            <div style="flex: 1;"></div>
                            <i :class="[(this.activeTab === 'post' ? 'activeNavIcon' : 'defaultIcon')]" class="bx bx-body secondaryNavIcon"></i>
                            <p>Posts</p>
                        </span>
                        <span class="secondaryNavBarSpan" :class="[(this.activeTab === 'following' ? 'activeNavBg' : 'defaultBg')]" @click="changeTab('following')" >
                            <div style="flex: 1;"></div>
                            <i :class="[(this.activeTab === 'following' ? 'activeNavIcon' : 'defaultIcon')]" class="bx bx-bot secondaryNavIcon"></i>
                            <p>Following</p>
                        </span>
                        <span class="secondaryNavBarSpan" :class="[(this.activeTab === 'followers' ? 'activeNavBg' : 'defaultBg')]" @click="changeTab('followers')" >
                            <div style="flex: 1;"></div>
                            <i :class="[(this.activeTab === 'followers' ? 'activeNavIcon' : 'defaultIcon')]" class="bx bx-smiley-happy secondaryNavIcon"></i>
                            <p>Followers</p>
                        </span>
                        <span class="secondaryNavBarSpan" :class="[(this.activeTab === 'showcase' ? 'activeNavBg' : 'defaultBg')]" @click="changeTab('showcase')" >
                            <div style="flex: 1;"></div>
                            <i :class="[(this.activeTab === 'showcase' ? 'activeNavIcon' : 'defaultIcon')]" class="bx bx-show secondaryNavIcon"></i>
                            <p>Showcase</p>
                        </span>
                        <span class="secondaryNavBarSpan" :class="[(this.activeTab === 'projects' ? 'activeNavBg' : 'defaultBg')]" @click="changeTab('projects')" >
                            <div style="flex: 1;"></div>
                            <i :class="[(this.activeTab === 'projects' ? 'activeNavIcon' : 'defaultIcon')]" class="bx bx-code secondaryNavIcon"></i>
                            <p>Projects</p>
                        </span>
                    </div>
                    <div class="mainContent">
                        <div class="postsTab" v-if="this.activeTab === 'post'" ref="postTab">
                            <p>posts tab</p>
                        </div>
                        <div class="followingTab" v-if="this.activeTab === 'following'" ref="followingTab">
                            <p>following tab</p>
                        </div>
                        <div class="followersTab" v-if="this.activeTab === 'followers'" ref="followersTab">
                            <p>followers tab</p>
                        </div>
                        <div class="showcaseTab" v-if="this.activeTab === 'showcase'" ref="showcaseTab">
                            <p>showcase tab</p>
                        </div>
                        <div class="projectsTab" v-if="this.activeTab === 'projects'" ref="projectsTab">
                            <p>projects tab</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .pageBody {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0px;
        left: 0px;
        overflow: hidden;
    }
    .navPadding {
        flex: 2;
        /* background: #44AF69; */
        background: #177E89;
    }
    .cont {
        display: flex;
        flex: 8;
        width: 100vw;
    }
    .profile {
        flex: 2;
        /* background: yellow; */
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .profilePicCont {
        flex: 1;
        transform: translateY(-80px);
    }
    .profilePic {
        position: fixed;
        height: 140px;
        width: 140px;
        margin-left: calc(100vw/7 - 70px - 1vw);
        border-radius: 50%;
        background: #37323E;
    }
    .profileInfo {
        flex: 7;
        background: #37323E;
        margin-top: 2vh;
        margin-left: 2vw;
        margin-right: 5vw;
        margin-bottom: 4vh;
        border-radius: 10px;
    }
    .main {
        flex: 5;
        /* background: red; */
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .secondaryNavBar {
        flex: 1;
        background: #37323E;
        transform: translateY(-50px);
        /* border-radius: 1000px; */
        margin-right: 5vw;
        z-index: 99;
        display: flex;
        direction: row;
    }
    .secondaryNavBarSpan {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        /* border-radius: 1000px; */
    }
    .secondaryNavIcon{
        color: #dddddd;
        flex: 2;
        font-size: 16px;
        justify-content: flex-end;
    }
    .secondaryNavBarSpan > p{
        color: #dddddd;
        flex: 1;
        font-size: 12px;
    }
    .mainContent {
        flex: 7;
        /* background: red; */
        margin-right: 5vw;
        margin-top: 2vh;
        margin-bottom: 4vh;
    }
    .contnavIcon {
        color: white;
        z-index: 100;
    }
    .circle-highlight {
        position: absolute;
        top: calc(100vh/7);
        left: calc(200vw/7);
        background: orange;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        z-index: 200;
    }
    .noDisplay {
        display: none;
    }
    .activeNavBg {
        background: #44AF69;
        transition: 500ms;
    }
    .defaultBg {
        background: #37323E;
        transition: 500ms;
    }
    .activeNavIcon {
        font-size: 16px;
        color: #dddddd;
        transition: 500ms;
    }
    .defaultIcon {
        font-size: 16px;
        transition: 500ms;
    }
</style>

<script>

import navBar from './navBar'

export default {
  name: 'test',
  components: {
    navBar
  },
  data () {
    return {
      activeTab: 'post'
    }
  },
  methods: {
    changeTab (e) {
      this.activeTab = e
    }
  }
}
</script>
