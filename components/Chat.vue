<template>
  <div ref="chat" class="chat" role="dialog">
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
        <div class="chat-bottom">
          <div>
            <input
              v-model="messageToSend"
              type="text"
              placeholder="Ask me something!"
              @keypress.enter="sendMessage"
            />
          </div>
          <!-- <div>
            <img
              src="~/assets/pin.svg"
              alt="Keep the chat open"
              title="Keep the chat open"
            />
          </div> -->
        </div>
      </div>
    </transition>

    <div
      :tooltip="chatOpen ? 'Close chat' : 'Need help? Talk to the bot!'"
      flow="left"
      class="chat-button"
      :class="{ bounce: animated }"
      @click="toggleChat"
      @animationend="animated = false"
    >
      <img
        src="~/assets/icons/chat.svg"
        alt="Open chatbot"
        title="Open chatbot"
      />
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
      chatOpen: false,
      animated: false,
    }
  },
  mounted() {
    // listen to page clicks to close chat if outside
    document.addEventListener('click', (e) =>
      this.hideOnClickOutside(this.$refs.chat)
    )
  },
  methods: {
    toggleChat() {
      // Toggle chat
      this.chatOpen = !this.chatOpen
      // Enable bounce animation
      this.animated = true
    },
    hideOnClickOutside(element) {
      const outsideClickListener = (event) => {
        if (this.chatOpen && !element.contains(event.target)) {
          this.toggleChat()
          removeClickListener()
        }
      }
      const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener)
      }
      document.addEventListener('click', outsideClickListener)
    },
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
/* BUTTON */
.chat-button {
  height: 60px;
  width: 60px;
  bottom: 10px;
  right: 10px;
  border-radius: 100%;
  border-bottom-right-radius: 15px;
  padding: 10px;
  float: right;
  position: fixed;
  z-index: 10000;
  background: #3f51b5;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  transition: 0.2s;
}
.chat-button:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.chat-button img {
  width: 100%;
  height: 40px;
  filter: invert(1);
}

/* BOX */
.chat-container {
  position: fixed;
  z-index: 10000;
  height: 400px;
  width: 300px;
  bottom: 80px;
  right: 5px;
  background: rgb(255 255 255 / 50%);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}
.chat-window {
  overflow-y: scroll;
  height: calc(100% - 34px);
  display: flex;
  flex-direction: column-reverse;
}
.chat-window span {
  transition: height 1s;
}

/* MESSAGE */
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
  background: white;
  color: black;
  border-radius: 4px;
}
.message-content.sender {
  background: rgba(0, 0, 0, 0.7);
  color: white;
}
.message-content:not(.sender) {
  box-shadow: 1px 1px 2px rgb(0 0 0 / 60%);
}

/* BOTTOM */
.chat-bottom {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
}
/* input */
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
  transform: scale(0.3, 0.1) translate(50px, 30px);
  transform-origin: bottom right;
}
.chat-leave-active,
.chat-enter-active {
  transition: 0.5s ease;
}
.message-enter,
.message-leave-to {
  opacity: 0;
  height: 0px;
  /* transform: scale(0); */
}
.message-enter-to {
  height: 30px;
}
.message-leave-active,
.message-enter-active {
  transition: 0.2s ease;
}
.message-enter-active.sender {
  transition-delay: 0.2s;
}
</style>
