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
.header {
  height: 70px;
  background: black;
  color: white;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.header-content {
  width: 100%;
  max-width: 800px;
  margin: auto;
  align-items: center;
}
.right {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  max-width: 50%;
}
.title {
  font-size: 1.3rem;
  margin-bottom: 5px;
}
</style>
