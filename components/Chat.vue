<template>
  <div class="chat">
    <transition name="chat">
      <div v-if="chatOpen" class="chat-container">
        <div id="chat-window" class="chat-window">
          <transition-group name="message">
            <div
              v-for="(message, messageIndex) of chatList"
              :key="`message-${messageIndex}`"
              class="message"
              :class="{ sender: message.sender }"
            >
              <div class="message-content" :class="{ sender: message.sender }">
                {{ message.content }}
              </div>
            </div>
          </transition-group>
        </div>
        <input
          v-model="messageToSend"
          type="text"
          placeholder="Ask me something!"
          @keypress.enter="sendMessage"
        />
        <span class="underline"></span>
      </div>
    </transition>
    <div class="chat-button" @click="chatOpen = !chatOpen">
      <img src="https://img.icons8.com/ios-filled/452/chat--v1.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      messageToSend: '',
      chatOpen: true,
    }
  },
  methods: {
    sendMessage() {
      const { WebSocketEventBus } = require('mmcc/WebSocketEventBus')
      this.$store.commit('addMessage', {
        sender: false,
        content: this.messageToSend,
      })
      const packet = {
        message: { type: 'data', payload: { data: this.messageToSend } },
        configurationId: process.env.configurationId,
      }
      WebSocketEventBus.$emit('send', packet)
      this.messageToSend = ''
    },
  },
}
</script>

<style scoped>
.chat-button {
  height: 60px;
  width: 60px;
  bottom: 10px;
  right: 10px;
  border-radius: 100%;
  padding: 10px;
  float: right;
  position: fixed;
  background: #3f51b5;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  transition: 0.2s;
}
.chat-button:hover {
  cursor: pointer;
  transform: scale(1.05);
  transform-origin: bottom right;
}
.chat-button img {
  width: 100%;
  filter: invert(1);
}
.chat-container {
  position: fixed;
  z-index: 10000;
  height: 500px;
  width: 300px;
  bottom: 80px;
  right: 0px;
  background: rgb(255 255 255 / 50%);
  backdrop-filter: blur(20px);
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}
.chat-window {
  overflow-y: scroll;
  height: calc(100% - 34px);
  display: flex;
  flex-direction: column-reverse;
}
.message {
  width: calc(100% - 8px);
  display: flex;
  justify-content: flex-end;
  transform-origin: bottom right;
}
.message.sender {
  justify-content: flex-start;
  transform-origin: bottom left;
}
.message-content {
  padding: 5px 10px;
  margin: 4px;
  width: auto;
  background: #f3f3f3;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
}
.message-content.sender {
  background: black;
  color: white;
  border: 1px solid black;
}
.chat-container input {
  position: absolute;
  width: 90%;
  margin: 0 10px;
  padding: 5px 10px;
  border: 0;
  border-bottom: 1px solid grey;
  border-radius: 10px;
}
.chat-container input:focus-visible,
.chat-container input:focus {
  outline: none;
}

/* <transitions> */
.chat-enter,
.chat-leave-to {
  opacity: 0;
  transform: scale(0.5, 0) translateY(30px);
  transform-origin: bottom right;
}
.chat-leave-active,
.chat-enter-active {
  transition: 0.5s ease;
}
.message-enter,
.message-leave-to {
  opacity: 0.5;
  transform: scale(0);
}
.message-leave-active,
.message-enter-active {
  transition: 0.2s ease;
}
</style>
