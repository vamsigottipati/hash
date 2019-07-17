<template>
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
</script>
