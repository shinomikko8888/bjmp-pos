import React, {useState, useRef, useEffect} from "react";
import { Modal } from "../../../../components";
import '../../../../styles/buttons/general.css'
import { BRANCHES, DOMAIN } from "../../../../constants";
import { POSITIONS } from "../../../../constants/positions";
import { fetchDataWrapper, handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../utils";
export default function UserModal(props){
    const {stateChecker, stateControl, isEdit, isSubmittedControl, id} = props
    const [imageSrc, setImageSrc] = useState(null);
    const [tempImageSrc, setTempImageSrc] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonState, setButtonState] = useState(false);
    const fileInputRef = useRef(null);
    const handleSvgClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click(); // Trigger click on the file input
        }
    };
    const rectWidth = imageSrc || tempImageSrc ? 162 : 502; // Adjust width based on imageSrc
    const rectHeight = imageSrc || tempImageSrc ? 162 : 162; // Adjust height based on imageSrc
    const [formData, setFormData] = useState({
        "user-email": '',
        "user-password": '',
        "user-type": '',
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

    useEffect(() => {
        setFormData({
            "user-email": '',
            "user-password": '',
            "user-type": '',
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
        setErrorMessage('');
        setImageSrc(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear file input value
        }
        if(isEdit && stateChecker){
            fetchData();
        }
        else{
            setFormData({
                "user-email": '',
                "user-password": '',
                "user-type": '',
                "user-first-name": '',
                "user-middle-name": '',
                "user-last-name": '',
                "user-contact-number": '',
                "user-address": '',
                "user-branch-location": '',
                "user-position": '',
                "user-image": '',
                "action": 'add-user',
                "active-email": localStorage.getItem('user-email'),
                
            })
            setImageSrc(null);
            setTempImageSrc(null);
        }
    }, [stateChecker, isEdit])

    const fetchData = async () => {
        try{
          const data = await fetchDataWrapper('get-user', [['id', id]]);
          const userImage = data['user-image'] ? data['user-image'].replace('../api/files/images/users/', '') : '';
          setFormData({
                "user-id": data['user-id'] || '',
                "user-email": data['user-email'] || '',
                "user-password": data['user-password'] || '',
                "user-type": data['user-type'] || '',
                "user-first-name": data['user-first-name'] || '',
                "user-middle-name": data['user-middle-name'] || '',
                "user-last-name": data['user-last-name'] || '',
                "user-contact-number": data['user-contact-number'] || '',
                "user-address": data['user-address'] || '',
                "user-branch-location": data['user-branch-location'] || '',
                "user-position": data['user-position'] || '',
                "user-image": data['user-image'] || '',
                "action": 'edit-user',
                "active-email": localStorage.getItem('user-email'),
            })
            setTempImageSrc(userImage);
        } catch (error){
          console.error('Error fetching data: ', error);
        }
      }
    const handleChange = async (event) => {
        const { name, value, type } = event.target;

        if (type === 'file') {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setImageSrc(imageUrl);
            if (isEdit){
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
            } else {
                setButtonState(true)
                const response = await handleSubmitWrapper(event, formData, true);
                if (response.success) {
                    setErrorMessage('');
                    stateControl((prev) => !prev)
                    isSubmittedControl((prev) => !prev)
                    setButtonState(false);
                } else {
                setErrorMessage(response.message || "System error"); 
                setButtonState(false);
                }
            }
            
          } catch (error) {
            console.error('Error: ', error);
            setErrorMessage(`Error: ${error}`);
            setButtonState(false);
          }
    }

    const userModalHeader = (
        <div className='row w-100'>
            <div className='col-12 d-flex align-items-center'>
            <i className={`${ isEdit ? 'fa-solid fa-pen' : 'fa-solid fa-plus'}`}></i>
            <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>{`${isEdit ? 'Edit' : 'Create'}`} User Entry</h6>
            </div>
        </div>
    );
    const userModalBody = (
        <>
        <form>
            <div className="row ">
                <div className="col-12 mb-1 d-flex justify-content-center" >
                <svg xmlns="http://www.w3.org/2000/svg" style={{margin: '0', padding: '0'}} width={rectWidth+1} height={rectHeight+1} viewBox={`"0 0 ${rectWidth+1} ${rectHeight+1}"`} onClick={handleSvgClick} fill="none">
                            <rect x="0.5" y="0.5" width={rectWidth} height={rectHeight} rx="41" fill="white" stroke="#9D9D9D"
                            strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
                            {imageSrc && !tempImageSrc && (
                                <image
                                x="20%"
                                y="20%"
                                xlinkHref={imageSrc}
                                width="100"
                                height="100"
                                />
                            )}
                            {!imageSrc && tempImageSrc && (
                                <image
                                x="20%"
                                y="20%"
                                xlinkHref={`${DOMAIN}/files/images/users/${tempImageSrc}`}
                                width="100"
                                height="100"
                                />
                            )}
                            {!imageSrc && !tempImageSrc && (
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
            <div className="row g-3 align-items-center mb-2">
                    <div className="col-12 text-center">
                    <p style={{margin: '0'}}><b>Account Credentials</b></p>
                </div>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-4">
                    <label htmlFor="user-email" className="col-form-label">Email:<span className='form-required'>*</span></label>
                    <input type="email" id="user-email" name="user-email" className="form-control" value={formData['user-email'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter email" onChange={handleChange} disabled={isEdit} />
                </div>
                <div className="col-4">
                    <label htmlFor="user-password" className="col-form-label">Password:<span className='form-required'>*</span></label>
                    <input type="password" id="user-password" name="user-password" className="form-control" value={formData['user-password'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter password" onChange={handleChange} disabled={isEdit}/>
                </div>
                <div className="col-4">
                <label htmlFor="user-type" className="col-form-label">User Type:<span className='form-required'>*</span></label>
                    <select className="form-select" name='user-type' id='user-type' 
                        onChange={handleChange} value={formData['user-type'] || ''}>
                        <option value="" disabled hidden>Select User Type</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Jail Officer">Jail Officer</option>
                        <option value="Concessionaire Officer">Concessionaire Officer</option>
                    </select>
                </div>
            </div>
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
                </form>
        </>
    )

    const userModalFooter = (
        <>
            <div className="d-flex justify-content-end align-items-center">
            <p className="error-message">{errorMessage}</p>
                <button type="button" className="link-btn" onClick={() => {
                    stateControl((prev) => !prev)
                    
                    }} disabled={buttonState}>
                    Discard
                    </button>
                <button type="button" className="main-btn" onClick={handleSubmit} disabled={buttonState}>Submit</button>
            </div>
            
        </>
    )
    return <Modal 
    headerContent={userModalHeader} 
    bodyContent={userModalBody} 
    footerContent={userModalFooter} 
    stateChecker={stateChecker} 
    stateControl={stateControl}
    customZIndex={20}
    />
}