import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { UserProvider } from './components/User/UserContext';
/* CSS */
import './assets/css/main.css';
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
