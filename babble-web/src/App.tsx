import "./App.css";
//import styled from "styled-components"
import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/LandingPage";
import { MyLocationProvider } from "./Context/MyLocationContext";
import Header from "./pages/Header";
import MainPage from "./pages/MainMap/MainMapPage";
import PrivateRoute from "./pages/PrivateRoute";
import ChatRoomEnterPage from "./pages/ChatRoom/ChatRoomEnter/ChatRoomEnterPage";
import ChatRoomPage from "./pages/ChatRoom/ChatRoomPage";
import { UserContextProivder } from "./Context/UserContext";
import NewChatRoomPage from "./pages/NewChatRoom/NewChatRoomPage";
import { NewChatRoomProvider } from "./Context/ChatRoomsContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
   --gradient-start: #5583EE;
    --gradient-end: #41D8DD;
    background: linear-gradient(33deg, var(--gradient-start), var(--gradient-end));
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <UserContextProivder>
        <MyLocationProvider>
          <NewChatRoomProvider>
            <Routes>
              <Route path="/login" element={<Landing />} />
              <Route path="/" element={<Navigate replace to="/login" />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Header />
                  </PrivateRoute>
                }
              >
                <Route path="/main" element={<MainPage />} key={Date.now()} />

                <Route path="/enter/:id" element={<ChatRoomEnterPage />} />
                <Route path="/chat/:id" element={<ChatRoomPage />} />
                <Route path="/chat/new" element={<NewChatRoomPage />} />
              </Route>
            </Routes>
          </NewChatRoomProvider>
        </MyLocationProvider>
      </UserContextProivder>
    </>
  );
}

export default App;
