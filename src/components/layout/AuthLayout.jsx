import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { Container } from "@mui/system";

import authUtils from "../../utils/authUtils";
import notionLogo from "../../assets/images/notion-logo.png";

export const AuthLayout = () => {
  const navigate = useNavigate();

  // 遷移するたびに発火するロジック（常にJWTが有効か確認）持っていたらログイン画面やサインアップ画面に遷移しなくなる
  useEffect(() => {
    // JWTを持っているのか確認する。
    const checkAuth = async () => {
      // 認証チェック
      const isAuth = await authUtils.isAuthenticated();
      // もしJWT持ってたらルートに遷移
      if (isAuth) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt=""
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notionクローン開発
        </Box>
        <Outlet />
      </Container>
    </>
  );
};
