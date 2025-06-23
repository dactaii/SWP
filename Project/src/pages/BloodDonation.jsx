
import React from "react";
import UserLayout from '../layouts/UserLayout';
import BloodDonation from '../components/Blood/BloodDonation';
const GuestHome = () => {
    return (
        <UserLayout>
            <BloodDonation />
        </UserLayout>
    );
};
export default GuestHome;