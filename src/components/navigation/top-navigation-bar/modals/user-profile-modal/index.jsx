import React, { useEffect, useRef, useState } from "react";
import { Modal } from '../../../../../components'
import './../../../../../styles/buttons/general.css'
import BJMPLogo from '../../../../../assets/png/bjmp-logo.png'
import { fetchDataWrapper, handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../../utils";
import { BRANCHES, DOMAIN, POSITIONS } from "../../../../../constants";
export default function UserProfileModal(props){
    const {stateChecker, stateControl, userData, imageSrc, userId, fetchOuterData} = props
    const [imageSrcFromId, setImageSrcFromId] = useState(null);
    const [userDataFromId, setUserDataFromId] = useState({});
    const [tempImageSrc, setTempImageSrc] = useState(null);
    const [editState, setEditState] = useState(false);
    const [imageSrcEdit, setImageSrcEdit] = useState(null);
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);
    const handleSvgClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click(); // Trigger click on the file input
        }
    };
    const rectWidth = imageSrc || tempImageSrc ? 162 : 502; // Adjust width based on imageSrc
    const rectHeight = imageSrc || tempImageSrc ? 162 : 162; // Adjust height based on imageSrc
    useEffect(() => {
        setFormData({
            "user-first-name": '',
            "user-middle-name": '',
            "user-last-name": '',
            "user-contact-number": '',
            "user-address": '',
            "user-branch-location": '',
            "user-position": '',
            "user-image": '',
            "action": '',
            "active-email": '',
        })
      if(userId || editState){
        fetchData();
      }
      if(!stateChecker && editState){
        setEditState(false);
      }
    }, [stateChecker, editState])

    const fetchData = async () => {
        let params = []
        if(userId){
            params.push(['id', userId])
        } else {
            params.push(['id', userData['user-id']])
        }

      const rawData = await fetchDataWrapper('get-user', params);
      const userImage = rawData['user-image'] ? rawData['user-image'].replace('../api/files/images/users/', '') : '';
      setUserDataFromId(rawData);
      setImageSrcFromId(userImage);
        setFormData({
            "user-id": rawData['user-id'] || '',
            "user-type": rawData['user-type'] || '',
            "user-first-name": rawData['user-first-name'] || '',
            "user-middle-name": rawData['user-middle-name'] || '',
            "user-last-name": rawData['user-last-name'] || '',
            "user-contact-number": rawData['user-contact-number'] || '',
            "user-address": rawData['user-address'] || '',
            "user-branch-location": rawData['user-branch-location'] || '',
            "user-position": rawData['user-position'] || '',
            "user-image": rawData['user-image'] || '',
            "action": 'edit-user',
            "active-email": localStorage.getItem('user-email'),
            })
            setTempImageSrc(userImage);
            console.log(rawData);
     
    }
    const handleChange = async (event) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setImageSrcEdit(imageUrl);
            if (editState){
                setTempImageSrc(null);
            }
            setFormData(prevState => ({
                ...prevState,
                [name]: file
            }));
        } else {
            await handleChangeWrapper(event, formData, setFormData);
        }
    }

    const handleSubmit = async (event) => {
        try {
            if (!isFormDataValid(formData)) {
                setErrorMessage('Please fill in all required fields');
                return;
            }
            const response = await handleSubmitWrapper(event, formData, true);
            if (response.success) {
                setErrorMessage('');
                setEditState((prev) => !prev)
                fetchOuterData();
            } else {
              setErrorMessage(response.message || "System error"); 
            }
          } catch (error) {
            console.error('Error: ', error);
            setErrorMessage(`Error: ${error}`);
          }
    }
    const userProfileHeader = (
        <>
        
        <div className='row w-100 d-flex'>
          <div className='col-12 d-flex align-items-center justify-content-between'>
            <div className="d-flex align-items-center">
                <i className="fa-solid fa-user"></i>
                <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>User Entry</h6>
            </div>
            
          </div>
        </div>
        </>
      
    )

    const userProfileBody = (
        <>
        {editState ?
        <form>
        <div className="row ">
            <div className="col-12 mb-1 d-flex justify-content-center" >
            <svg xmlns="http://www.w3.org/2000/svg" style={{margin: '0', padding: '0'}} width={rectWidth+1} height={rectHeight+1} viewBox={`"0 0 ${rectWidth+1} ${rectHeight+1}"`} onClick={handleSvgClick} fill="none">
                        <rect x="0.5" y="0.5" width={rectWidth} height={rectHeight} rx="41" fill="white" stroke="#9D9D9D"
                        strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
                        {imageSrcEdit && !tempImageSrc && (
                            <image
                            x="20%"
                            y="20%"
                            xlinkHref={imageSrc}
                            width="100"
                            height="100"
                            />
                        )}
                        {!imageSrcEdit && tempImageSrc && (
                            <image
                            x="20%"
                            y="20%"
                            xlinkHref={`${DOMAIN}/files/images/users/${tempImageSrc}`}
                            width="100"
                            height="100"
                            />
                        )}
                        {!imageSrcEdit && !tempImageSrc && (
                            <text x="50%" y="50%" textAnchor="middle" alignmentBaseline="middle" fill="#000000" fontSize="14">
                            Upload image here
                        </text>
                        )}     
                    </svg>
            <input
                type="file"
                name='user-image'
                id='user-image'
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleChange}
            />
            </div>
        </div>
        <hr></hr>
        <div className="row g-3 align-items-center mb-1 mt-2">
            <div className="col-12 text-center">
            <p style={{margin: '0'}}><b>Basic Info</b></p>
            </div>
        </div>
        <div className="row g-3 align-items-center">
            <div className="col-6">
                <label htmlFor="user-first-name" className="col-form-label">First Name:<span className='form-required'>*</span></label>
                <input type="text" id="user-first-name" name="user-first-name" className="form-control" value={formData['user-first-name'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter first name" onChange={handleChange} />
            </div>
            <div className="col-6">
                <label htmlFor="user-last-name" className="col-form-label">Last Name:<span className='form-required'>*</span></label>
                <input type="text" id="user-last-name" name="user-last-name" className="form-control" value={formData['user-last-name'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter last name" onChange={handleChange} />
            </div>
        </div>
        <div className="row g-3 align-items-center">
            <div className="col-6">
                <label htmlFor="user-middle-name" className="col-form-label">Middle Name:<span className='form-required'>*</span></label>
                <input type="text" id="user-middle-name" name="user-middle-name" className="form-control" value={formData['user-middle-name'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter middle name" onChange={handleChange} />
            </div>
            <div className="col-6">
                <label htmlFor="user-contact-number" className="col-form-label">Contact Number:<span className='form-required'>*</span></label>
                <input type="number" id="user-contact-number" name="user-contact-number" className="form-control" value={formData['user-contact-number'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter contact number" onChange={handleChange} />
            </div>
        </div>
        <div className="row g-3 align-items-center">
            <div className="col-12">
            <label htmlFor="user-address" className="col-form-label">Complete Address:<span className='form-required'>*</span></label>
            <input type="text" id="user-address" name="user-address" className="form-control" value={formData['user-address'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter complete address" onChange={handleChange} />
            </div>

        </div>
        <div className="row g-3 align-items-center">
                <div className="col-6">
                    <label htmlFor="user-branch-location" className="col-form-label">BJMP Unit Location:<span className='form-required'>*</span></label>
                    <select
                        name="user-branch-location"
                        id="user-branch-location"
                        className="form-select"
                        style={{ width: '100%', boxShadow: 'none' }}
                        value={formData['user-branch-location'] || ''}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>--Select Branch--</option> {/* Default option */}
                        {BRANCHES.map(branch => (
                            <optgroup key={branch.label} label={branch.label}>
                                {branch.facilities.map((facility, subIndex) => (
                                    <option key={subIndex} value={facility}>{facility}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className="col-6">
                    <label htmlFor="user-position" className="col-form-label">Position:<span className='form-required'>*</span></label>
                    <select
                        name="user-position"
                        id="user-position"
                        className="form-select"
                        value={formData['user-position'] || ''}
                        style={{ width: '100%', boxShadow: 'none' }}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>--Select Position--</option> {/* Default option */}
                        {POSITIONS.map(positions => (
                            <optgroup key={positions.label} label={positions.label}>
                                {positions.positions.map((position, subIndex) => (
                                    <option key={subIndex} value={position}>{position}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
            </form> : <div>
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
                        <i className="fa-solid fa-home"></i> BJMP Unit Location:</label>
                </div>
                <div className="col-6">
                    <label htmlFor="bjmp_branch" className="col-form-label">{userId && userDataFromId ? userDataFromId['user-branch-location'] || '' : userData && userData['user-branch-location'] ? userData['user-branch-location'] : ''}</label>
                </div>
            </div>
        </div>}
        </>
      
  )


    const userProfileFooter = (
        <div className='d-flex align-items-center justify-content-end'>
            <p className="error-message mx-2">{errorMessage}</p>
            {!userId && editState && <button className="link-btn" onClick={() => {
                setEditState((prev) => !prev)
                setErrorMessage('')}}>
                Discard
            </button>
            }
            {!userId ? <button type="button" className='main-btn' onClick={(event) => {
                if(!editState){
                    setEditState((prev) => !prev);
                } else {
                    handleSubmit(event)
                }}} >
                {editState ? 'Confirm' :'Edit Data'}
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