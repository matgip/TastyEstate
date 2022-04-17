<template>
  <div class="styled__EstateCard">
    <span><slot name="REimg"/></span>
    <span>
      <h3 class="styled__EstateCard__Elem"><slot name="REName" /></h3>
      <div class="styled__Divider"></div>
      <p class="styled__EstateCard__Elem"><slot name="REStars" /></p>
      <div class="styled__Divider"></div>
      <p class="styled__EstateCard__Elem"><slot name="REInfo" /></p>
      <div class="styled__Divider"></div>
      <p class="styled__EstateCard__Elem"><slot name="REALLReviews" /></p>
    </span>

    <!-- <v-card-text>
        <slot name="REimg" />
        <div class="space"></div>
        <slot name="REimgUpload" />
      </v-card-text>

      <v-card-title>
        <slot name="REName" />
      </v-card-title>

      <v-card-text>
        <slot name="REStars" />
      </v-card-text>

      <v-divider class="mx-4" />

      <v-card-text>
        <slot name="RELikes" />
        <slot name="REReview" />
        <slot name="REALLReviews" />
      </v-card-text>

      <v-divider class="mx-4" />

      <v-card-text>
        <slot name="REInfo" />
      </v-card-text> -->
    <!-- </v-card> -->
  </div>
</template>

<style>
.styled__EstateCard {
  margin: 16px 15px;
  display: flex;
}

.styled__EstateCard__Elem {
  margin: 4px 8px;
  font-size: 12px;
  /* margin-left: 8px;
  margin-bottom: 8px; */
}

.styled__Divider {
  border-top: 1px solid #e0e0e0;
  border-radius: 0;
  margin: 0px 4px;
}
/* .styled__ImgWrap {
} */

.v-application p {
  margin-bottom: 0px;
}

.v-card {
  margin: 2px 2px;
}
</style>
