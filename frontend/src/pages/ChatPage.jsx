// import { useState } from "react";
// import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
// import LinearProgress from "@mui/material/LinearProgress";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";
// import ChatInput from "../components/ChatInput";
// import ChatBubble from "../components/ChatBubble";
// import { Box } from "@mui/material";

// function ChatPage() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState("");
//   const [summary, setSummary] = useState("");
//   const [messages, setMessages] = useState([]);

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select a mp4 file!");
//       return;
//     }
//     setLoading(true);
//     setResult("");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch("http://127.0.0.1:8000/upload-video/", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       setResult(data.transcription);
//       setSummary(data.summary);
//     } catch (error) {
//       console.error(error);
//       setResult("Error uploading or processing file..");
//     }

//     setLoading(false);
//   };

//   const handleCloseFile = () => {
//     setFile(null);
//   };

//   const handleSentMessage = async (msg) => {
//     console.log("sending message");
//     // add user message
//     setMessages((prev) => [...prev, { text: msg, sender: "user" }]);

//     // simulate ai reply
//     try {
//       const response = await fetch("http://127.0.0.1:8000/chat/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: msg, context: summary }),
//       });
//       const data = await response.json();
//       setMessages((prev) => [...prev, { text: data.response, sender: "ai" }]);
//     } catch (error) {
//       console.error(error);
//     }

//     for (let i = 0; i < messages.length; i++) {
//       console.log("msg: ", messages[i]);
//     }
//   };

//   return (
//     <form onSubmit={handleUpload}>
//       <Grid container justifyContent="center" sx={{ p: "20px" }} spacing={2}>
//         <Grid item xs={12} md={10}>
//           <Paper sx={{ p: "20px" }}>
//             <Grid container spacing={2} justifyContent="center">
//               <Grid item xs={12} size={12}>
//                 <Typography className="section-name">Upload Video</Typography>
//               </Grid>
//               <Grid item xs={12} size={12} justifyContent="center" container>
//                 <Grid
//                   container
//                   size={8}
//                   className="grey-zone upload-grid"
//                   sx={{ padding: "15px" }}
//                 >
//                   {!file ? (
//                     <Grid size={12}>
//                       <Typography className="primary-text">
//                         Drag & Drop
//                       </Typography>
//                       <Typography className="secondary-text">
//                         MP4 file
//                       </Typography>
//                       <Typography className="secondary-text">
//                         -- OR --
//                       </Typography>
//                       <Button component="label">
//                         Browse Files
//                         <input
//                           type="file"
//                           accept="file/mp4"
//                           onChange={(e) => setFile(e.target.files[0])}
//                           hidden
//                         />
//                       </Button>
//                     </Grid>
//                   ) : (
//                     <Grid
//                       item
//                       size={12}
//                       xs={12}
//                       justifyContent="right"
//                       container
//                     >
//                       <Button onClick={handleCloseFile} sx={{ color: "white" }}>
//                         <CloseIcon />
//                       </Button>
//                       <p>Uploaded: {file.name}</p>
//                     </Grid>
//                   )}
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} size={12}>
//                 <Button type="submit" disabled={loading} variant="contained">
//                   {loading ? "Processing" : "Generate Transcript"}
//                 </Button>
//               </Grid>
//               <Grid item xs={12} size={12}>
//                 {loading && <LinearProgress />}
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//         <Grid item size={12}>
//           <Paper sx={{ p: "20px" }}>
//             <Grid container spacing={2} justifyContent="center">
//               <Grid item>
//                 <Typography>Transcribe Result:</Typography>
//               </Grid>
//               <Typography>{result}</Typography>
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//       {/* chat bubbles */}
//       <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
//         {messages.map((msg, index) => (
//           <ChatBubble key={index} message={msg.text} sender={msg.sender} />
//         ))}
//         {/* chat input */}
//         <ChatInput onSend={handleSentMessage} />
//       </Box>
//     </form>
//   );
// }

// export default ChatPage;

import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import ChatInput from "../components/ChatInput";
import ChatBubble from "../components/ChatBubble";
import { Box } from "@mui/material";

function ChatPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [summary, setSummary] = useState("");
  const [messages, setMessages] = useState([]);
  const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a mp4 file!");
      return;
    }
    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-video/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data.transcription);
      setSummary(data.summary);
      setIsVideoUploaded(true);
    } catch (error) {
      console.error(error);
      setResult("Error uploading or processing file..");
    }

    setLoading(false);
  };

  const handleCloseFile = () => {
    setFile(null);
    setIsVideoUploaded(false);
  };

  const handleSentMessage = async (msg) => {
    console.log("sending message");
    // block if no video uploaded
    if (!isVideoUploaded) {
      setMessages((prev) => [
        ...prev,
        { text: msg, sender: "user" },
        {
          text: "No video uploaded yet. Please upload a video first.",
          sender: "ai",
        },
      ]);
      return;
    }

    // add user message
    setMessages((prev) => [...prev, { text: msg, sender: "user" }]);

    // simulate ai reply
    try {
      const response = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "ai" }]);
    } catch (error) {
      console.error(error);
    }

    for (let i = 0; i < messages.length; i++) {
      console.log("msg: ", messages[i]);
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* === Upload video section ===*/}
      <Box sx={{ p: 2 }}>
        <form onSubmit={handleUpload}>
          <Grid
            container
            justifyContent="center"
            sx={{ p: "20px" }}
            spacing={2}
          >
            <Grid item xs={12} md={10} size={7}>
              <Paper sx={{ p: "20px" }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} size={12}>
                    <Typography className="section-name">
                      Upload Video
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    size={12}
                    justifyContent="center"
                    container
                  >
                    <Grid
                      container
                      size={8}
                      className="grey-zone upload-grid"
                      sx={{ padding: "15px" }}
                    >
                      {!file ? (
                        <Grid size={12}>
                          <Typography className="primary-text">
                            Drag & Drop
                          </Typography>
                          <Typography className="secondary-text">
                            MP4 file
                          </Typography>
                          <Typography className="secondary-text">
                            -- OR --
                          </Typography>
                          <Button component="label">
                            Browse Files
                            <input
                              type="file"
                              accept="file/mp4"
                              onChange={(e) => setFile(e.target.files[0])}
                              hidden
                            />
                          </Button>
                        </Grid>
                      ) : (
                        <Grid
                          item
                          size={12}
                          xs={12}
                          justifyContent="right"
                          container
                        >
                          <Button
                            onClick={handleCloseFile}
                            sx={{ color: "white" }}
                          >
                            <CloseIcon />
                          </Button>
                          <p>Uploaded: {file.name}</p>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} size={12}>
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="contained"
                    >
                      {loading ? "Uploading" : "Upload Video"}
                    </Button>
                  </Grid>
                  <Grid item xs={12} size={12}>
                    {loading && <LinearProgress />}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Box>
      {/* === Chat section ===*/}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} message={m.text} sender={m.sender} />
        ))}
      </Box>
      <Box sx={{ p: 2 }}>
        <ChatInput
          onSend={handleSentMessage}
          isVideoUploaded={isVideoUploaded}
        />
      </Box>
    </Box>
  );
}

export default ChatPage;
