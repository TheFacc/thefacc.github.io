<template>
  <footer role="footer">footer</footer>
</template>

<script>
export default {
  data() {
    return {
      menuOptions: [
        {
          name: 'Home',
          path: '/',
        },
        {
          name: 'Blog',
          path: '/blog',
        },
        {
          name: 'About',
          path: '/about',
        },
      ],
    }
  },
}
</script>

<style>
footer {
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  height: 100px;
  color: white;
  background: #222;
  text-align: center;
}
</style>
