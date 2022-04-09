<template>
  <div>
    <BaseBarGraph :data="data" :categories="categories" :title="title" :colors="colors" />
  </div>
</template>

<script>
import BaseBarGraph from "@/common/BaseBarGraph.vue";

export default {
  components: {
    BaseBarGraph,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      categories: ["10% 이상 쌈", "5~10% 더 쌈", "평균 가격", "5~10% 더 비쌈", "10% 이상 비쌈"],
      title: "가격",
      colors: ["#BA68C8"],
    };
  },
};
</script>
