import React from "react";
import { under_construction } from "../../../assets/svg";

export default function UnderConstruction(props) {
    return(
        <>
            <div className="d-flex align-items-center justify-content-center under-construction-notice">
                <div>
                    <img src={under_construction} width={300} alt="Empty Result" />
                    <div className="mt-4">
                        <h4>This section is under construction</h4>
                        <p className="text-muted">Please wait for future updates for more information</p>
                    </div>
                </div>
                
              </div>
        </>
    )
}