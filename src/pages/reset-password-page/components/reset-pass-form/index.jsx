import React from "react";
import '../../../../styles/auth-page/general.css'
import AuthHeaderDisplay from "../../../../components/auth/header";
import ResetPassFormLayout from "./form";


export default function ResetPassForm(){
    
    return(
        <div className="auth-container">
            <AuthHeaderDisplay />
            <ResetPassFormLayout />
        </div>
    );
}