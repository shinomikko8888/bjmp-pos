import React, {useState, useRef, useEffect} from "react";
import { Modal } from "../../../../../components";
import '../../../../../styles/buttons/general.css'
import { BRANCHES } from "../../../../../constants";
export default function StockModal({stateChecker, stateControl, isEdit}){
    const [imageSrc, setImageSrc] = useState(null);
    const fileInputRef = useRef(null);
    const handleSvgClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click(); // Trigger click on the file input
        }
    };
  const rectWidth = imageSrc ? 162 : 502; // Adjust width based on imageSrc
  const rectHeight = imageSrc ? 162 : 162; // Adjust height based on imageSrc

    const stockModalHeader = (
        <div className='row w-100'>
            <div className='col-12 d-flex align-items-center'>
            <i className={`${ isEdit ? 'fa-solid fa-pen' : 'fa-solid fa-plus'}`}></i>
            <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>{`${isEdit ? 'Edit' : 'Create'}`} Stock Entry</h6>
            </div>
        </div>
    );
    const stockModalBody = (
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
                    name='itemImage'
                    id='itemImage'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={'handleChange'}
                />
                </div>
            </div>
            <hr></hr>
            <div className="row g-3 align-items-center">
                <div className="col-11">
                    <label htmlFor="itemType" className="col-form-label">Product Type:</label>
                    <input type="text" id="itemType" name="itemType" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter product type" onChange={'handleChange'} />
                </div>
                <div className="col-1">

                    <button type="button" className="toggle-form-button"> 
                        <p className="icon-hover m-0">+</p>
                        <span className='icon-tooltip'>Add New Product Type</span>
                    </button>  
                </div>
                
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-12">
                <label htmlFor="itemName" className="col-form-label">Product Name:</label>
                <input type="text" id="itemName" name="itemName" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter product name" onChange={'handleChange'} />
                </div>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-11">
                <label htmlFor="itemProdCateg" className="col-form-label">Product Category:</label>
                <select id="itemProdCateg" name="itemProdCateg" className="form-select" style={{ boxShadow: 'none' }} >
                    <option value="" disabled hidden>Select product category</option>
                    <option value="Personal Hygiene Products">Personal Hygiene Products</option>
                    <option value="Consumables">Consumables</option>
                    <option value="Writing and Stationery Supplies">Writing and Stationery Supplies</option>
                    <option value="Clothing and Accessories">Clothing and Accessories</option>
                    <option value="Reading Materials">Reading Materials</option>
                    <option value="Miscellaneous Items">Miscellaneous Items</option>
                </select>
                
                </div>
                <div className="col-1">

                    <button type="button" className="toggle-form-button"> 
                        <p className="icon-hover m-0" style={{transform: 'rotate(45deg)'}}>+</p>
                        <span className='icon-tooltip'>Choose Existing Category</span>
                    </button>  
                </div>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-6">
                <label htmlFor="itemPrice" className="col-form-label">Product Price:</label>
                <input type="number" id="itemPrice" name="itemPrice" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter product price" onChange={'handleChange'} />
                </div>
                <div className="col-6">
                <label htmlFor="itemCritical" className="col-form-label">Product Critical Threshold:</label>
                <input type="text" id="itemCritical" name="itemCritical" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter product critical threshold" onChange={'handleChange'} />
                </div>
            </div>
            <div className="row g-3 align-items-center">
                    <div className="col-12">
                        <label htmlFor="bjmp_branch" className="col-form-label">Product Branch Location</label>
                        <select
                            name="itemBranch"
                            id="itemBranch"
                            className="form-select"
                            style={{ width: '100%', boxShadow: 'none' }}
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
            </div>
        </>
    )

    const stockModalFooter = (
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
    headerContent={stockModalHeader} 
    bodyContent={stockModalBody} 
    footerContent={stockModalFooter} 
    stateChecker={stateChecker} 
    stateControl={stateControl}
    customZIndex={20}
    />
}