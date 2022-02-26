<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>친절함</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item-group v-model="kindness">
      <template v-for="(item, i) in items">
        <v-list-item :key="`item-${i}`" :value="item" class="d-inline-flex">
          <template #default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active" :label="item" color="deep-purple accent-4" />
            </v-list-item-action>
          </template>
        </v-list-item>
      </template>
    </v-list-item-group>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: ["매우 친절", "친절", "보통", "불친절", "매우 불친절"],
    kindness: [""],
  }),
  methods: {},
};
</script>
