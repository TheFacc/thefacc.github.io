<template>
  <div class="mycode" :class="{ 'language-cpp': language == 'C++' }">
    <div
      v-if="language"
      class="d-flex language-text"
      :style="{ background: languageBackground, color: languageColor }"
    >
      <span>{{ language }}</span>
    </div>
    <div v-if="filename" class="filename-text">
      <span>{{ filename }}</span>
    </div>
    <!-- <code> -->
    <slot />
    <!-- <Markdown :use="$slots.default" unwrap="p" /> -->
    <!-- </code> -->
  </div>
</template>

<script>
// credits https://mokkapps.de/blog/how-to-create-a-custom-code-block-with-nuxt-content-v2/
export default {
  props: {
    language: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: '',
    },
    filename: {
      type: String,
      default: '',
    },
    highlights: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      languageMap: {
        vue: {
          text: 'vue',
          background: '#42b883',
          color: 'white',
        },
        js: {
          text: 'js',
          background: '#f7df1e',
          color: 'black',
        },
        'C++': {
          text: 'C++',
          background: '#3f51b5',
          color: 'white',
        },
      },
    }
  },
  computed: {
    languageText() {
      return this.language ? this.languageMap[this.language].text : null
    },
    languageBackground() {
      return this.language ? this.languageMap[this.language].background : null
    },
    languageColor() {
      return this.language ? this.languageMap[this.language].color : null
    },
  },
}
</script>

<style scoped>
/* code block */
.mycode {
  color: #ccc;
  background: #2d2d2d;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  position: relative;
  padding: 25px 20px;
  padding-top: 0;
  margin: 0.5em 0;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow: hidden;
  border-radius: 0.5rem;
}

/* props */
.language-text {
  position: absolute;
  top: 0;
  right: 1em;
  padding: 0.25em 0.5em;
  font-size: 14px;
  text-transform: uppercase;
  border-bottom-right-radius: 0.25em;
  border-bottom-left-radius: 0.25em;
}
.filename-text {
  position: absolute;
  top: 0;
  left: 1em;
  padding: 0.25em 0.5em;
  color: white;
  font-size: 14px;
}

/* custom tag colors (e.g. rr=red, rrh=red highlighted)*/
rr {
  color: #f38d8d;
}
rrh {
  color: black;
  background-color: #f38d8d;
}
oo {
  color: #febe8c;
}
ooh {
  color: black;
  background-color: #febe8c;
}
gg {
  color: #96e95b;
}
ggh {
  color: black;
  background-color: #96e95b;
}
bb {
  color: #68b5e9;
}
bbh {
  color: black;
  background-color: #68b5e9;
}
pp {
  color: #ba94d1;
}
pph {
  color: black;
  background-color: #ba94d1;
}
cc {
  color: #777;
}
cch {
  color: black;
  background-color: #777;
}
ww {
  color: white;
}
wwh {
  color: black;
  background-color: white;
}
uu {
  text-decoration: underline;
}
bold {
  color: #95c9eb;
  font-weight: 900;
}
</style>
