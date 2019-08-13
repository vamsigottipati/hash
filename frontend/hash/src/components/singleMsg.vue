<template>
    <div style="display: flex; flex-direction: row;" class="wrapper">
        <div v-for="s_msg in message_array" class="singleMsg">
            <p v-if="s_msg.type == 'text'">{{s_msg.value}}</p>
            <div v-if="s_msg.type == 'emoji'" :class="s_msg.value" style="width: 20px; height: 20px; align-self: center; margin-left: 5px;margin-right: 5px; padding: 5px;background-size: 20px 20px;"></div>
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
                // msg: {
                //     text: '<h1>asdfghjkl aiusgdasd iuagsduia sdiuas diua</h1>',
                //     senderId: 'asdasdasdasd',
                //     img: 'null',
                //     emoji_data: [
                //         {
                //             position: 3,
                //             class: 'emoji-1f60e'
                //         },
                //         {
                //             position: 49,
                //             class: 'emoji-1f60e'
                //         }
                //     ]
                // },
                // message_array: []
            }
        },
        mounted: function () {
            // setTimeout(() => {
            //     this.setMsgData(this.msg)
            // }, 1000);
        },
        methods: {
            // setMsgData(msg_data) {
            //     var vm = this
            //     var arr = []
            //     var prev_pos = 0
            //     if(msg_data.emoji_data) {
            //         for (let index = 0; index < msg_data.emoji_data.length; index++) {
            //             var x = msg_data.emoji_data[index].position
            //             var text_obj = {
            //                 'value': msg_data.text.substring(prev_pos, x),
            //                 'type': 'text'
            //             }
            //             var emoji_obj = {
            //                 'value': msg_data.emoji_data[index].class,
            //                 'type': 'emoji'
            //             }
            //             arr.push(text_obj)
            //             arr.push(emoji_obj)
            //             prev_pos = x
            //         }
            //         arr.push({
            //             'value': msg_data.text.substring(prev_pos, msg_data.text.length),
            //             'type': 'text'
            //         })
            //         // this.message_array = arr
            //         return arr
            //     } else {
            //         // this.message_array = msg_data.text
            //         return msg.data.text
            //     }
            // },
        },
    }

</script>