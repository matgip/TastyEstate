<template>
  <div>
    <v-dialog v-model="dialog" v-bind="dialogProps">
      <template #activator="{ on }">
        <v-btn :style="btnStyl" v-bind="btnProps" v-on="on">
          <v-icon v-bind="iconProps">
            {{ icon }}
          </v-icon>
          리뷰 작성
        </v-btn>
      </template>

      <!-- Only can see if dialog is true -->
      <v-card>
        <v-card-title>
          <div>🏠 {{ estate.place_name }}</div>
        </v-card-title>

        <v-divider />
        <!-- Rating -->
        <div>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>🌟 평점을 남겨주세요</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-rating v-bind="starProps" v-model="rating"></v-rating>
            <span v-bind="textProp"> ({{ rating }}) </span>
          </v-list-item>
        </div>

        <!-- check-box -->
        <div v-for="chkbox in chkBoxes" :key="chkbox.name">
          <v-divider />
          <base-check-box-group :check-box-object="chkbox" :on-change="onChangeCheckbox" />
        </div>
        <v-divider />

        <v-list-item>
          <v-container>
            <!-- review title -->
            <v-row>
              <v-textarea v-bind="titleProps" v-model="title" />
            </v-row>
            <!-- review comments -->
            <v-row>
              <v-textarea v-bind="textAreaProps" v-model="comments" />
            </v-row>
          </v-container>
        </v-list-item>

        <v-card-actions>
          <v-spacer />
          <div>
            <base-button :btn-props="submitBtnProps" :on-click="closeDiag" :button="'닫기'" />
            <base-button :btn-props="submitBtnProps" :on-click="onSubmit" :button="'리뷰 등록하기'" />
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import BaseCheckBoxGroup from "../../common/BaseCheckBoxGroup.vue";
import BaseButton from "../../common/BaseButton.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    BaseCheckBoxGroup,
    BaseButton,
  },

  data: () => ({
    chkBoxes: [
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
    // Vuetify CSS Style & Props
    btnStyl: {
      margin: "34px 0",
    },
    dialogProps: {
      persistent: true,
      "max-width": "700px",
    },
    btnProps: {
      color: "deep-orange",
      outlined: true,
      rounded: true,
    },
    icon: "fas fa-edit",
    iconProps: {
      left: true,
    },
    textProp: {
      class: "grey--text text-caption mr-2",
    },
    starProps: {
      size: 18,
      color: "amber",
      dense: true,
      "half-increments": true,
    },
    titleProps: {
      filled: true,
      class: "mt-4",
      rows: "1",
      label: "한줄 요약을 남겨주세요",
      "row-height": "15",
    },
    textAreaProps: {
      filled: true,
      counter: true,
      label: "자유롭게 리뷰를 남겨주세요!",
    },
    submitBtnProps: {
      class: "ma-2",
      color: "deep-orange",
      outlined: true,
      rounded: true,
      text: true,
    },
  }),

  computed: {
    ...mapGetters({
      estate: "GET_ESTATE",
      user: "GET_USER",
    }),
  },

  methods: {
    async onSubmit() {
      try {
        const resp = await this.$api.review.get({ baseId: this.estate.id, subIds: [this.user.id] });
        if (resp && resp.status === 204) {
          const current = new Date();
          // Fix-me: Depeding on kakao profile, needed to decouple
          await this.$api.review.post({
            baseId: this.estate.id,
            data: {
              userId: this.user.id,
              avatar: this.user.avatar,
              nickname: this.user.nickname,
              time: current.toLocaleDateString(),
              rating: this.rating,
              kindness: this.chkBoxes[0].select,
              price: this.chkBoxes[1].select,
              contract: this.chkBoxes[2].select,
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

    onChangeCheckbox(name, newSelect) {
      const index = this.chkBoxes.findIndex((chkBox) => {
        return chkBox.name === name;
      });
      this.chkBoxes[index].select = newSelect;
    },

    closeDiag() {
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
