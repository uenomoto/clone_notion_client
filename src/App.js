import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { blue } from "@mui/material/colors";

import { AuthLayout } from "./components/layout/AuthLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { AppLayout } from "./components/layout/AppLayout";
import { Home } from "./pages/Home";
import { Memo } from "./pages/Memo";

import "./App.css";
function App() {
  // 全体的なカラートーン↓
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* 必ずCSSを初期化する（デフォルトをきる）CssBaseline */}
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            {/* indexの意味は親と同じpathになる */}
            <Route index element={<Home />} />
            <Route path="memo" element={<Home />} />
            <Route path="memo/:memoId" element={<Memo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
