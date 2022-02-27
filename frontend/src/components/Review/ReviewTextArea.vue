<template>
  <div>
    <v-list-item>
      <v-textarea v-bind="textAreaProps" v-model="text" @blur="emitText"></v-textarea>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data: () => ({
    text: "",

    textAreaProps: {
      filled: true,
      label: "자유롭게 리뷰를 남겨주세요!",
    },
  }),
  methods: {
    emitText() {
      this.$emit("reviewText", this.text);
    },
  },
};
</script>
