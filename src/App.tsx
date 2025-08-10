import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";

export default function App() {
  return (
    <>
     
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  );
}
