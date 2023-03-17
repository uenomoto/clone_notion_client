import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";

export const Login = () => {
  // これだけで画面遷移できる
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const [lodeing, setLodeing] = useState(false);

  // Hooks使わないで入力した値を取得するやり方
  const handleSubmit = async (e) => {
    e.preventDefault();
    // バリデーション初期値は空
    setUsernameErrText("");
    setPasswordErrText("");

    // 入力欄の文字列を取得
    const data = new FormData(e.target);
    // ↓実際にお名前inputに打ち込んだvalueを取得できる
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    console.log(username);
    console.log(password);

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("名前を入力してください");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("パスワードを入力してください");
    }

    // もしバリデーションに引っ掛かったらAPI叩かせないように帰らせる
    if (error) return;

    setLodeing(true);

    // 新規登録APIを叩く
    try {
      const res = await authApi.login({
        // サーバー側のreq.bodyに当たる部分↓ポストマンでテストしたね
        username,
        password,
      });
      setLodeing(false);
      // ローカルストレージのres.tokenに保存される
      localStorage.setItem("token", res.token);
      console.log("ログイン成功");
      // 遷移する↓
      navigate("/");
    } catch (err) {
      // バックエンド側のバリエラーメッセージを表示させる
      const errors = err.data.errors;
      console.log(errors);
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        } else if (err.param === "password") {
          setPasswordErrText(err.msg);
        }
      });
      setLodeing(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前を記入してください"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          // ↓バリデーションで引っかかった場合文字が入るから入ったら赤くする
          error={usernameErrText !== ""}
          disabled={lodeing}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワードを記入してください"
          margin="normal"
          name="password"
          // ↓これは第三者から見えなくなるようにすることができる
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={lodeing}
        />

        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={lodeing}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      {/* ログインページに遷移↓ */}
      <Button component={Link} to="/register">
        アカウントを持っていませんか？ 新規登録
      </Button>
    </>
  );
};
