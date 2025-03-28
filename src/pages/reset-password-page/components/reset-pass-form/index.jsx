import React, { useState } from "react";
import '../../../../styles/auth-page/general.css'
import AuthHeaderDisplay from "../../../../components/auth/header";
import ResetPassFormLayout from "./form";
import { SuccessfulActionModal } from "../../../../components/modals/util-modals";


export default function ResetPassForm(){
    const [isSuccessfulActionModalOpen, setSuccessfulActionModalOpen] = useState(false);
    const [resetPassSubmitted, setResetPassSubmitted] = useState(false); 
    return(
        <div className="auth-container">
            <AuthHeaderDisplay />
            <ResetPassFormLayout openModal={() => setResetPassSubmitted((prev) => !prev)}/>
            <SuccessfulActionModal stateChecker={isSuccessfulActionModalOpen} stateControl={() => setSuccessfulActionModalOpen((prev) => !prev)}
                isSubmitted={resetPassSubmitted} isSubmittedControl={() => setResetPassSubmitted((prev) => !prev)} actionTitle="Password Reset Successfully!"
                actionDescription="Please login again!" isResetPass={true}
                />
        </div>
    );
}