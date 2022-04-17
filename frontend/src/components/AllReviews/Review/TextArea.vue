<template>
  <div>
    <v-list-item>
      <!-- Only emit event when textarea is blurred -->
      <v-container>
        <v-row>
          <v-textarea v-bind="titleProps" :value="title" v-on:blur="emitTitle" />
        </v-row>
        <v-row>
          <v-textarea v-bind="textAreaProps" :value="text" v-on:blur="emitText" />
        </v-row>
      </v-container>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    propTitle: {
      type: String,
      required: true,
    },
    propText: {
      type: String,
      required: true,
    },
  },
  computed: {
    title: {
      get() {
        return this.propTitle;
      },
    },
    text: {
      get() {
        return this.propText;
      },
    },
  },
  methods: {
    emitTitle(event) {
      this.$emit("reviewTitle", event.target.value);
    },
    emitText(event) {
      this.$emit("reviewText", event.target.value);
    },
  },
  data: () => ({
    // Vuetify CSS Style & Props
    titleProps: {
      filled: true,
      class: "mt-4",
      rows: "1",
      label: "한줄 요약을 남겨주세요",
      "row-height": "15",
    },
    textAreaProps: {
      filled: true,
      counter: true,
      label: "자유롭게 리뷰를 남겨주세요!",
    },
  }),
};
</script>
