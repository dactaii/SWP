import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserHome from "../pages/UserHome";
import ThongTin from "../pages/ThongTin";
import BloodType from "../pages/BloodType";
import OAuth2RedirectHandler from "../components/login/OAuth2RedirectHandler";
import RenderForBlood from "../components/Blood/RenderForBlood";
import UpdateUserInfo from "../components/User/UpdateUserInfo";
import BloodTypeFake from "../pages/BloodTypeFake";
import BloodDonation from "../pages/BloodDonation";

import BlogPage from "../pages/BlogPage";
import BloodUnitPage from "../pages/BloodUnitPage";
import EmergencyFormPage from "../pages/EmergencyFormPage";


import ScheduleManagement from "../components/staff/ScheduleManagement";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/thongtin" element={<ThongTin />} />
            <Route path="/bloodtype" element={<BloodType />} />
            <Route path="/blood/:bloodType" element={<RenderForBlood />} />
            <Route path="/auth/social/callback/google" element={<OAuth2RedirectHandler />} />
            <Route path="/UpdateUserInfo" element={<UpdateUserInfo />} />
            <Route path="/BloodTypeFake" element={<BloodTypeFake />} />
            <Route path="/BloodDonation" element={<BloodDonation />} />

            <Route path="/blog" element={<BlogPage />} />
            <Route path="/BloodUnitPage" element={<BloodUnitPage />} />
            <Route path="/EmergencyFormPage" element={<EmergencyFormPage />} />

            <Route path="/ScheduleManagement" element={<ScheduleManagement />} />


        </Routes>
    );
};
export default AppRouter;