import { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatInput({ onSend, isVideoUploaded }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSend = () => {
  //   if (!message.trim()) return;
  //   onSend(message);
  //   console.log("sending: ", message);
  //   setMessage("");
  // };

  const handleSend = async () => {
    // if (!file) {
    //   alert("Please upload a video file");
    //   return;
    // }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("query", message);

      const res = await fetch("http://localhost:8000/process/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      onResponse({
        question: message,
        answer: data.result,
      });

      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Error processing video");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.paper",
        borderRadius: "50px",
        margin: "0 20px",
      }}
    >
      <TextField
        fullWidth
        multiline
        placeholder="Ask anything"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        }}
      />
      <IconButton onClick={handleSend} disabled={loading || !isVideoUploaded}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default ChatInput;

// import React, { useState } from "react";

// const ChatInput = ({ onResponse }) => {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!file) {
//       alert("Please upload a video file");
//       return;
//     }

//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("query", message);

//       const res = await fetch("http://localhost:8000/process/", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       onResponse({
//         question: message,
//         answer: data.result,
//       });

//       setMessage("");
//     } catch (err) {
//       console.error(err);
//       alert("Error processing video");
//     }

//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: "10px", borderTop: "1px solid #ccc" }}>
//       {/* File Upload */}
//       <input
//         type="file"
//         accept=".mp4"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       {/* Text Input */}
//       <input
//         type="text"
//         placeholder="Ask something about the video..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         style={{ width: "60%", marginLeft: "10px" }}
//       />

//       {/* Send Button */}
//       <button onClick={handleSend} disabled={loading}>
//         {loading ? "Processing..." : "Send"}
//       </button>
//     </div>
//   );
// };

// export default ChatInput;
