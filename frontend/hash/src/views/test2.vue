<!-- <template>
    <p>{{this.asd}}</p>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'test2',
  data () {
    return {
      socket1: io('http://192.168.0.118:8080/'),
      asd: ''
    }
  },
  mounted: function () {
    this.asd = this.$store.getters.getTest
    this.connectToSocket()
  },
  methods: {
    connectToSocket () {
      this.socket1.on('post1', (resp) => {
        console.log(resp)
        this.socket1.emit('hey', 'vamsi')
      })
    }
  },
  computed: {

  }
}
</script> -->



<template>

  <div>
    <!-- <input v-model="msg" placeholder="Type here" type="text" style="width: 50vw; height: auto; padding: 20px 40px 20px 40px; text-align: left;font-size: 16px;background: #ddd; color: black;margin: 0px; margin-top: 100px;border-radius: 1000000px;"> -->
    <br>
    <!-- <p ref="main_p">{{ this.alt_msg }}</p> -->
    <div style="display: flex; flex-direction: row;" ref="main" contenteditable="true">&nbsp;</div>
    <br>
    <img src="../assets/emoji/1f604.png" @click="emojiAdder('1f604')" style="margin-top: 50px;width: 40px; height: 40px;cursor: pointer;" alt="">
    <!-- <p ref="text" contenteditable="true"></p> -->
  
  </div>

</template>

<style scoped>
  @import '../assets/main.css';
  input:focus{
    outline: none;
  }
  [contenteditable]:focus {
    outline: 0px solid transparent;
  }
</style>

<script>
export default {
  name: 'test2',
  data () {
    return {
      msg:'',
      alt_msg: 'asdasdasdasdasd'
    }
  },
  mounted: function () {
  },
  methods: {
    emojiAdder (e) {
      // alert(e)
      var l = 'emoji-' + e
      var x = `<div class="${l}" style="width: 20px; height: 20px; align-self: center; margin-left: 5px;margin-right: 5px; padding: 5px;background-size: 20px 20px;"></div>`
      var y = `&nbsp;`
      var z = `&nbsp;`
      this.$refs.main.innerHTML = this.$refs.main.innerHTML + x
      this.$refs.main.innerHTML = this.$refs.main.innerHTML + y
    },
    setDMode() {
    },
  },
}
</script>