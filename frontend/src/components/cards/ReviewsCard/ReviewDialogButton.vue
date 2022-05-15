<template>
  <div>
    <v-dialog v-model="dialog" v-bind="vuetifyDialog">
      <template #activator="{ on }">
        <v-btn :style="btnStyl" v-bind="vuetifyButton" v-on="on">
          <v-icon v-bind="vuetifyButtonIcon">
            {{ reviewButtonIcon }}
          </v-icon>
          리뷰 작성
        </v-btn>
      </template>

      <!-- dialog === true인 경우에만 화면 출력 -->
      <v-card>
        <v-card-title>
          <div>🏠 {{ agency.place_name }}</div>
        </v-card-title>

        <v-divider />

        <!-- 리뷰 평점 -->
        <div>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>🌟 평점을 남겨주세요</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-rating v-bind="vuetifyRating" v-model="rating"></v-rating>
            <span v-bind="vuetifyRatingText"> ({{ rating }}) </span>
          </v-list-item>
        </div>

        <!-- 리뷰 체크 박스 -->
        <div v-for="chkbox in checkBoxes" :key="chkbox.name">
          <v-divider />
          <BaseCheckBoxGroup :check-box-object="chkbox" :on-change="handleChangeCheckBoxEvent" />
        </div>
        <v-divider />

        <v-list-item>
          <v-container>
            <!-- 리뷰 제목 -->
            <v-row>
              <v-textarea v-bind="vuetifyReviewTitle" v-model="title" />
            </v-row>
            <!-- 리뷰 내용 -->
            <v-row>
              <v-textarea v-bind="vuetifyReviewContent" v-model="comments" />
            </v-row>
          </v-container>
        </v-list-item>

        <!-- 리뷰 등록하기 -->
        <v-card-actions>
          <v-spacer />
          <div>
            <BaseButton :btn-props="vuetifySubmitButton" :on-click="closeDialog" :button="'닫기'" />
            <BaseButton :btn-props="vuetifySubmitButton" :on-click="onSubmit" :button="'리뷰 등록하기'" />
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BaseCheckBoxGroup from "@/common/BaseCheckBoxGroup.vue";
import BaseButton from "@/common/BaseButton.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    BaseCheckBoxGroup,
    BaseButton,
  },

  data: () => ({
    checkBoxes: [
      {
        name: "kindness",
        select: null,
        title: "😀 사장님이 친절하셨나요?",
        items: [
          { value: "veryKind", text: "매우 친절" },
          { value: "kind", text: "친절" },
          { value: "soso", text: "보통" },
          { value: "unKind", text: "불친절" },
          { value: "veryUnkind", text: "매우 불친절" },
        ],
      },
      {
        name: "price",
        select: null,
        title: "💵 중개 수수료는 어때요?",
        items: [
          { value: "veryExpensive", text: "10% 이상 비쌈" },
          { value: "expensive", text: "5~10% 더 비쌈" },
          { value: "avgPrice", text: "평균 가격" },
          { value: "cheap", text: "5~10% 더 쌈" },
          { value: "veryCheap", text: "10% 이상 쌈" },
        ],
      },
      {
        name: "contract",
        select: null,
        title: "🤝 여기서 계약하셨나요?",
        items: [
          { value: true, text: "네. 여기서 계약했어요" },
          { value: false, text: "아니요. 여기서 계약 안했어요" },
        ],
      },
    ],
    rating: 0.0,
    dialog: false,
    title: "",
    comments: "",

    btnStyl: {
      margin: "34px 0",
    },
    vuetifyDialog: {
      persistent: true,
      "max-width": "700px",
    },
    vuetifyButton: {
      color: "deep-orange",
      outlined: true,
      rounded: true,
    },
    reviewButtonIcon: "fas fa-edit",
    vuetifyButtonIcon: {
      left: true,
    },
    vuetifyRatingText: {
      class: "grey--text text-caption mr-2",
    },
    vuetifyRating: {
      size: 18,
      color: "amber",
      dense: true,
      "half-increments": true,
    },
    vuetifyReviewTitle: {
      filled: true,
      class: "mt-4",
      rows: "1",
      label: "한줄 요약을 남겨주세요",
      "row-height": "15",
    },
    vuetifyReviewContent: {
      filled: true,
      counter: true,
      label: "자유롭게 리뷰를 남겨주세요!",
    },
    vuetifySubmitButton: {
      class: "ma-2",
      color: "deep-orange",
      outlined: true,
      rounded: true,
      text: true,
    },
  }),

  computed: {
    ...mapGetters({
      agency: "GET_ESTATE",
      user: "GET_USER",
    }),
  },

  methods: {
    async onSubmit() {
      try {
        const resp = await this.$api.review.get({ baseId: this.agency.id, subIds: [this.user.id] });
        if (resp && resp.status === 204) {
          const current = new Date();
          // TODO: Depending on kakao profile, needed to decouple
          await this.$api.review.post({
            baseId: this.agency.id,
            data: {
              userId: this.user.id,
              avatar: this.user.avatar,
              nickname: this.user.nickname,
              time: current.toLocaleDateString(),
              rating: this.rating,
              kindness: this.checkBoxes[0].select,
              price: this.checkBoxes[1].select,
              contract: this.checkBoxes[2].select,
              title: this.title,
              text: this.comments,
            },
          });
        }
        await this.$_clear();
      } catch (err) {
        console.error(err);
      }
    },

    handleChangeCheckBoxEvent(name, newSelect) {
      const index = this.checkBoxes.findIndex((chkBox) => {
        return chkBox.name === name;
      });
      this.checkBoxes[index].select = newSelect;
    },

    closeDialog() {
      this.dialog = false;
    },

    $_clear() {
      this.rating = 0.0;
      this.title = "";
      this.comments = "";
      this.dialog = false;
    },
  },
};
</script>
