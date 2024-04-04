import React, { useEffect, useState } from "react";
import { Modal } from '../../../../../components'
import './../../../../../styles/buttons/general.css'
import BJMPLogo from '../../../../../assets/png/bjmp-logo.png'
import { fetchDataWrapper } from "../../../../../utils";
import { DOMAIN } from "../../../../../constants";
export default function UserProfileModal(props){
    const {stateChecker, stateControl, userData, imageSrc, userId} = props
    const [imageSrcFromId, setImageSrcFromId] = useState(null);
    const [userDataFromId, setUserDataFromId] = useState({});
    useEffect(() => {
      if(userId){
        fetchData();
      }
    }, [stateChecker])

    const fetchData = async () => {
      const rawData = await fetchDataWrapper('get-user', [['id', userId]]);
      const userImage = rawData['user-image'] ? rawData['user-image'].replace('../api/files/images/users/', '') : '';
      setUserDataFromId(rawData);
      setImageSrcFromId(userImage);
    }

    const userProfileHeader = (
      <div className='row w-100'>
          <div className='col-12 d-flex align-items-center'>
          <i className="fa-solid fa-user"></i>
          <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>User Entry</h6>
          </div>
      </div>
    )

    const userProfileBody = (
      <div>
          <div className="row d-flex justify-content-center" style={{ display: 'flex' }}>
              <div className="col-12 text-center">
                  <div className="d-flex align-items-center justify-content-center">
                      <img className='mb-3' src={`${DOMAIN}/files/images/users/${userId && imageSrcFromId ? imageSrcFromId : imageSrc}`} alt="profileImage" style={{ borderRadius: '250px', width: '200px' }} />
                  </div>
  
                  <hr style={{ margin: '10px 0 10px 0' }}></hr>
  
                  <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
                      {userId && userDataFromId ? `${userDataFromId['user-last-name'] ? userDataFromId['user-last-name'].toUpperCase() : ''}, ${userDataFromId['user-first-name'] || ''} ${userDataFromId['user-middle-name'] || ''}` :
                          `${userData && userData['user-last-name'] ? userData['user-last-name'].toUpperCase() : ''}, ${userData && userData['user-first-name'] ? userData['user-first-name'] : ''} ${userData && userData['user-middle-name'] ? userData['user-middle-name'] : ''}`}
                  </p>
                  <p style={{ color: '#666' }}>{userId && userDataFromId ? userDataFromId['user-position'] || '' : userData && userData['user-position'] ? userData['user-position'] : ''}</p>
              </div>
          </div>
          <div className="row g-3 align-items-center mb-2">
              <div className="col-6">
                  <label htmlFor="emailAdd" className="col-form-label">
                      <i className="fa-solid fa-envelope"></i> Email Address:</label>
              </div>
              <div className="col-6" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <label htmlFor="emailAdd" className="col-form-label">{userId && userDataFromId ? userDataFromId['user-email'] || '' : userData && userData['user-email'] ? userData['user-email'] : ''}</label>
              </div>
          </div>
          <div className="row g-3 align-items-center mb-2">
              <div className="col-6">
                  <label htmlFor="contact_number" className="col-form-label">
                      <i className="fa-solid fa-phone"></i> Contact Number:</label>
              </div>
              <div className="col-6">
                  <label htmlFor="contact_number" className="col-form-label">{userId && userDataFromId ? userDataFromId['user-contact-number'] || '' : userData && userData['user-contact-number'] ? userData['user-contact-number'] : ''}</label>
              </div>
          </div>
          <div className="row g-3 align-items-center mb-2">
              <div className="col-6">
                  <label htmlFor="loc" className="col-form-label">
                      <i className="fa-solid fa-map-marker"></i> Address:</label>
              </div>
              <div className="col-6">
                  <label htmlFor="complete_address" className="col-form-label">{userId && userDataFromId ? userDataFromId['user-address'] || '' : userData && userData['user-address'] ? userData['user-address'] : ''}</label>
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
                  <label htmlFor="bjmp_branch" className="col-form-label">{userId && userDataFromId ? userDataFromId['user-branch-location'] || '' : userData && userData['user-branch-location'] ? userData['user-branch-location'] : ''}</label>
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
        {!userId ? <button
            type="button"
            className='main-btn'
        >
            Edit
        </button> : ''}
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