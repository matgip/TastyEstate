<template>
  <div id="mapview">
    <div class="map_button_container">
      <!-- 유저 로그인 버튼 div -->
      <div class="user_login radius_border">
        <span @click="launchLogin()"><i class="fas fa-user"></i></span>
      </div>
      <!-- 지도 확대, 축소 컨트롤 div -->
      <div class="custom_zoomcontrol radius_border">
        <span @click="map.zoomIn()"><i class="fa-solid fa-plus"></i></span>
        <span @click="map.zoomOut()"><i class="fa-solid fa-minus"></i></span>
      </div>
    </div>
    <!-- 로그인 card -->
    <div v-if="loginVisibleFlag === true" class="dimmed">
      <div class="dimmed_layer_login_container radius_border">
        <Login @close-login-card="closeLogin()" :on-login-success-handler="onLoginSuccess" />
      </div>
    </div>
    <!-- 리뷰 card -->
    <div v-if="reviewVisibleFlag" class="dimmed">
      <div class="dimmed_layer_reviews_container radius_border">
        <Reviews @close-reviews-card="closeReviews()" />
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/cards/LoginCard/Login.vue";
import Reviews from "@/components/cards/ReviewsCard/Reviews.vue";
import kakaoMap from "@/api/map/kakao2";
import { mapGetters } from "vuex";

export default {
  components: {
    Login,
    Reviews,
  },

  mounted() {
    this.map = kakaoMap.mount();
    kakaoMap.setOnClickAgencyListener(this.onClickAgency);

    this.$store.commit("UPDATE_MAP", this.map);
  },

  data() {
    return {
      map: null,
    };
  },

  computed: {
    ...mapGetters({
      user: "GET_USER",
      loginVisibleFlag: "GET_LOGIN_VISIBLE_FLAG",
      reviewVisibleFlag: "GET_REVIEW_VISIBLE_FLAG",
    }),
  },

  methods: {
    onClickAgency(place) {
      console.log("on click");
      this.$store.dispatch("updateAgency", place);
    },

    onLoginSuccess() {
      this.$_invertUserLoginBtnColor();
      this.closeLogin();
    },

    closeLogin() {
      this.$store.commit("UPDATE_LOGIN_VISIBLE_FLAG", false);
    },

    $_invertUserLoginBtnColor() {
      const userLoginBtn = document.querySelector(".user_login");
      userLoginBtn.classList.add("invert");
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

    closeReviews() {
      this.$store.commit("UPDATE_REVIEW_VISIBLE_FLAG", false);
    },
  },
};
</script>

<style scoped>
#mapview {
  width: 100%;
  height: 100%;
}

span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}

span i {
  width: 15px;
  height: 15px;
  padding: 12px 0;
  color: #ff5722;
  border: none;
}

.map_button_container {
  position: absolute;
  right: 20px;
  width: 38px;
  height: 100%;
}

.user_login {
  position: relative;

  top: 40px;
  height: 40px;

  z-index: 2;

  background-color: white;
}

.user_login.invert {
  background-color: #ff5722;
}

.user_login.invert span i {
  color: white;
}

.custom_zoomcontrol {
  position: relative;
  top: 50px;
  height: 80px;
  z-index: 2;
  background-color: white;
}

.custom_zoomcontrol span:first-child {
  border-bottom: 2px solid #d8d8d8;
}

.radius_border {
  border: 2px solid #d8d8d8;
  border-radius: 10px;
  z-index: 2;
}

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
  position: relative;

  top: 237.5px;
  width: 440px;

  margin: 20px auto;

  z-index: 100;

  background-color: white;
}

.dimmed_layer_reviews_container {
  position: relative;

  top: 2.5%;
  width: 68%;

  margin: 20px auto;

  z-index: 100;

  background-color: white;
}

@media screen and (max-width: 768px) {
  .user_login {
    top: 130px;
  }

  .custom_zoomcontrol {
    top: 140px;
  }

  .dimmed_layer_reviews_container {
    width: 100%;
  }
}
</style>
