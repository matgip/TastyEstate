import { ModeAPI } from "../service";

const _socialLoginApi = new ModeAPI("user/login")
export const socialLoginApi = async (social, accessToken) => {
  const response = await _socialLoginApi.post({ social, accessToken });
  if (response === undefined) {
    throw new Error("Failed to social login");
  }
  return response.data;
}

const _logoutApi = new ModeAPI("user/logout")
export const logoutApi = async (social, accessToken) => {
  const response = await _logoutApi.post({ social, accessToken });
  if (response === undefined) {
    throw new Error("Failed to logout");
  }
  return response.data;
}
