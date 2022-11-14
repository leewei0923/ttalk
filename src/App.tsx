import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatPageFragment from './pages/chatPageFragment/chatPageFragment';
import Home from './pages/home/Home';
import LoginPage from './pages/login/loginPage';
import LostPage from './pages/lostPage';
import NotePage from './pages/note/note';
import { AuthRoute } from './routes/authRoutes';

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/:nav" element={<LoginPage />} />
        {/* <AuthRoute path="chat/*" element={<ChatPageFragment />} /> */}
        <Route
          path="chat/*"
          element={<AuthRoute element={<ChatPageFragment />} />}
        />
        <Route path="note" element={<NotePage />} />
        <Route path="*" element={<LostPage />} />
      </Routes>
    </div>
  );
}

export default App;
