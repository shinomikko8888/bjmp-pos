import React, {useState, useRef, useEffect} from "react";
import { Modal } from "../../../../components";
import '../../../../styles/buttons/general.css'
import { BRANCHES, DOMAIN } from "../../../../constants";
import { fetchDataWrapper, handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../utils";
export default function PDLModal(props){
    const {stateChecker, stateControl, isEdit, isSubmittedControl, id} = props
    const [imageSrc, setImageSrc] = useState(null);
    const [tempImageSrc, setTempImageSrc] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);
    const handleSvgClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click(); // Trigger click on the file input
        }
    };
    const rectWidth = imageSrc || tempImageSrc ? 162 : 502; // Adjust width based on imageSrc
    const rectHeight = imageSrc || tempImageSrc ? 162 : 162; // Adjust height based on imageSrc
    const [formData, setFormData] = useState({
        "pdl-first-name": '',
        "pdl-middle-name": '',
        "pdl-last-name": '',
        "pdl-id": '',
        "pdl-age": '',
        "pdl-gender": '',
        "pdl-other-gender": '',
        "pdl-cell-no": '',
        "pdl-medical-condition": '',
        "pdl-branch-location": '',
        "pdl-image": '',
        "action": '',
        "active-email": '',
    })
    useEffect(() => {
        setFormData({
            "pdl-first-name": '',
            "pdl-middle-name": '',
            "pdl-last-name": '',
            "pdl-id": '',
            "pdl-age": '',
            "pdl-gender": '',
            "pdl-other-gender": '',
            "pdl-cell-no": '',
            "pdl-medical-condition": '',
            "pdl-branch-location": '',
            "pdl-image": '',
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
                "pdl-first-name": '',
                "pdl-middle-name": '',
                "pdl-last-name": '',
                "pdl-id": '',
                "pdl-age": '',
                "pdl-gender": '',
                "pdl-other-gender": '',
                "pdl-cell-no": '',
                "pdl-medical-condition": '',
                "pdl-branch-location": '',
                "pdl-image": '',
                "action": 'add-pdl',
                "active-email": localStorage.getItem('user-email'),
            })
            setImageSrc(null);
            setTempImageSrc(null);
        }

    }, [stateChecker, isEdit])
    
    const fetchData = async () => {
        try{
            let params = [['id', id]];
            const bjmpBranch = localStorage.getItem('bjmp-branch');

            if (bjmpBranch !== 'BJMPRO-III Main Office') {
                params.push(['br', bjmpBranch]);
            }

            const data = await fetchDataWrapper('get-pdl', params);
            const userImage = data['pdl-image'] ? data['pdl-image'].replace('../api/files/images/pdls/', '') : '';
            setFormData({
                "pdl-first-name": data['pdl-first-name'] || '',
                "pdl-middle-name": data['pdl-middle-name'] || '',
                "pdl-last-name": data['pdl-last-name'] || '',
                "pdl-id": data['pdl-id'] || '',
                "pdl-age": data['pdl-age'] || '',
                "pdl-gender": data['pdl-gender'] || '',
                "pdl-other-gender": data['pdl-other-gender'] || '',
                "pdl-cell-no": data['pdl-cell-no'] || '',
                "pdl-medical-condition": data['pdl-medical-condition'] || '',
                "pdl-branch-location": data['pdl-branch-location'] || '',
                "pdl-image": data['pdl-image'] || '',
                "action": 'edit-pdl',
                "active-email": localStorage.getItem('user-email'),
            });
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
            }
            const response = await handleSubmitWrapper(event, formData, true);
            if (response.success) {
                setErrorMessage('');
                stateControl((prev) => !prev)
                isSubmittedControl((prev) => !prev)
            } else {
              setErrorMessage(response.message || "System error"); 
            }
          } catch (error) {
            console.error('Error: ', error);
            setErrorMessage(`Error: ${error}`);
          }
    }
    const pdlModalHeader = (
        <div className='row w-100'>
            <div className='col-12 d-flex align-items-center'>
            <i className={`${ isEdit ? 'fa-solid fa-pen' : 'fa-solid fa-plus'}`}></i>
            <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>{`${isEdit ? 'Edit' : 'Create'}`} PDL Entry</h6>
            </div>
        </div>
    );
    const pdlModalBody = (
        <>
            <form>
                <div className="row " style={{ display: 'flex' }}>
                    <div className="col-12 mb-4 d-flex justify-content-center" >
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
                                    xlinkHref={`${DOMAIN}/files/images/pdls/${tempImageSrc}`}
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
                        name='pdl-image'
                        id='pdl-image'
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
                    <p style={{margin: '0'}}><b>Basic Info</b></p>
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                    <div className="col-6">
                    <label htmlFor="pdl-first-name" className="col-form-label">First Name:<span className='form-required'>*</span></label>
                    <input type="text" id="pdl-first-name" name="pdl-first-name" className="form-control" style={{ boxShadow: 'none' }} value={formData['pdl-first-name'] || ''} placeholder="Enter first name" onChange={handleChange} />
                    </div>
                    <div className="col-6">
                    <label htmlFor="pdl-last-name" className="col-form-label">Last Name:<span className='form-required'>*</span></label>
                    <input type="text" id="pdl-last-name" name="pdl-last-name" className="form-control" style={{ boxShadow: 'none' }} value={formData['pdl-last-name'] || ''} placeholder="Enter last name" onChange={handleChange} />
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                    <div className="col-6">
                    <label htmlFor="pdl-middle-name" className="col-form-label">Middle Name:<span className='form-required'>*</span></label>
                    <input type="text" id="pdl-middle-name" name="pdl-middle-name" className="form-control" style={{ boxShadow: 'none' }} value={formData['pdl-middle-name'] || ''} placeholder="Enter middle name" onChange={handleChange} />
                    </div>
                    <div className="col-6">
                    <label htmlFor="pdl-id" className="col-form-label">PDL No:<span className='form-required'>*</span></label>
                    <input type="text" id="pdl-id" name="pdl-id" className="form-control" maxLength={6} style={{ boxShadow: 'none' }} value={formData['pdl-id'] || ''} placeholder="Enter PDL No" onChange={handleChange} disabled={isEdit}/>
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                    <div className="col-4">
                    <label htmlFor="pdl-age" className="col-form-label">Age:<span className='form-required'>*</span></label>
                    <input type="number" id="pdl-age" name="pdl-age" className="form-control" style={{ boxShadow: 'none' }} value={formData['pdl-age'] || ''} placeholder="Enter age" onChange={handleChange} />
                    </div>
                    <div className="col-8" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label className="col-form-label">Gender:<span className='form-required'>*</span></label>
                    <div className='row'>
                        
                        <div className={`col-${formData['pdl-gender'] === 'Other' ? '2':'4'} mt-2`}>
                        <div className="form-check" style={{ display: 'flex' }}>
                        <input
                                    value="Male"
                                    type="radio"
                                    name="pdl-gender"
                                    id="genderMale"
                                    checked={formData['pdl-gender'] === 'Male'}
                                    style={{ boxShadow: 'none', width: '12px', height: '18px' }} // Adjust the size as needed
                                    onChange={handleChange}
                                    />
                                    <label htmlFor="genderMale" style={{ marginLeft: '10px', marginBottom: '0' }}>
                                    Male
                                    </label>
                        </div>
                        </div>
                        <div className={`col-${formData['pdl-gender'] === 'Other' ? '2':'4'} mt-2`}>
                        <div className="form-check" style={{ display: 'flex' }}>
                        <input
                                    value="Female"
                                    type="radio"
                                    name="pdl-gender"
                                    id="genderFemale"
                                    checked={formData['pdl-gender'] === 'female'}
                                    style={{ boxShadow: 'none', width: '12px', height: '18px' }} // Adjust the size as needed
                                    onChange={handleChange}
                                    />
                                    <label htmlFor="genderFemale" style={{ marginLeft: '10px', marginBottom: '0' }}>
                                    Female
                                    </label>
                        </div>
                        </div>
                        <div className={`col-${formData['pdl-gender'] === 'Other' ? '2':'4'} mt-2`}>
                        <div className="form-check" style={{ display: 'flex' }}>
                    <input
                                value="Other"
                                type="radio"
                                name="pdl-gender"
                                id="genderOther"
                                checked={formData['pdl-gender'] === 'Other'}
                                style={{ boxShadow: 'none', width: '12px', height: '18px' }} // Adjust the size as needed
                                onChange={handleChange}
                                />
                                <label htmlFor="genderOther" style={{ marginLeft: '10px', marginBottom: '0' }}>
                                Other
                                </label>
                    </div>
                        </div>
                        {formData['pdl-gender'] === 'Other' && (
                        <div className={`${formData['pdl-gender'] === 'Other' ? 'col-6': ''}`}>
                            <div className="form-check" style={{ display: 'flex' }}>
                                <input
                                type="text"
                                name="pdl-other-gender"
                                className="form-control"
                                style={{ boxShadow: 'none'}}
                                placeholder="Enter other gender"
                                onChange={handleChange}
                                />
                            </div>
                            </div>
                        )}
                    </div>
                    
                    
                    </div>
                    
                </div>
                <div className="row g-3 align-items-center">
                        <div className="col-6">
                            <label htmlFor="pdl-cell-no" className="col-form-label">Cell No.:<span className='form-required'>*</span></label>
                            <input type="text" id="pdl-cell-no" name="pdl-cell-no" className="form-control" maxLength={4} style={{ boxShadow: 'none' }} value={formData['pdl-cell-no'] || ''} placeholder="Enter cell no." onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <label htmlFor="pdl-medical-condition" className="col-form-label">Medical Condition (Leave blank if none):</label>
                            <input type="text" id="pdl-medical-condition" name="pdl-medical-condition" className="form-control" style={{ boxShadow: 'none' }} value={formData['pdl-medical-condition'] || ''} placeholder="Enter condition." onChange={handleChange} />
                        </div>
                    </div>
                <div className="row g-3 align-items-center">
                        <div className="col-12">
                            <label htmlFor="pdl-branch-location" className="col-form-label">PDL Branch Location:<span className='form-required'>*</span></label>
                            <select
                                name="pdl-branch-location"
                                id="pdl-branch-location"
                                className="form-select"
                                value={formData['pdl-branch-location'] || ''}
                                style={{ width: '100%', boxShadow: 'none' }}
                                onChange={handleChange}
                            >
                                <option value="" disabled hidden>--Select Branch--</option> 
                                {BRANCHES.map(branch => (
                                    <optgroup key={branch.label} label={branch.label}>
                                        {branch.facilities.map((facility, subIndex) => (
                                            <option key={subIndex} value={facility}>{facility}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                </div>
            </form>
        </>
    )

    const pdlModalFooter = (
        <>
            <div className="d-flex justify-content-end">
            <p className="error-message">{errorMessage}</p>
                <button type="button" className="link-btn" onClick={() => stateControl((prev) => !prev)}>
                    Discard
                    </button>
                <button type="button" className="main-btn" onClick={handleSubmit}>Submit</button>
            </div>
            
        </>
    )

    return <Modal 
    headerContent={pdlModalHeader} 
    bodyContent={pdlModalBody} 
    footerContent={pdlModalFooter} 
    stateChecker={stateChecker} 
    stateControl={stateControl}
    customZIndex={20}
    />
}