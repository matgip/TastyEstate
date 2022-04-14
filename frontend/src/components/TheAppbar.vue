<template>
  <nav id="navbar">
    <div id="title" @click="gotoHome">
      <img src="@/assets/logo.png" />
    </div>

    <ul class="navbar__menu">
      <li class="navbar__menu__item">
        <BaseButton
          v-if="user.id == undefined"
          :btnProps="btnProps"
          :iconProps="iconProps"
          :method="gotoLogin"
          :icon="'fas fa-user-lock'"
          :button="'로그인'"
        />
        <BaseButton
          v-else
          :btnProps="btnProps"
          :iconProps="iconProps"
          :method="onLogout"
          :icon="'fas fa-sign-out-alt'"
          :button="'로그아웃'"
        />
      </li>
      <li class="navbar__menu__item">
        <BaseButton
          :btnProps="btnProps"
          :iconProps="iconProps"
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
      if (this.isloggedIn() == false) {
        return;
      }
      try {
        await this.logoutKakao();
        this.$store.commit("UPDATE_USER", {});
        this.gotoLogin();
        alert("정상적으로 로그아웃 하였습니다.");
      } catch (err) {
        console.error(err);
        alert("로그아웃 실패.");
      }
    },
    logoutKakao() {
      return new Promise((resolve, reject) => {
        window.Kakao.Auth.logout((res) => {
          console.log(res);
          if (res == true) {
            resolve();
          } else {
            reject(new Error("Failed to kakao logout"));
          }
        });
      });
    },
    isloggedIn() {
      return this.user.id != undefined;
    },
    toggleNavbarMenu() {
      const navbarMenu = document.querySelector(".navbar__menu");
      navbarMenu.classList.toggle("open");
    },
  },
  data() {
    return {
      // Vuetify CSS style props
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

/* Navbar */
#navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  align-items: center;
  color: var(--color-light-white);
  padding: 12px;
  transition: all var(--animation-duration) ease-in-out;
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
}
</style>
