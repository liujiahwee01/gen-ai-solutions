import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UploadVideoPage from "./pages/UploadVideoPage";
import MainLayout from "./layouts/MainLayout";
import ChatPage from "./pages/ChatPage";

function App({ toggleTheme, mode }) {
  return (
    <Routes>
      <Route element={<MainLayout toggleTheme={toggleTheme} mode={mode} />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
