import { Box, Typography } from "@mui/material";

function ChatBubble({ message, sender }) {
  const isUser = sender === "user";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          backgroundColor: isUser ? "grey" : "white",
          color: isUser ? "white" : "black",
          padding: "10px 20px",
          borderRadius:" 10px"
        }}
      >
        <Typography>{message}</Typography>
      </Box>
    </Box>
  );
}

export default ChatBubble;
