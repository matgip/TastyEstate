<template>
  <div>
    <v-divider />

    <v-container>
      <v-row>
        <v-col>
          <slot name="kindness-graph" />
        </v-col>

        <v-col>
          <slot name="price-graph" />
        </v-col>

        <v-col>
          <slot name="contract-graph" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
