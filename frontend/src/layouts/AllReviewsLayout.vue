<template>
  <div>
    <v-card>
      <v-divider />

      <v-card-text>
        <slot name="user-profile" />
      </v-card-text>

      <v-card-text>
        <v-row align="center">
          <slot name="review-stars" />
          <slot name="review-likes" />
        </v-row>
      </v-card-text>

      <v-card-title>
        <slot name="review-title" />
      </v-card-title>

      <v-card-text>
        <slot name="review-contents" />
      </v-card-text>

      <v-divider />
    </v-card>
  </div>
</template>
