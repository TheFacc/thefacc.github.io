<template>
  <main class="container">
    <header>
      <h1>Form</h1>
    </header>
    <section>
      <div class="form">
        <input v-model="title" type="text" />
        <textarea v-model="content" cols="30" rows="10"></textarea>
        <button @click="createPost()">Create</button>
      </div>
    </section>
  </main>
</template>

<script>
// export default {}
export default {
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    createPost() {
      const data = {
        title: this.title,
        content: this.content,
      }
      this.$axios.post('/api', data)
      this.title = ''
      this.content = ''
    },
  },
}
</script>

<style scoped>
h2 {
  margin-bottom: 30px;
}
h4 {
  margin-bottom: 30px;
}
img {
  max-width: 600px;
}
p {
  text-align: left;
}
</style>
