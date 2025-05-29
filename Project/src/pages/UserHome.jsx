
import Hero from '../components/home/hero';
import About from '../components/home/about';
import React from "react";
import UserLayout from '../layouts/UserLayout';
import Standard from '../components/home/standard';
const UserHome = () => {
    return(
        <UserLayout>
            <Hero />
            <About />
            <Standard />
        </UserLayout>
    );
};
export default UserHome;
