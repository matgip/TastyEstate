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
  data: () => ({
    data: [70, 30],
    categories: ["여기서 계약했어요", "여기서 계약 안했어요"],
    title: "계약률",
    colors: ["#81C784"],
  }),
};
</script>
