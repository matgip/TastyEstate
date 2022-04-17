<template>
  <div class="styled__EstateCard">
    <span><slot name="REimg"/></span>
    <span>
      <h3 class="styled__EstTitle"><slot name="REName" /></h3>
      <div class="styled__Divider"></div>
      <p class="styled__EstStar"><slot name="REStars" /></p>
      <p class="styled__EstInfo"><slot name="REInfo" /></p>
      <div class="styled__Divider"></div>
      <p class="styled__EstReview"><slot name="REALLReviews" /></p>
    </span>
  </div>
</template>

<style>
.styled__EstateCard {
  margin: 16px 15px;
  display: flex;
}

.styled__EstTitle {
  margin: 4px 8px;
}

.styled__EstStar {
  margin: 4px 8px;
  font-size: 12px;
}

.styled__EstInfo {
  margin: 8px 8px;
  font-size: 12px;
}

.styled__EstReview {
  margin: 4px 8px;
  font-size: 12px;
}

.styled__Divider {
  border-top: 1px solid #e0e0e0;
  border-radius: 0;
  margin: 4px 4px;
}

.v-application p {
  margin-bottom: 0px;
}
</style>
