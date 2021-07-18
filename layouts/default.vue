<template>
  <div>
    <the-header></the-header>
    <Nuxt />
    <chat :chat-list="list" />
     <the-footer></the-footer>
  </div>
</template>

<script>
import Chat from '~/components/Chat'
import MMCCMixin from '~/mixins/mmcc-mixin'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
export default {
  components: {
    TheHeader,
    TheFooter,
    Chat,
     },
    mixins: [MMCCMixin],

}
</script>

<style></style>
