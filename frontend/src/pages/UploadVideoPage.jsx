import { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function UploadVideoPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

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
    } catch (error) {
      console.error(error);
      setResult("Error uploading or processing file..");
    }

    setLoading(false);
  };

  const handleCloseFile = () => {
    setFile(null);
  };

  return (
    <form onSubmit={handleUpload}>
      <Grid container justifyContent="center" sx={{ p: "20px" }} spacing={2}>
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: "20px" }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} size={12}>
                <Typography className="section-name">
                  Transcribe Video to Text
                </Typography>
              </Grid>
              <Grid item xs={12} size={12} justifyContent="center" container>
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
                      <Button onClick={handleCloseFile} sx={{ color: "white" }}>
                        <CloseIcon />
                      </Button>
                      <p>Uploaded: {file.name}</p>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              {/* <Grid item xs={12} size={12}>
                {file && <p>Uploaded: {file.name}</p>}
              </Grid> */}
              <Grid item xs={12} size={12}>
                <Button type="submit" disabled={loading} variant="contained">
                  {loading ? "Processing" : "Generate Transcript"}
                </Button>
              </Grid>
              <Grid item xs={12} size={12}>
                {loading && <LinearProgress />}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item size={12}>
          <Paper sx={{ p: "20px" }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Typography>Transcribe Result:</Typography>
              </Grid>
              <Typography>{result}</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export default UploadVideoPage;

//  <Grid container spacing={2} justifyContent="center">
//         <Grid size={12}>
//           <Typography className="section-name">
//             Transcribe Video to Text
//           </Typography>
//         </Grid>
//         <Grid container size={8} className="grey-zone" sx={{ padding: "15px" }}>
//           <Grid size={12}>
//             <Typography className="primary-text">Drag & Drop</Typography>
//             <Typography className="secondary-text">MP4 file</Typography>
//             <Typography className="secondary-text">-- OR --</Typography>
//             <Button component="label">
//               Browse Files
//               <input
//                 type="file"
//                 accept="file/mp4"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 hidden
//               />
//             </Button>
//             {loading && <CircularProgress />}
//           </Grid>
//         </Grid>
//         <Grid size={8}>
//           <Button type="submit" disabled={loading} sx={{ color: "white" }}>
//             {loading ? "Processing" : "Generate Transcript"}
//           </Button>
//           {loading && <CircularProgress />}
//           {file && <p>Uploaded: {file.name}</p>}
//         </Grid>
//         <Grid size={12}>
//           <Typography>Result:</Typography>
//           <Typography>{result}</Typography>
//         </Grid>

//         <Grid container size={8}>
//           <Grid>
//             <form onSubmit={handleUpload}>
//               <input
//                 type="file"
//                 accept="file/mp4"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <Button type="submit" disabled={loading}>
//                 {loading ? "Processing" : "Generate Transcript"}
//               </Button>
//               {loading && <CircularProgress />}
//               {file && <p>Uploaded: {file.name}</p>}
//             </form>
//           </Grid>
//         </Grid>
//         <div style={{ padding: "20px" }} className="sub-section">
//           <br />
//           <div>
//             <Typography>Result:</Typography>
//             <Typography>{result}</Typography>
//           </div>
//         </div>
//       </Grid>
