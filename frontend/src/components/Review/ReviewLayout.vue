<template>
  <div>
    <v-card>
      <v-card-title>
        <slot name="RealEstateName" />
      </v-card-title>

      <v-divider></v-divider>

      <slot name="Recommand" />

      <slot name="NotRecommand" />

      <v-card-actions>
        <v-spacer />
        <slot name="DiagBtns" />
      </v-card-actions>
    </v-card>
  </div>
</template>
