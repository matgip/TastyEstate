<template>
  <div>
    <v-list-item>
      <!-- Only emit event when textarea is blurred -->
      <v-textarea v-bind="textAreaProps" :value="text" v-on:blur="emitText"></v-textarea>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data: () => ({
    textAreaProps: {
      filled: true,
      label: "자유롭게 리뷰를 남겨주세요!",
    },
  }),
  props: {
    propText: {
      type: String,
      required: true,
    },
  },
  computed: {
    text: {
      get() {
        return this.propText;
      },
    },
  },
  methods: {
    emitText(event) {
      this.$emit("reviewText", event.target.value);
    },
  },
};
</script>
