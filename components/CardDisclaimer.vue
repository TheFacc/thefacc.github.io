<template>
  <v-card
    dark
    ref="disclaimer"
    class="mx-auto my-6 card-disclaimer rounded-xl"
    :style="{
      background: background,
      'background-size': '400%',
      'animation-duration': `${animationDuration}s`,
    }"
    max-width="670"
  >
    <v-card-text>
      <p v-if="title" class="text-overline">{{ title }}</p>
      <!-- SOURCE: polimi course notes -->
      <p v-if="short === 'Polimi course'" class="text-body-2">
        These notes are a collection of concepts mostly taken from the
        <boldh>‘{{ course }}’</boldh> course at Polytechnic University of Milan.
        Additional info might have been integrated from some other online
        resources. I'm simply publishing all the information I used to study for
        the exam, in the hope somebody will find it useful.
      </p>
      <!-- FORMAT: Q/A -->
      <p v-else-if="short === 'Q+A'" class="text-body-2">
        I like to learn in a schematic way. The content of this section will be
        presented in a clear and concise
        <boldh>Question-Answer format</boldh>. I personally find this format
        ideal for learning and memorizing information, as well as for reviewing
        the material. By breaking the information down into easily digestible
        chunks, it's easier for me to quickly grasp the key concepts and
        understand the relationships between them. Information might partially
        be repeated for the sake of completeness. <br />
      </p>
      <!-- WORDS AND COLORS: Acronyms -->
      <p v-else-if="short === 'Acronyms'" class="text-body-2">
        I make use of many (many!) <boldh>acronyms</boldh>, it helps me focus on
        the meaning of the sentence by making it visually shorter, and I hope
        they will not be disorienting for the casual reader. You can always find
        on the right a list of the acronyms used in the page, in alphabetical
        order. (Also, remember you can find all occurrences on page with
        <code>F3</code>)
      </p>
      <!-- WORDS AND COLORS: Colors legend -->
      <p v-if="title === 'Words and colors' && colors" class="text-body-2">
        I also use a special color coding for highlighting words or sentences.
        In this article:<br />
        <span v-for="(color, idx) in colors" :key="idx">
          <v-icon v-if="color === 'pro'" dense>mdi-check-circle-outline</v-icon>
          <v-icon v-if="color === 'con'" dense>mdi-close-circle-outline</v-icon>
          <bold :class="`text--primary h-${color}`">
            {{ colorsObject[color][0] }}
          </bold>
          : {{ colorsObject[color][1] }} <br />
        </span>
      </p>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      background: '#555',
      animationDuration: 30,
      colorsObject: {
        key: [
          'Key concept',
          'a very important concept, at the center of the attention',
        ],
        def: [
          'Definition',
          'the first time you find a new important word, its definition follows',
        ],
        ass: [
          'Assumption',
          'highlights some hypotheses that will be true for the content that follows',
        ],
        que: [
          'Question',
          'a question that we ask ourselves, the next aim is to answer that',
        ],
        res: ['Formula/Results', 'important formula, final result/answer'],
        exa: [
          'Example',
          'practical example of the theoretical concept just seen',
        ],
        pro: ['Pros', 'positive aspects'],
        con: ['Cons', 'negative aspects'],
      },
    }
  },
  props: {
    title: { type: String, default: '' },
    short: { type: String, default: '' },
    course: { type: String, default: '' },
    colors: { type: Array, default: () => [] },
  },
  mounted() {
    this.animationDuration = Math.floor(20 + Math.random() * 15)
    if (this.title === 'Source')
      this.background =
        'linear-gradient(to right, rgb(178, 0, 34), rgb(71, 40, 109) 40%, rgb(71, 40, 109) 60%, rgb(178 0 34)) 0% 0%'
    else if (this.title === 'Format')
      this.background =
        'linear-gradient(to right, rgb(0, 81, 166), rgb(40, 109, 93) 40%, rgb(40, 109, 93) 60%, rgb(0, 81, 166)) 0% 0%'
    else if (this.title === 'Words and colors') {
      this.animationDuration = Math.floor(10 + Math.random() * 10)
      this.background =
        'linear-gradient(to right, rgb(0 62 74), rgb(23 63 53) 30%, rgb(65 69 25) 50%, rgb(71 26 26) 70%, rgb(77 28 85)) 0% 0% / 400%'
    }
  },
}
</script>

<style scoped>
.card-disclaimer {
  color: white;
  animation: wavedient 30s ease infinite alternate;
  background-size: 400%;
}
boldh {
  background: rgb(0 0 0 / 30%);
}
</style>
