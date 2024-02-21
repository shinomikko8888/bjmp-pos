import React from "react";
import '../../../../styles/auth-page/general.css'
import AuthHeaderDisplay from "../../../../components/auth/header";
import LoginFormLayout from "./form";


export default function LoginForm(){
    
    return(
        <div className="auth-container">
            <AuthHeaderDisplay />
            <LoginFormLayout />
        </div>
    );
}