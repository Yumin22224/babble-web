import "./App.css";
//import styled from "styled-components"
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/LandingPage";
import LoginToMain from "./pages/Loading/LoginToMainPage";
import { MyLocationProvider } from "./Context/MyLocationContext";
import Header from "./pages/Header";
import MainPage from "./pages/MainMap/MainMapPage";
import PrivateRoute from "./pages/PrivateRoute";
import ChatRoomEnterPage from "./pages/ChatRoom/ChatRoomEnter/ChatRoomEnterPage";
import ChatRoomPage from "./pages/ChatRoom/ChatRoomPage";
import { UserContextProivder } from "./Context/UserContext";

function App() {
  return (
    <UserContextProivder>
      <MyLocationProvider>
        <Routes>
          <Route path="/login" element={<Landing />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Header />
              </PrivateRoute>
            }
          >
            {/* redirectURI에 인가코드가 그대로 드러나는 이슈 (미해결) */}
            <Route path="/auth/*" element={<LoginToMain />} />
            <Route path="/main" element={<MainPage />} />

            <Route path="/enter/:id" element={<ChatRoomEnterPage />} />
            <Route path="/chat/:id" element={<ChatRoomPage />} />
          </Route>
        </Routes>
      </MyLocationProvider>
    </UserContextProivder>
  );
}

export default App;