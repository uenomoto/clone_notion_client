import { Box } from "@mui/system";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import authUtils from "../../utils/authUtils";
import { Sidebar } from "../common/Sidebar";
import { setUser } from "../../redux/features/userSlice";

export const AppLayout = () => {
  const navigate = useNavigate();

  // Reduxの状態管理使うよーってstoreに宣言
  const dispatch = useDispatch();

  // 遷移するたびに発火するロジック（常にJWTが有効か確認）持っていなかったらログインページに強制遷移
  useEffect(() => {
    // JWTを持っているのか確認する。
    const checkAuth = async () => {
      // 認証チェック
      const user = await authUtils.isAuthenticated();
      // もしユーザーがJWT持っていなかったら(ログインしていなかったら)ログインページに遷移
      if (!user) {
        navigate("/login");
      } else {
        // ユーザーを保存する 引数にuserを入れることでグローバルに使える
        dispatch(setUser(user));
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
