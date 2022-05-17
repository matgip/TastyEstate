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
          <li @click="launchLogin()"><i class="fa-solid fa-user"></i>로그인</li>
          <li><i class="fas fa-newspaper"></i>공지 사항</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
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
      this.$store.commit("UPDATE_LOGIN_VISIBLE_FLAG", true);
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
}
</style>
