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
      categories: ["매우 친절", "친절", "보통", "불친절", "매우 불친절"],
      title: "친절함",
      colors: ["#4DD0E1"],
    };
  },
};
</script>
