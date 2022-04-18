<!-- @format -->

<template>
  <nav id="navbar">
    <div id="title" @click="gotoHome">
      <img src="@/assets/logo.png" />
    </div>

    <ul class="navbar__menu">
      <li class="navbar__menu__item">
        <base-button
          v-if="user == null"
          :btn-props="btnProps"
          :icon-props="iconProps"
          :method="gotoLogin"
          :icon="'fas fa-user-lock'"
          :button="'로그인'"
        />
        <base-button
          v-else
          :btn-props="btnProps"
          :icon-props="iconProps"
          :method="onLogout"
          :icon="'fas fa-sign-out-alt'"
          :button="'로그아웃'"
        />
      </li>
      <li class="navbar__menu__item">
        <base-button
          :btn-props="btnProps"
          :icon-props="iconProps"
          :method="gotoHome"
          :icon="'fas fa-home'"
          :button="'홈'"
        />
      </li>
    </ul>

    <!-- Toggle button -->
    <button class="navbar__toggle-btn" @click="toggleNavbarMenu">
      <i class="fas fa-bars"></i>
    </button>
  </nav>
</template>

<script>
import BaseButton from "@/common/BaseButton.vue";

import { mapGetters } from "vuex";

export default {
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
    toggleNavbarMenu() {
      const navbarMenu = document.querySelector(".navbar__menu");
      navbarMenu.classList.toggle("open");
    },
  },
  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
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
  components: {
    BaseButton,
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

#navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  align-items: center;
  color: var(--color-light-white);
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0;
}

.navbar__menu {
  display: flex;
}

.navbar__menu__item {
  padding: 12px 12px;
  margin: 0px 4px;
  cursor: pointer;
  border-radius: var(--size-border-radius);
}

.navbar__toggle-btn {
  position: absolute;
  right: 32px;
  font-size: 24px;
  color: var(--color-orange);
  display: none;
}

@media screen and (max-width: 768px) {
  .navbar__toggle-btn {
    display: block;
  }

  #navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar__menu {
    flex-direction: column;
    text-align: center;
    width: 100%;
    display: none;
  }

  .navbar__menu.open {
    display: block;
  }

  .navbar__menu__item {
    border-top: 1px solid #e0e0e0;
    border-radius: 0;
  }
}
</style>
