// API（エンドポイント）を一言で呼べるようにする専用ファイル

import axiosClient from "./axiosClient";

// サインイン＆サインアップ専用↓
const authApi = {
  // registerを打ち込むとauth/registerがよばれる
  register: (params) => axiosClient.post("auth/register", params),
  login: (params) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/verify-token"),
};

export default authApi;
