import React from "react";
import Header from "../components/layouts/Header";
const AuthLayout = ({ children }) => {

    return (
        <>
            <Header /> 
            <main>{children}</main>
        </>
    );
}

export default AuthLayout;
