<template>
  <div>
    <BaseChkBox :title="title" :propSelect="propKindness" :items="items" :updateCmd="updateCmd" />
  </div>
</template>

<script>
import BaseChkBox from "@/common/BaseChkBox.vue";

export default {
  data: () => ({
    title: "😀 사장님이 친절하셨나요?",
    items: [
      { value: "veryKind", text: "매우 친절" },
      { value: "kind", text: "친절" },
      { value: "soso", text: "보통" },
      { value: "unKind", text: "불친절" },
      { value: "veryUnkind", text: "매우 불친절" },
    ],
    updateCmd: "UPDATE_KINDNESS",
  }),
  props: {
    propKindness: {
      type: String,
      required: true,
    },
  },
  components: {
    BaseChkBox,
  },
};
</script>
