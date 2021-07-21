<template>
  <section class="form">
    <div class="fields">
      <input v-model="name" type="text" />
      <input v-model="surname" type="text" />
      <input v-model="phone" type="text" />
      <textarea v-model="content" cols="30" rows="10"></textarea>
    </div>
    <div class="submit">
      <button @click="createPost()">Create</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      surname: '',
      phone: '',
      content: '',
    }
  },
  methods: {
    createPost() {
      const data = {
        name: this.name,
        surname: this.surname,
        phone: this.phone,
        content: this.content,
      }
      this.$axios.post('/api', data)
      this.name = ''
      this.surname = ''
      this.phone = ''
      this.content = ''
    },
  },
}
</script>

<style scoped>
.form {
  display: flex;
  align-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
}
.fields {
  display: flex;
  align-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: column;
}

p {
  text-align: left;
}
</style>
