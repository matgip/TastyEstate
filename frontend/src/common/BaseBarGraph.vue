<template>
  <div>
    <header class="title">{{ stat.title }}</header>
    <ul class="section-list" v-for="(category, i) in stat.categories" :key="i">
      <li class="section-list-item">
        <div class="section-list-item-category">{{ category }}</div>
        <div class="section-list-item-graph">
          <div class="section-list-item-graph-background">
            <div class="section-list-item-graph-bar" :style="`--color: ${stat.color}; width: ${stat.data[i]}%`"></div>
          </div>
        </div>
        <div class="section-list-item-graph-percent">{{ stat.data[i] }}%</div>
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
  font-size: 16px;
  font-weight: bold;
}
.title {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.section-list {
  display: table;
  width: 100%;
  table-layout: fixed;
  border-spacing: 0 8px;
  overflow: hidden;
  white-space: nowrap;
}

.section-list-item {
  display: table-row;
}

.section-list-item-category {
  display: table-cell;
  font-size: 12px;
  margin-right: 12px;
  width: 116px;
}

.section-list-item-graph {
  display: table-cell;
  width: 144px;
  padding-left: 12px;
  white-space: nowrap;
  vertical-align: middle;
}

.section-list-item-graph-background {
  height: 10px;
  background: #eee;
}

.section-list-item-graph-bar {
  position: relative;
  height: 10px;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: right;
  font-weight: 100;
  letter-spacing: 0ch;
  background-color: var(--color);
}

.section-list-item-graph-percent {
  display: table-cell;
  font-size: 12px;
  color: #111;
  vertical-align: middle;
  padding-left: 6px;
  padding-right: 1px;
  text-align: right;
}
</style>
