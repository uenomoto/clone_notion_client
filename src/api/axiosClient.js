import axios from "axios";

// 叩きたいAPI(エンドポイント)を指定↓
const BASE_URL = "http://localhost:5050/api/v1";
// ローカルストレージにトークンを探しに行く
const gettoken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う リクエスト
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    // JWTのトークン↓
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${gettoken()}`, //リクエストヘッダにJWTを付けてサーバーに渡す
    },
  };
});

//APIを叩く前に前処理を行う レスポンス
axiosClient.interceptors.response.use(
  (response) => {
    // ここでJWTのトークンを受け取る
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
