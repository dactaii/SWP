import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { UserProvider } from './components/User/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { AlertProvider } from './layouts/AlertContext';
import pageBG from './assets/img/backgrounds/PageBG.png';

/* CSS */
import './assets/css/main.css';
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import ChatWidget from './components/ChatBoxAI/ChatWidget';




function App() {
  const appStyle = {
    background: `url(${pageBG}) center / cover no-repeat fixed`,
    minHeight: "100vh"
  };

  return (
    <>
    <div
      className="app-wrapper has-bg"
      style={{ "--global-bg": `url(${pageBG})` }}
    >
      <BrowserRouter>
        <AlertProvider>
          <UserProvider>
            <AppRouter />
            <ToastContainer />
          </UserProvider>
        </AlertProvider>
      </BrowserRouter>
    </div>
    <ChatWidget />
    </>
  );
}

export default App;

