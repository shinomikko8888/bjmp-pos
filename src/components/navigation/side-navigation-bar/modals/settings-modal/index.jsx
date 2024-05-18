import React from "react";
import Modal from "../../../../modals";
import { under_construction } from "../../../../../assets/svg";
import UnderConstruction from "../../../../utils/under-construction";

export default function SettingsModal(props){
    const {stateControl, stateChecker} = props
    const settingsModalHeader = (
        <>
            <div className='row w-100'>
                <div className='col-12 d-flex align-items-center'>
                <i className="fa-solid fa-gear"></i>
                <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>Settings</h6>
                </div>
            </div>
        </>
    )

    const settingsModalBody = (
        <>
            <UnderConstruction/>
        </>
    )
    
    const settingsModalFooter = (
        <>
        </>
    )


    return(
        <>
            <Modal
            headerContent={settingsModalHeader}
            bodyContent={settingsModalBody}
            footerContent={settingsModalFooter}
            stateChecker={stateChecker}
            stateControl={stateControl}
            customWidth={'60%'}
            customZIndex={30}
            />
        </>
    )


}