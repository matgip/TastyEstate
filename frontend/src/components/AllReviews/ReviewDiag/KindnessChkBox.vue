<template>
  <div>
    <base-chk-box :title="title" :prop-select="propKindness" :items="items" :update-cmd="updateCmd" />
  </div>
</template>

<script>
import BaseChkBox from "@/common/BaseChkBox.vue";

export default {
  props: {
    propKindness: {
      type: String,
    },
  },
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
  components: {
    BaseChkBox,
  },
};
</script>
