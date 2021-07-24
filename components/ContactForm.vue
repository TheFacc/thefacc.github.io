<template>
  <section id="contact">
    <div class="intro">
      <h1>Contact us</h1>
      <p>
        For any information, question, or to ask for a partnership, fill the
        contact form.<br />We'll be glad to reply within 48 working hours!
      </p>
    </div>
    <div class="icons">
      <div class="icon">
        <a href="mailto:contact@mou.be"
          ><img src="~/assets/icons/email.svg" alt="Send us an email"
        /></a>
        <span>Write us</span>
      </div>
      <div>or</div>
      <div class="icon">
        <a href="tel:+39800900313"
          ><img src="~/assets/icons/phone.svg" alt="Call us by phone"
        /></a>
        <span>Call us</span>
      </div>
    </div>
    <div class="fields">
      <div class="input-name" style="grid-area: name">
        <label for="name">Name</label>
        <input v-model="name" type="text" />
      </div>
      <div class="input-surname" style="grid-area: surname">
        <label for="surname">Surname</label>
        <input v-model="surname" type="text" />
      </div>
      <div class="input-email" style="grid-area: email">
        <label for="email">Email</label>
        <input v-model="email" type="text" />
      </div>
      <div class="input-phone" style="grid-area: phone">
        <label for="phone">Phone</label>
        <input v-model="phone" type="text" />
      </div>
      <div class="input-content" style="grid-area: content">
        <label for="content">Content</label>
        <textarea v-model="content" cols="30" rows="10"></textarea>
      </div>
    </div>
    <div class="submit">
      <button class="material-button raised dark ripple" @click="send()">
        Send
      </button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      phone: '',
      content: '',
    }
  },
  methods: {
    send() {
      const data = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
        content: this.content,
      }
      this.$axios.post('/api', data)
      this.name = ''
      this.surname = ''
      this.email = ''
      this.phone = ''
      this.content = ''
    },
  },
}
</script>

<style scoped>
.intro p {
  font-weight: 200;
  font-size: 18px;
}

/* MAIN (GRID) */
#contact {
  margin: 0;
  padding: 50px 10%;
  display: grid;
  /* grid-template-rows: 1fr 1fr 1fr; */
  gap: 30px 0px;
  grid-auto-flow: row;
  color: white;
  background: linear-gradient(
    to right,
    #e4032e,
    #47286d 40%,
    #47286d 60%,
    #e4032e
  );
  animation: wavedient 20s ease infinite;
  animation-direction: alternate;
  background-size: 400%;
}
@media screen and (min-width: 768px) {
  #contact {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'intro icons'
      'fields fields'
      'submit submit';
  }
}
@media screen and (max-width: 767px) {
  #contact {
    grid-template-columns: 1fr;
    grid-template-areas:
      'intro'
      'icons'
      'fields'
      'submit';
  }
}
.intro {
  grid-area: intro;
}
.icons {
  grid-area: icons;
}
.fields {
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  grid-area: fields;
}
@media screen and (min-width: 768px) {
  .fields {
    grid-template-rows: 0.6fr 0.6fr 2fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'name surname'
      'email phone'
      'content content';
  }
}
@media screen and (max-width: 767px) {
  .fields {
    grid-template-rows: 0.6fr 0.6fr 0.6fr 0.6fr 2fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      'name'
      'surname'
      'email'
      'phone'
      'content'
      'content';
  }
}
.submit {
  grid-area: submit;
  text-align: center;
}

/* ICONS */
.icons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  padding: 0 20px;
}
.icons img {
  width: 100px;
  height: 100px;
  padding: 15%;
  filter: invert(1);
  border: 5px solid rgba(0, 0, 0, 0.4);
  border-radius: 100%;
  transition: 0.5s;
}
.icons .icon {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icons .icon span {
  font-variant: small-caps;
  font-weight: 300;
}
.icons a:hover img {
  background: rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
  transition: 0s;
}
/* FIELDS (FLEX) */
.fields div {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.fields label {
  font-variant: small-caps;
  color: rgba(255, 255, 255, 0.8);
}
.fields input {
  height: 30px;
}
.fields input,
.fields textarea {
  width: 100%;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
  border: 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.4);
}
.fields input:focus,
.fields textarea:focus {
  border-bottom: 2px solid white;
}
</style>
