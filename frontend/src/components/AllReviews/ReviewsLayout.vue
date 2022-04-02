<template>
  <div>
    <v-card>
      <v-card-text>
        <slot name="Avatar" />
      </v-card-text>

      <v-card-text>
        <slot name="Rating" />
      </v-card-text>

      <v-card-text>
        <slot name="Likes" />
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
