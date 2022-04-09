<template>
  <div>
    <v-card>
      <v-divider />

      <v-card-text>
        <slot name="UserProfile" />
      </v-card-text>

      <v-card-text>
        <v-row align="center">
          <slot name="Rating" />
          <slot name="Likes" />
        </v-row>
      </v-card-text>

      <v-card-title>
        <slot name="Title" />
      </v-card-title>

      <v-card-text>
        <slot name="Content" />
      </v-card-text>

      <v-divider />
    </v-card>
  </div>
</template>
