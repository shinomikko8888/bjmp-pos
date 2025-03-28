import React, {useState, useRef, useEffect} from "react";
import { Modal } from "../../../../../components";
import '../../../../../styles/buttons/general.css'
import { BRANCHES, DOMAIN } from "../../../../../constants";
import { fetchDataWrapper, handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../../utils";
export default function StockModal(props){
    
    const {stateChecker, stateControl, isEdit, isSubmittedControl, id, optionData} = props
    const [fieldType, setFieldType] = useState({
        typeFieldDefault: true,
        categoryFieldDefault: true,
    })
    const [imageSrc, setImageSrc] = useState(null);
    const [tempImageSrc, setTempImageSrc] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [userType, setUserType] = useState('');
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
        'pk': '',
        "item-type": '',
        "item-name": '',
        "item-category": '',
        "item-price": '',
        "item-critical-threshold": '',
        "item-branch-location": '',
        "item-image": '',
        "action": '',
        "active-email": '',
    });
    useEffect(() => {
        fetchUserType()
    }, [stateChecker])
    useEffect(() => {
        setFormData({
            'pk': '',
            "item-type": '',
            "item-name": '',
            "item-category": '',
            "item-price": '',
            "item-critical-threshold": '',
            "item-branch-location": '',
            "item-image": '',
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
            const branch = localStorage.getItem('bjmp-branch');
            setFormData({
                'pk': '',
                "item-type": '',
                "item-name": '',
                "item-category": '',
                "item-price": '',
                "item-critical-threshold": '',
                "item-branch-location": branch !== 'BJMPRO-III Main Office' ? branch : '',
                "item-image": '',
                "action": 'add-item',
                "active-email": localStorage.getItem('user-email'),
            })
            setImageSrc(null);
            setTempImageSrc(null);
        }
    }, [stateChecker, isEdit])
    const fetchUserType = async () => {
        try{
            if(localStorage.getItem('user-email')){
                const response = await fetchDataWrapper('get-user', [['em', `'${localStorage.getItem('user-email')}'`]])
                setUserType(response['user-type']);
            }
        } catch (error){
            console.error('Error fetching data: ', error);
        }
    }

    const fetchData = async () => {
        try{
            let params = [['id', id]];
            const bjmpBranch = localStorage.getItem('bjmp-branch');

            if (bjmpBranch !== 'BJMPRO-III Main Office') {
                params.push(['br', bjmpBranch]);
            }
            const data = await fetchDataWrapper('get-item', params);
            const userImage = data['item-image'] ? data['item-image'].replace('../api/files/images/items/', '') : '';
            setFormData({
                'pk': data['pk'] || null,
                "item-id": data['item-id'] || null,
                "item-type": data['item-type'] || null,
                "item-name": data['item-name'] || null,
                "item-category": data['item-category'] || null,
                "item-price": data['item-price'] || null,
                "item-critical-threshold": data['item-critical-threshold'] || null,
                "item-branch-location": data['item-branch-location'] || null,
                "item-image": data['item-image'] || null,
                "action": 'edit-item',
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
            } else {
                setButtonState(true);
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
            <form>
            <div className="row" style={{ display: 'flex' }}>
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
                                    xlinkHref={`${DOMAIN}/files/images/items/${tempImageSrc}`}
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
                    name='item-image'
                    id='item-image'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleChange}
                />
                </div>
            </div>
            <hr></hr>
            <div className="row g-3 align-items-center">
                <div className="col-11">
                    <label htmlFor="item-type" className="col-form-label">Product Type:</label>
                    {
                        fieldType.typeFieldDefault ? (
                            <input type="text" id="item-type" name="item-type" className="form-control" value={formData['item-type'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter product type" onChange={handleChange} />
                        ) :
                        (
                        <select id="item-type" name="item-type" className="form-select" style={{ boxShadow: 'none' }} value={formData['item-type'] || ''} onChange={handleChange}>
                            <option value="" disabled hidden>Select product type</option>
                            {optionData.map((opt, index) => (
                               <option key={index} value={opt.typeOptions}>{opt.typeOptions}</option>
                            ))}
                        </select>
                        )
                    }
                    
                    
                </div>

                <div className="col-1">
                    <button type="button" className="toggle-form-button" onClick={() => setFieldType(prevState => ({ ...prevState, typeFieldDefault: !prevState.typeFieldDefault }))}> 
                        <p className="icon-hover m-0 item-modal-field-state-button" style={{transform: fieldType.typeFieldDefault ? '' : 'rotate(45deg)'}}>+</p>
                        <span className='icon-tooltip'>{fieldType.typeFieldDefault ? 'Add New Product Type' : 'Select Existing Product Type'}</span>
                    </button>  
                </div>
                
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-12">
                <label htmlFor="item-name" className="col-form-label">Product Name:</label>
                <input type="text" id="item-name" name="item-name" className="form-control" value={formData['item-name'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter product name" onChange={handleChange} />
                </div>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-11">
                <label htmlFor="item-category" className="col-form-label">Product Category:</label>
                {
                        !fieldType.categoryFieldDefault ? (
                            <input type="text" id="item-category" name="item-category" className="form-control" value={formData['item-category'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter product category" onChange={handleChange} />
                        ) :
                        (
                            <select id="item-category" name="item-category" className="form-select" value={formData['item-category'] || ''} style={{ boxShadow: 'none' }} onChange={handleChange}>
                                <option value="" disabled hidden>Select product category</option>
                                <option value="Personal Hygiene Products">Personal Hygiene Products</option>
                                <option value="Consumables">Consumables</option>
                                <option value="Writing and Stationery Supplies">Writing and Stationery Supplies</option>
                                <option value="Clothing and Accessories">Clothing and Accessories</option>
                                <option value="Reading Materials">Reading Materials</option>
                                <option value="Miscellaneous Items">Miscellaneous Items</option>
                                {optionData.map((opt, index) => {
                                    if (!['Personal Hygiene Products', 'Consumables', 'Writing and Stationery Supplies', 'Clothing and Accessories', 'Reading Materials', 'Miscellaneous Items'].includes(opt.categoryOptions)) {
                                    return (
                                        <option key={index} value={opt.categoryOptions}>{opt.categoryOptions}</option>
                                    );
                                    } else {
                                    return null; 
                                    }
                                })}
                            </select>
                        )
                    }
                
                
                
                </div>
                <div className="col-1">

                    <button type="button" className="toggle-form-button" onClick={() => setFieldType(prevState => ({ ...prevState, categoryFieldDefault: !prevState.categoryFieldDefault }))}> 
                        <p className="icon-hover m-0 item-modal-field-state-button" style={{transform: fieldType.categoryFieldDefault ? '' : 'rotate(45deg)'}}>+</p>
                        <span className='icon-tooltip'>{!fieldType.categoryFieldDefault ? 'Choose Existing Category' : 'Add New Category'}</span>
                    </button>  
                </div>
            </div>
            <div className="row g-3 align-items-center">
                <div className="col-6">
                <label htmlFor="item-price" className="col-form-label">Product Price:</label>
                <input type="number" id="item-price" name="item-price" className="form-control" value={formData['item-price'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter product price" onChange={handleChange} />
                </div>
                <div className="col-6">
                <label htmlFor="item-critical-threshold" className="col-form-label">Product Critical Threshold:</label>
                <input type="number" id="item-critical-threshold" name="item-critical-threshold" className="form-control" value={formData['item-critical-threshold'] || ''} style={{ boxShadow: 'none' }} placeholder="Enter product critical threshold" onChange={handleChange} />
                </div>
            </div>
            {
                userType === 'Administrator' && (
                <div className="row g-3 align-items-center">
                    <div className="col-12">
                        <label htmlFor="item-branch-location" className="col-form-label">Product Unit Location</label>
                        <select
                            name="item-branch-location"
                            id="item-branch-location"
                            className="form-select"
                            value={formData['item-branch-location'] || ''}
                            style={{ width: '100%', boxShadow: 'none' }}
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
            </div>
                )
            }
            
            </form>
           
        </>
    )

    const stockModalFooter = (
        <> 
            <div className="d-flex justify-content-end">
                <span className="reminder-message text-muted my-2">{isEdit && 'Note: All instances of this item will also be edited!'}</span>
                
            </div>
            <div className="d-flex justify-content-end">
            <p className="error-message">{errorMessage}</p>
                <button type="button" className="link-btn" onClick={() => stateControl((prev) => !prev)} disabled={buttonState}>
                    Discard
                    </button>
                <button type="button" className="main-btn" onClick={handleSubmit} disabled={buttonState}>Submit</button>
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