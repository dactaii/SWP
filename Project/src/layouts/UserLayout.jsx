import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";


const UserLayout = ({ children }) => {

    return (
        <>
            <Header />
                <main>{children}</main>
            <Footer />
        </>
    );
}

export default UserLayout;
