<template>
  <div>
    <base-chk-box :title="title" :prop-select="propContract" :items="items" :update-cmd="updateCmd" />
  </div>
</template>

<script>
import BaseChkBox from "@/common/BaseChkBox.vue";

export default {
  props: {
    propContract: {
      type: Boolean,
    },
  },
  data: () => ({
    title: "🤝 여기서 계약하셨나요?",
    items: [
      { value: true, text: "네. 여기서 계약했어요" },
      { value: false, text: "아니요. 여기서 계약 안했어요" },
    ],
    updateCmd: "UPDATE_CONTRACT",
  }),
  components: {
    BaseChkBox,
  },
};
</script>
