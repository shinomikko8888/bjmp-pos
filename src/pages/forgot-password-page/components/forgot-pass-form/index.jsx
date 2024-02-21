import React from "react";
import '../../../../styles/auth-page/general.css'
import AuthHeaderDisplay from "../../../../components/auth/header";
import ForgotPassFormLayout from "./form";


export default function ForgotPassForm(){
    
    return(
        <div className="auth-container">
            <AuthHeaderDisplay />
            <ForgotPassFormLayout />
        </div>
    );
}