import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
// emoji-martインストールしてreact用もインストーる！
import Picker from "@emoji-mart/react";

export const EmojiPicker = ({ icon, onChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isShowPicker, setIsShowPicker] = useState(false);

  const clickshowPicker = () => setIsShowPicker(!isShowPicker);

  const selectEmoji = (e) => {
    const emojiCode = e.unified.split("-");
    let codesArrey = [];
    emojiCode.forEach((el) => codesArrey.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArrey);
    console.log(emoji);
    setIsShowPicker(false);
    onChange(emoji);
  };

  // 絵文字表示
  useEffect(() => {
    setSelectedEmoji(icon);
  }, [icon]);

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={clickshowPicker}
      >
        {selectedEmoji}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: 5,
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  );
};
