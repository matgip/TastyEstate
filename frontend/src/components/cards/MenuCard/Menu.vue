<template>
  <div class="dimmed">
    <div class="menu_container">
      <header class="menu_header_container">
        <v-icon @click="onCloseCard()" v-bind="vuetifyIcon">{{ fontAwesomeLeftArrow }}</v-icon>
        <h3>내 정보</h3>
        <v-icon @click="onEditUserProfile()" v-bind="vuetifyIcon">{{ fontAwesomeGear }}</v-icon>
      </header>
      <section>
        <div v-if="user" class="user_profile">
          <!-- User 정보 -->
          <span class="avatar">
            <v-avatar v-bind="vuetifyAvatar">
              <img :src="user.avatar" />
            </v-avatar>
          </span>
          <div class="user_info_container">
            <div class="user_info_nickname">{{ user.nickname }}</div>
            <div>{{ user.email }}</div>
          </div>
        </div>

        <ul class="list_service">
          <li v-if="!user" @click="launchLogin()"><i class="fa-solid fa-user"></i>로그인</li>
          <li v-else @click="onLogout()"><i class="fas fa-sign-out-alt"></i>로그아웃</li>
          <li><i class="fas fa-newspaper"></i>공지 사항</li>
        </ul>
      </section>
      <section>
        <!-- 로그인 card -->
        <div v-if="loginVisibleFlag === true" class="dimmed">
          <div class="dimmed_layer_login_container radius_border">
            <Login @close-login-card="closeLogin()" :on-login-success-handler="onLoginSuccess" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Login from "@/components/cards/LoginCard/Login.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Login,
  },

  data() {
    return {
      loginVisibleFlag: false,

      fontAwesomeLeftArrow: "fa fa-arrow-left",
      fontAwesomeGear: "fa-light fa-gear",
      vuetifyIcon: {
        color: "black",
      },
      vuetifyAvatar: {
        size: "60px",
      },
    };
  },

  computed: {
    ...mapGetters({
      user: "GET_USER",
    }),
  },

  methods: {
    onCloseCard() {
      this.$emit("close-menu-card");
    },

    onEditUserProfile() {
      console.log("TEST");
    },

    launchLogin() {
      if (this.$_isLoggedIn() === true) {
        alert("이미 로그인 되었습니다.");
        return;
      }

      this.loginVisibleFlag = true;
    },

    async onLogout() {
      await this.$store.dispatch("logout", "kakao");
    },

    onLoginSuccess() {
      this.closeLogin();
    },

    closeLogin() {
      this.loginVisibleFlag = false;
    },

    $_isLoggedIn() {
      return this.user != null;
    },
  },
};
</script>

<style>
.dimmed {
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  z-index: 100;

  background-color: rgba(0, 0, 0, 0.3);
}

.dimmed_layer_login_container {
  position: fixed;

  top: 237.5px;
  left: 40%;
  max-width: 440px;
  width: 90%;

  margin: 20px auto;

  z-index: 100;

  background-color: white;
}

.radius_border {
  border: 2px solid #d8d8d8;
  border-radius: 10px;
  z-index: 2;
}

.menu_container {
  position: fixed;

  width: 380px;
  height: 100%;

  background-color: white;
}

.menu_header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 40px 20px;
}

.user_profile {
  padding: 20px;
}

span.avatar {
  display: inline-block;
}

div.user_info_container {
  position: absolute;

  left: 90px;
  top: 140px;
}

.user_info_nickname {
  font-size: 20px;
  font-weight: bold;
}

.list_service {
  padding: 40px 0px;
}

.list_service li {
  font-size: 16px;

  margin-top: 20px;
}

.list_service li i {
  margin-right: 10px;
}

@media screen and (max-width: 768px) {
  .menu_container {
    width: 380px;
  }

  .dimmed_layer_login_container {
    left: 5%;
  }
}
</style>
