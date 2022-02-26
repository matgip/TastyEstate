<template>
  <div>
    <v-card>
      <v-card-title>
        <slot name="RealEstateName" />
      </v-card-title>

      <v-card-actions>
        <v-spacer />
        <slot name="ReviewBtns" />
      </v-card-actions>
    </v-card>
  </div>
</template>
