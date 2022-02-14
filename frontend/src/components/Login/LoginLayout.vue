<template>
  <div>
    <v-container fluid>
      <!-- Align Login buttons to center -->
      <v-layout column align-center justify-center>
        <v-flex>
          <!-- buttons are here... -->
          <slot />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
