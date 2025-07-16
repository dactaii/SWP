import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { UserProvider } from './components/User/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';


/* CSS */
import './assets/css/main.css';
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import ChatWidget from './components/ChatBoxAI/ChatWidget';





function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <AppRouter />
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
