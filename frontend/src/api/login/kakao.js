const kakaoLogin = {
  scope: "profile_nickname, profile_image, account_email, gender, age_range",
  login() {
    return new Promise((resolve, reject) => {
      window.Kakao.Auth.login({
        scope: this.scope,
        success(authObj) {
          resolve(authObj.access_token);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  },
};

export default kakaoLogin;
