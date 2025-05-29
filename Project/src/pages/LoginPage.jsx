import LoginForm from "../components/login/LoginForm";

import React from "react";
import AuthLayout from '../layouts/AuthLayout';

const Login = () => {
    return(
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
};
export default Login;