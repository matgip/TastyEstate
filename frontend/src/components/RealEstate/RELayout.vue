<template>
  <div>
    <v-card>
      <v-card-text>
        <slot name="REimg" />
        <div class="space"></div>
        <slot name="REimgUpload" />
      </v-card-text>

      <v-card-title>
        <slot name="REName" />
      </v-card-title>

      <v-card-text>
        <slot name="RERatings" />
      </v-card-text>

      <v-divider class="mx-4" />

      <v-card-text>
        <slot name="RELikes" />
        <slot name="REFeeds" />
      </v-card-text>

      <v-divider class="mx-4" />

      <v-card-text>
        <slot name="REInfo" />
      </v-card-text>
    </v-card>
  </div>
</template>
