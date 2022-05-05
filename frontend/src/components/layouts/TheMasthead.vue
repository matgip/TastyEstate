<!-- @format -->

<template>
  <nav id="masthead">
    <div id="title" @click="gotoHome">
      <img src="@/assets/logo.png" />
    </div>

    <ul class="masthead__menu">
      <li class="masthead__menu__item">
        <base-button
          v-if="user == null"
          :btn-props="btnProps"
          :icon-props="iconProps"
          :on-click="gotoLogin"
          :icon="'fas fa-user-lock'"
          :button="'로그인'"
        />
        <base-button
          v-else
          :btn-props="btnProps"
          :icon-props="iconProps"
          :on-click="onLogout"
          :icon="'fas fa-sign-out-alt'"
          :button="'로그아웃'"
        />
      </li>
      <li class="masthead__menu__item">
        <base-button
          :btn-props="btnProps"
          :icon-props="iconProps"
          :on-click="gotoHome"
          :icon="'fas fa-home'"
          :button="'홈'"
        />
      </li>
    </ul>

    <!-- Toggle button -->
    <button class="masthead__toggle-btn" @click="toggleMastheadMenu">
      <i class="fas fa-bars"></i>
    </button>
  </nav>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    BaseButton,
  },

  data() {
    return {
      // Vuetify CSS Style & Props
      btnProps: {
        color: "deep-orange",
        depressed: true,
        plain: true,
        "x-small": true,
      },
      iconProps: {
        left: true,
      },
    };
  },

  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
  },

  methods: {
    gotoLogin() {
      this.$router.push({ path: "/login" });
    },
    gotoHome() {
      this.$router.push({ path: "/" });
    },
    async onLogout() {
      await this.$store.dispatch("logout", "kakao");
      this.gotoHome();
    },
    toggleMastheadMenu() {
      const mastheadMenu = document.querySelector(".masthead__menu");
      mastheadMenu.classList.toggle("open");
    },
  },
};
</script>

<style scoped>
#title {
  color: #ff5722;
  cursor: pointer;
  font-style: oblique;
  font-size: 24px;
  font-weight: 500;
}

#masthead {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: white;
  align-items: flex-start;
  flex-direction: column;
  color: var(--color-light-white);
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0;
}

.masthead__menu {
  flex-direction: column;
  text-align: center;
  width: 100%;
  display: none;
}

.masthead__menu.open {
  display: block;
}

.masthead__menu__item {
  padding: 12px 12px;
  margin-right: 20px;
  cursor: pointer;
  border-top: 1px solid #e0e0e0;
  border-radius: 0;
}

.masthead__toggle-btn {
  position: absolute;
  right: 32px;
  font-size: 24px;
  color: var(--color-orange);
  display: block;
}
</style>
