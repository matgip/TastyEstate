<template>
  <div>
    <v-divider />

    <v-container fluid>
      <v-row>
        <v-col>
          <slot name="KindnessGraph" />
        </v-col>
        <v-col>
          <slot name="PriceGraph" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
