import React from "react";
import { Routes, Route } from "react-router-dom";

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

import OPosiTypePage from "../pages/OPosiTypePage";
import ONegaTypePage from "../pages/ONegaTypePage";
import APosiTypePage from "../pages/APosiTypePage";
import ANegaTypePage from "../pages/ANegaTypePage";
import BPosiTypePage from "../pages/BPosiTypePage";
import BNegaTypePage from "../pages/BNegaTypePage";
import ABPosiTypePage from "../pages/ABPosiTypePage";
import ABNegaTypePage from "../pages/ABNegaTypePage";
import RareBloodPage from "../pages/RareBloodPage";
import UseBloodPage from "../pages/UseBloodPage";
import UserManagementPage from "../pages/UserManagementPage"
import ChatBox from "../layouts/ChatBox";
import DonationUserListPage from "../pages/DonationUserListPage";
import UserInfoPage from "../pages/UserInfoPage";
import UpdateUserInfoPage from "../pages/UpdateUserInfoPage";
import DonationHistoryPage from "../pages/DonationHistoryPage";
function AppRouter() {
    return (
        <Routes>
            
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

                <Route path="/blood-type/o-positive" element={<OPosiTypePage />} />
                <Route path="/blood-type/o-negative" element={<ONegaTypePage />} />
                <Route path="/blood-type/a-positive" element={<APosiTypePage />} />
                <Route path="/blood-type/a-negative" element={<ANegaTypePage />} />
                <Route path="/blood-type/b-positive" element={<BPosiTypePage />} />
                <Route path="/blood-type/b-negative" element={<BNegaTypePage />} />
                <Route path="/blood-type/ab-positive" element={<ABPosiTypePage />} />
                <Route path="/blood-type/ab-negative" element={<ABNegaTypePage />} />
                <Route path="/blood-type/rare" element={<RareBloodPage />} />
                <Route path="/UseBloodPage" element={<UseBloodPage />} />
                <Route path="/UserManagementPage" element={<UserManagementPage/>}/>
                <Route path="/DonationUserListPage" element={<DonationUserListPage />} />
                <Route path="/UserInfoPage" element={<UserInfoPage />} />
                <Route path="/UpdateUserInfoPage" element={<UpdateUserInfoPage />} />
                <Route path="/DonationHistoryPage" element={<DonationHistoryPage />} />
        

            <Route path="/auth/social/callback/google" element={<OAuth2RedirectHandler />} />
        </Routes>
    );
}

export default AppRouter;
