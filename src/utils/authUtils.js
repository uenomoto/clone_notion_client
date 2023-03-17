import authApi from "../api/authApi";

const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    // getItemJWTのデータを取得してくる
    const token = localStorage.getItem("token");
    // もしトークンがなかったら帰れ（サインアップしてきて）
    if (!token) return false;

    // トークンがあったら有効か無効か確認
    try {
      const res = await authApi.verifyToken();
      return res.user;
    } catch {
      // 無効だったらもう一度ログイン
      return false;
    }
  },
};

export default authUtils;
