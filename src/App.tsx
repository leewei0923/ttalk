import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatPageFragment from './pages/chatPageFragment/chatPageFragment';
import Home from './pages/home/Home';
import LoginPage from './pages/login/loginPage';
import  NotePage  from './pages/note/note';

function App(): JSX.Element {
 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login/:nav" element={<LoginPage />} />
        <Route path="chat/*" element={<ChatPageFragment />} />
        <Route path="note" element={<NotePage />} />
      </Routes>
    </div>
  );
}

export default App;
