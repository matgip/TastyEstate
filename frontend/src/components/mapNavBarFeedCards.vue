<template>
  <div>
    <v-card>
      <!-- Detail information of person who sell the estate -->
      <v-list-item>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>차지연</v-list-item-title>
          <v-list-item-subtitle>8시간 전</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Detail information of estate such as price or area -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>매매 100억</v-list-item-title>
          <v-list-item-subtitle>대지 141평</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
