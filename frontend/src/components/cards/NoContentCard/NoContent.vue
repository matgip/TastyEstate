<template>
  <div>
    <div class="no-result_container">
      <div class="no-result_title">
        앗! 검색 결과가 없어요
      </div>
      <img src="@/assets/images/no_search_result.png" width="120" height="120" />
      <div class="no-result_tips">
        이건 어때요?
        <ul>
          <li>키워드를 정확하게 입력하셨는지 확인해보세요.</li>
          <li>키워드를 다르게 검색해보세요. (예 : 신원로 251-2 근처 부동산)</li>
        </ul>
      </div>
    </div>

    <div class="add-agency_container">
      <div class="add-agency_title">
        공인중개사무소 등록하기
      </div>
      <div class="add-agency_content">
        <div>새로운 수정된 중개업소 장소를 알고 계신가요?</div>
        <div>장소 제보는 서비스 품질 향상에 큰 도움이 됩니다.</div>
      </div>
      <div class="add-agency_button">
        <base-button :btn-props="vuetifyBaseButton" :on-click="onAddAgencyInfo" :button="'신규 부동산 등록'" />
        <base-button :btn-props="vuetifyBaseButton" :on-click="onChangeAgencyInfo" :button="'지도 정보 수정'" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

export default {
  components: {
    BaseButton,
  },

  data() {
    return {
      vuetifyBaseButton: {
        class: "mr-1",
        color: "deep-orange",

        depressed: true,
        outlined: true,
        plain: true,

        "x-small": true,
      },
    };
  },

  methods: {
    onAddAgencyInfo() {
      console.log("On add agency info");
    },

    onChangeAgencyInfo() {
      console.log("On change agency info");
    },
  },
};
</script>

<style scoped>
.no-result_container {
  margin: 10px;
  text-align: center;
}

.no-result_title {
  margin-top: 10px;

  font-size: 20px;
  font-weight: 500;
}

.no-result_tips {
  text-align: start;

  padding: 10px 10px;
  margin: 0 10px 10px 10px;

  background-color: #e0e0e0;

  font-size: 14px;

  border-radius: 4px;
}

.no-result_tips ul {
  margin-top: 10px;

  list-style-type: disc;
}

.add-agency_container {
  text-align: start;

  margin: 50px 10px 10px 10px;
}

.add-agency_title {
  font-weight: bold;
}

.add-agency_content {
  font-size: 12px;
  color: gray;
}

.add-agency_button {
  margin-top: 2px;
}
</style>
