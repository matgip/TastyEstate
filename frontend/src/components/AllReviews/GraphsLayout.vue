<template>
  <div>
    <v-divider />

    <v-container>
      <v-row>
        <v-col>
          <slot name="KindnessGraph" />
        </v-col>

        <v-col>
          <slot name="PriceGraph" />
        </v-col>

        <v-col>
          <slot name="ContractGraph" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
