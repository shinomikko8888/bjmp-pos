import React from "react";
import Modal from '../../../../modals';
import './../../../../../styles/buttons/general.css'
import BJMPLogo from '../../../../../assets/png/bjmp-logo.png'
export default function UserProfileModal({stateChecker, stateControl}){
    const userProfileHeader = (
        <div>
            <h6>User Information</h6>
        </div>
    )

    const userProfileBody = (
    <div>
           <div className="row d-flex justify-content-center" style={{display: 'flex'}}>
             <div className="col-12 text-center" >
                <div className="d-flex align-items-center justify-content-center">
                    <img className='mb-3' src={BJMPLogo} alt="profileImage" style={{borderRadius: '250px', width: '100px'}} />
                </div>
                 
                 <hr style={{margin: '10px 0 10px 0'}}></hr>
                 
                 <p style={{fontSize: '24px', fontWeight: 'bold', margin: '0'}}>
                 LASTNAME, Firstname, MiddleInitial</p>
                 <p style={{color: '#666'}}>Position</p>
             </div>
           </div>
           <div className="row g-3 align-items-center mb-2">
             <div className="col-6">
               <label htmlFor="emailAdd" className="col-form-label">
               <i className="fa-solid fa-envelope"></i> Email Address:</label>
             </div>
             <div className="col-6" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
             <label htmlFor="emailAdd" className="col-form-label">Email Address</label>
           </div>
             </div>
           <div className="row g-3 align-items-center mb-2">
             <div className="col-6">
               <label htmlFor="contact_number" className="col-form-label">
               <i className="fa-solid fa-phone"></i> Contact Number:</label>
             </div>
             <div className="col-6">
               <label htmlFor="contact_number" className="col-form-label">Contact Number</label>
             </div>
             </div>  
             <div className="row g-3 align-items-center mb-2">
             <div className="col-6">
                 
               <label htmlFor="loc" className="col-form-label">
               <i className="fa-solid fa-map-marker"></i> Address:</label>
             </div>
             <div className="col-6">
               <label htmlFor="complete_address" className="col-form-label">Complete Address</label>
             
             </div>
             </div>
             <div className="row g-3 align-items-center mb-2">
                 <div className="col-12 fw-bold">
                     
                     <label htmlFor="contNum" className="col-form-label">
                         Company Details</label>
                 </div>
             </div>
             <div className="row g-3 align-items-center mb-2">
             <div className="col-6">
                 
               <label htmlFor="branch" className="col-form-label">
               <i className="fa-solid fa-home"></i> BJMP Branch Location:</label>
             </div>
             <div className="col-6">
             
               <label htmlFor="bjmp_branch" className="col-form-label">Branch Location</label>
             </div>
             </div>
       </div>
    )

    const userProfileFooter = (
        <div className='d-flex align-items-center justify-content-end'>
        <button
            type="button"
            className='link-btn mx-2'
            onClick={() => stateControl((prev) => !prev)}
        >
            Close
        </button>
        <button
            type="button"
            className='main-btn'
        >
            Edit
        </button>
        </div>
        
    )

    return <Modal headerContent={userProfileHeader} 
    bodyContent={userProfileBody} 
    footerContent={userProfileFooter} 
    stateChecker={stateChecker} 
    stateControl={stateControl}
    customWidth={'35%'}
    customZIndex={21}/>;
}