<template>
  <main class="container">
    <h1>Testpage</h1>
    <section>
      <p>Company locations, number, etc</p>
    </section>
    <contact-form></contact-form>
  </main>
</template>

<script>
import ContactForm from '~/components/ContactForm.vue'
export default {
  component: { ContactForm },
  mounted() {
    this.$store.commit('setTheme', '#3f51b5')
    this.$store.commit('setTitle', '')
    this.$store.commit('updateRoute', {
      title: 'Contact page',
      url: window.location.href,
    })
  },
}
</script>

<style scoped>
p {
  text-align: left;
}
</style>
