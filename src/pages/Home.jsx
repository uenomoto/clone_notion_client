import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import memoApi from "../api/memoApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { setMemo } from "../../redux/features/memoSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);

  const [loading, setLoading] = useState(false);

  // クリックされたらメモ作成APIをたたく(DBに保存)
  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      const newMemos = [res, ...memos];
      // dispatch(setMemo(newMemos));
      console.log(res);
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={() => createMemo()}
        loading={loading}
      >
        メモ新規作成
      </LoadingButton>
    </Box>
  );
};
