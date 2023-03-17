// 共通するコンポーネント（commcon）

import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { assets } from "../../assets/index";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";

// アクティブに選択された背景色変更
const SCustomListItemButton = styled(ListItemButton)({
  "&.Mui-selected": {
    backgroundColor: "rgba(85, 225, 75, 0.3)",
  },
});

export const Sidebar = () => {
  const navigate = useNavigate();
  const { memoId } = useParams();
  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(0);

  // ReduxのuserSliceで保存したsetUserを使って動的表示を変えることができるようにする
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ページを取得したら一度だけメモの情報を引っ張ってくる
  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  // メモ一覧をクリックしたらセレクトされる、遷移されるたびに再レンダリングしている。
  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActiveIndex(activeIndex);
  }, [navigate]);

  // メモ追加
  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      // 現在のメモの配列（一覧）から追加する
      const newMemos = [res, ...memos];
      // Reduxを使ってどこでもsetMemoStateが使えるようにしてる
      dispatch(setMemo(newMemos));
      // 新しく作ったメモの詳細に遷移
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {/* usernameはスキーマと合わせる↓ */}
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              メモ追加
            </Typography>
            <IconButton onClick={addMemo}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((memo, index) => (
          <SCustomListItemButton
            key={memo._id}
            sx={{ pl: "20px" }}
            component={Link}
            to={`/memo/${memo._id}`}
            selected={index === activeIndex}
          >
            {/* ドロップ＆ドロップはここに */}
            <Typography>
              {memo.icon} {memo.title}
            </Typography>
          </SCustomListItemButton>
        ))}
      </List>
    </Drawer>
  );
};
