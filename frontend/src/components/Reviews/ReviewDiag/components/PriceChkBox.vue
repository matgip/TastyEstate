<template>
  <div>
    <base-chk-box :title="title" :prop-select="propPrice" :items="items" :update-cmd="updateCmd" />
  </div>
</template>

<script>
import BaseChkBox from "@/common/BaseChkBox.vue";

export default {
  props: {
    propPrice: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    title: "💵 중개 수수료는 어때요?",
    items: [
      { value: "veryExpensive", text: "10% 이상 비쌈" },
      { value: "expensive", text: "5~10% 더 비쌈" },
      { value: "avgPrice", text: "평균 가격" },
      { value: "cheap", text: "5~10% 더 쌈" },
      { value: "veryCheap", text: "10% 이상 쌈" },
    ],
    updateCmd: "UPDATE_PRICE",
  }),
  components: {
    BaseChkBox,
  },
};
</script>
