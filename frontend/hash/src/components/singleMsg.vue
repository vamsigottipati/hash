<template>
    <div style="display: flex; flex-direction: row;" class="wrapper">
        <div v-for="s_msg in message_array" style="display: flex; flex-direction: row;" class="singleMsg">
            <p v-if="s_msg.type == 'text'">{{s_msg.value}}</p>
            <!-- <div v-if="s_msg.type == 'emoji'" :class="s_msg.value" style="width: 20px; height: 20px; align-self: center; margin-left: 5px;margin-right: 5px; padding: 5px;background-size: 20px 20px;"></div> -->
            <img :src="setEmoji(s_msg.value)" v-if="s_msg.type == 'emoji'"  alt="" style="width: 20px; height: 20px; align-self: center; margin-left: 5px;margin-right: 5px;" srcset="">
        </div>
        <!-- <p>{{message_array}}</p> -->
    </div>
</template>

<style scoped>
    @import '../assets/main.css';
</style>

<script>

    export default {
        name: 'singleMsg',
        props: ['message_array'],
        data() {
            return {
            }
        },
        mounted: function () {
        },
        methods: {
            setEmoji (e) {
                return require('../assets/emoji/' + e.toLowerCase() + '.png')
            }
        },
    }

</script>