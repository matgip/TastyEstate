<template>
  <div>
    <header class="title">{{ stat.title }}</header>
    <ul class="section_list" v-for="(category, i) in stat.categories" :key="i">
      <li class="section_list_item">
        <div class="section_list_item_category">{{ category }}</div>

        <div class="section_list_item_graph">
          <div class="section_list_item_graph_background">
            <div class="section_list_item_graph_bar" :style="`--color: ${stat.color}; width: ${stat.data[i]}%`"></div>
          </div>
        </div>

        <div class="section_list_item_graph_percent">{{ stat.data[i] }}%</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    stat: {
      type: Object,
      required: true,
      validator: function(obj) {
        if (!obj.data || !obj.categories || !obj.title || !obj.color) return false;
        return true;
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.v-application .title {
  font-weight: bold;
}
.title {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 4px;
}

.section_list {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-spacing: 0 6px;
  overflow: hidden;
  white-space: nowrap;
}

.section_list_item {
  display: table-row;
}

.section_list_item_category {
  display: table-cell;
  font-size: 12px;
  margin-right: 12px;
  width: 98px;
}

.section_list_item_graph {
  display: table-cell;
  width: 144px;
  padding-left: 12px;
  white-space: nowrap;
  vertical-align: middle;
}

.section_list_item_graph_background {
  height: 10px;
  background: #eee;
}

.section_list_item_graph_bar {
  position: relative;
  height: 10px;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: right;
  font-weight: 100;
  letter-spacing: 0ch;
  background-color: var(--color);
}

.section_list_item_graph_percent {
  display: table-cell;
  font-size: 12px;
  color: #111;
  vertical-align: middle;
  padding-left: 6px;
  padding-right: 10px;
  text-align: right;
}
</style>
