import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserHome from "../pages/UserHome";
import ThongTin from "../pages/ThongTinNd";
import BloodType from "../pages/BloodType";
import RenderForBlood from "../components/Blood/RenderForBlood";
function AppRouter() {
    return (
            <Routes>
                <Route path="/" element={<UserHome />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/thongtinnd" element={<ThongTin/>} />
                <Route path="/bloodtype" element={<BloodType/>} />
                <Route path="/blood/:bloodType" element={<RenderForBlood />} />
            </Routes>
    );
};
export default AppRouter;