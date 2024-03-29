import React, {useState, useRef, useEffect} from "react";
import { Modal } from "../../../../components";
import '../../../../styles/buttons/general.css'

export default function PDLModal({stateChecker, stateControl, isEdit}){
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef(null);
    const handleSvgClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click(); // Trigger click on the file input
        }
    };
  const rectWidth = imageSrc ? 162 : 502; // Adjust width based on imageSrc
  const rectHeight = imageSrc ? 162 : 162; // Adjust height based on imageSrc

    const pdlModalHeader = (
        <div className='row w-100'>
            <div className='col-12 d-flex align-items-center'>
            <i className={`${ isEdit ? 'fa-solid fa-pen' : 'fa-solid fa-plus'}`}></i>
            <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>{`${isEdit ? 'Edit' : 'Create'}`} PDL Modal</h6>
            </div>
        </div>
    );
    const pdlModalBody = (
        <>
            <div className="row d-flex justify-content-center" style={{ display: 'flex' }}>
                <div className="col-12 mb-4" >
                <svg xmlns="http://www.w3.org/2000/svg" style={{margin: '0', padding: '0'}} width={rectWidth+1} height={rectHeight+1} viewBox={`"0 0 ${rectWidth+1} ${rectHeight+1}"`} onClick={handleSvgClick} fill="none">
                            <rect x="0.5" y="0.5" width={rectWidth} height={rectHeight} rx="41" fill="white" stroke="#9D9D9D"
                            strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />
                            {imageSrc && (
                                <image
                                x="20%"
                                y="20%"
                                xlinkHref={imageSrc}
                                width="100"
                                height="100"
                                />
                            )}
                            {!imageSrc && (
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
                    onChange={'handleChange'}
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
                <label htmlFor="pdl_firstname" className="col-form-label">First Name:</label>
                <input type="text" id="pdl_firstname" name="pdl_firstname" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter first name" onChange={'handleChange'} />
                </div>
                <div className="col-6">
                <label htmlFor="pdl_lastname" className="col-form-label">Last Name:</label>
                <input type="text" id="pdl_lastname" name="pdl_lastname" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter last name" onChange={'handleChange'} />
                </div>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-6">
                <label htmlFor="pdl_middlename" className="col-form-label">Middle Name:</label>
                <input type="text" id="pdl_middlename" name="pdl_middlename" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter middle name" onChange={'handleChange'} />
                </div>
                <div className="col-6">
                <label htmlFor="pdlNo" className="col-form-label">PDL No:</label>
                <input type="text" id="pdlNo" name="pdlNo" className="form-control" maxLength={6} style={{ boxShadow: 'none' }} placeholder="Enter PDL No" onChange={'handleChange'} />
                </div>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-4">
                <label htmlFor="age" className="col-form-label">Age:</label>
                <input type="number" id="age" name="age" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter age" onChange={'handleChange'} />
                </div>
                <div className="col-8" style={{ display: 'flex', flexDirection: 'column' }}>
                <label className="col-form-label">Gender:</label>
                <div className='row'>
                    
                    <div className={`col-4 mt-2`}>
                    <div className="form-check" style={{ display: 'flex' }}>
                    <input
                                value="Male"
                                type="radio"
                                name="gender"
                                id="genderMale"
                                style={{ boxShadow: 'none', width: '12px', height: '18px' }} // Adjust the size as needed
                                onChange={'handleChange'}
                                />
                                <label htmlFor="genderMale" style={{ marginLeft: '10px', marginBottom: '0' }}>
                                Male
                                </label>
                    </div>
                    </div>
                    <div className={`col-4 mt-2`}>
                    <div className="form-check" style={{ display: 'flex' }}>
                    <input
                                value="Female"
                                type="radio"
                                name="gender"
                                id="genderFemale"
                                style={{ boxShadow: 'none', width: '12px', height: '18px' }} // Adjust the size as needed
                                onChange={'handleChange'}
                                />
                                <label htmlFor="genderFemale" style={{ marginLeft: '10px', marginBottom: '0' }}>
                                Female
                                </label>
                    </div>
                    </div>
                    <div className={`col-4 mt-2`}>
                    <div className="form-check" style={{ display: 'flex' }}>
                <input
                            value="Other"
                            type="radio"
                            name="gender"
                            id="genderOther"
                            style={{ boxShadow: 'none', width: '12px', height: '18px' }} // Adjust the size as needed
                            onChange={'handleChange'}
                            />
                            <label htmlFor="genderOther" style={{ marginLeft: '10px', marginBottom: '0' }}>
                            Other
                            </label>
                </div>
                    </div>
                    {/*formData.gender === 'Other' && (
                    <div className={`${formData.gender === 'Other' ? 'col-6': ''}`}>
                        <div className="form-check" style={{ display: 'flex' }}>
                            <input
                            type="text"
                            name="other_gender"
                            className="form-control"
                            style={{ boxShadow: 'none'}}
                            placeholder="Enter other gender"
                            onChange={'handleChange'}
                            />
                        </div>
                        </div>
                    )*/}
                </div>
                
                
                </div>
                
            </div>
            <div className="row g-3 align-items-center">
                    <div className="col-6">
                        <label htmlFor="cell_no" className="col-form-label">Cell No.:</label>
                        <input type="text" id="cell_no" name="cell_no" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter cell no." onChange={'handleChange'} />
                    </div>
                    <div className="col-6">
                        <label htmlFor="medical_condition" className="col-form-label">Medical Condition (Leave blank if none):</label>
                        <input type="text" id="medical_condition" name="medical_condition" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter condition." onChange={'handleChange'} />
                    </div>
                </div>
        </>
    )

    const pdlModalFooter = (
        <>
            <div className="d-flex justify-content-end">
                <button type="button" className="link-btn" onClick={() => stateControl((prev) => !prev)}>
                    Discard
                    </button>
                <button type="button" className="main-btn">Submit</button>
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