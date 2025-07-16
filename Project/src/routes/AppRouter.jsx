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
import NearbyDonorSearchPage from "../pages/NearbyDonorSearchPage";
import ScheduleManagementPage from "../pages/ScheduleManagementPage";
import AppointmentListPage from "../pages/AppointmentListPage";
import DashBoardPage from "../pages/DashBoardPage";
import ReportPage from "../pages/ReportPage";
import ChatBox from "../layouts/ChatBox";
function AppRouter() {
    return (
        <Routes>
            <Route element={<ChatBox />}>
                <Route path="/" element={<UserHome />} />
                <Route path="/thongtin" element={<ThongTin />} />
                <Route path="/bloodtype" element={<BloodType />} />
                <Route path="/blood/:bloodType" element={<RenderForBlood />} />
                <Route path="/UpdateUserInfo" element={<UpdateUserInfo />} />
                <Route path="/BloodTypeFake" element={<BloodTypeFake />} />
                <Route path="/BloodDonation" element={<BloodDonation />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/BloodUnitPage" element={<BloodUnitPage />} />
                <Route path="/NearbyDonorSearchPage" element={<NearbyDonorSearchPage />} />
                <Route path="/ScheduleManagementPage" element={<ScheduleManagementPage />} />
                <Route path="/AppointmentListPage" element={<AppointmentListPage />} />
                <Route path="/DashBoardPage" element={<DashBoardPage />} />
                <Route path="/ReportPage" element={<ReportPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth/social/callback/google" element={<OAuth2RedirectHandler />} />


        </Routes>
    );
};
export default AppRouter;