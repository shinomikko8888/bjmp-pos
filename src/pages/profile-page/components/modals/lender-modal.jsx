import React, { useEffect, useState } from "react";
import { Modal } from "../../../../components";
import { fetchDataWrapper, handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../utils";

export default function LenderModal(props){
    const {stateChecker, stateControl, modifyControl, isSubmittedControl, pid, branchLocation, id} = props;
    const [errorMessage, setErrorMessage] = useState('');
    const [imageSrc, setImageSrc] = useState(null);
    const [formData, setFormData] = useState({
        'lender-first-name': '',
        'lender-middle-name': '',
        'lender-last-name': '',
        'lender-relationship': '',
        'lender-id-path': '',
    })

    useEffect(() => {
        setFormData({
            'lender-first-name': '',
            'lender-middle-name': '',
            'lender-last-name': '',
            'lender-relationship': '',
            'lender-id-path': '',
        })
        console.log(pid);
        setErrorMessage('');
        setImageSrc(null);
        if(modifyControl.edit && stateChecker){
            fetchData();
        } else {
            setFormData({
                'lender-first-name': '',
                'lender-middle-name': '',
                'lender-last-name': '',
                'lender-relationship': '',
                'lender-id-path': '',
                'lender-related-pdl': pid,
                'lender-branch-location': branchLocation,
                "action": 'add-lender',
                "active-email": localStorage.getItem('user-email'),
            })
            setImageSrc(null);
        }
    }, [stateChecker, modifyControl.edit])

    const fetchData = async (event) => {
        try{
            let params = [['id', id], ['br', branchLocation], ['pid', pid]]
            
            const data = await fetchDataWrapper('get-lender', params);
            const lenderId = data['lender-id-path'] ? data['lender-id-path'].replace('../api/files/docs/ids/', '') : '';
            setFormData({
                'lender-id': data['lender-id'] || '',
                'lender-first-name': data['lender-first-name'] || '',
                'lender-middle-name': data['lender-middle-name'] || '',
                'lender-last-name': data['lender-last-name'] || '',
                'lender-relationship': data['lender-relationship'] || '',
                'lender-related-pdl': data['lender-related-pdl'] || '',
                'lender-branch-location': data['lender-branch-location'] || '',
                "action": 'edit-lender',
                "active-email": localStorage.getItem('user-email'),
            })
        }
        catch (error){
            console.error('Error fetching data: ', error);
        }
    }

    const handleChange = async (event) => {
        const { name, value, type } = event.target;
        if (type === 'file') {
            const file = event.target.files[0];
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
    const lenderModalHeader = (
        <div className='row w-100'>
            <div className='col-12 d-flex align-items-center'>
            <i className={`${ 
                !modifyControl.view && modifyControl.edit ? 'fa-solid fa-pen' 
                : !modifyControl.view && modifyControl.add ?  'fa-solid fa-plus'
                : modifyControl.view && (!modifyControl.add || !modifyControl.edit) ? 'fa-solid fa-hand-holding-dollar' : '' }`}></i>
            <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>{`${
                !modifyControl.view && modifyControl.edit ? 'Edit' 
                : !modifyControl.view && modifyControl.add ?  'Add'
                : modifyControl.view && (!modifyControl.add || !modifyControl.edit) ? 'View' : '' }`} Creditor Entry</h6>
            </div>
        </div>
    )
    const lenderModalBody = (
        <>
            <form>
                <div className="row g-3 align-items-center">
                    <div className="col-4">
                    <label htmlFor="lender-first-name" className="col-form-label">First Name:<span className='form-required'>*</span></label>
                    <input type="text" id="lender-first-name" name="lender-first-name" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter first name" value={formData['lender-first-name'] || ''} onChange={handleChange} />
                    </div>
                    <div className="col-4">
                    <label htmlFor="lender-middle-name" className="col-form-label">Middle Name:<span className='form-required'>*</span></label>
                    <input type="text" id="lender-middle-name" name="lender-middle-name" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter middle name" value={formData['lender-middle-name'] || ''} onChange={handleChange} />
                    </div>
                    <div className="col-4">
                    <label htmlFor="lender-last-name" className="col-form-label">Last Name:<span className='form-required'>*</span></label>
                    <input type="text" id="lender-last-name" name="lender-last-name" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter last name" value={formData['lender-last-name'] || ''} onChange={handleChange} />
                    </div>
                </div>
                <div className="row g-3 align-items-center">
                    <div className={`col-${modifyControl.edit ? '12' : '6'}`}>
                    <label htmlFor="lender-relationship" className="col-form-label">Relationship with PDL:<span className='form-required'>*</span></label>
                    <input type="text" id="lender-relationship" name="lender-relationship" className="form-control" style={{ boxShadow: 'none' }} placeholder="Enter relationship" value={formData['lender-relationship'] || ''} onChange={handleChange} />
                    </div>
                    {
                        !modifyControl.edit && (
                            <div className="col-6">
                                <label htmlFor="lender-id-path" className="col-form-label">Creditor ID:<span className='form-required'>*</span></label>
                                <input type="file" id="lender-id-path" name="lender-id-path" className="form-control" style={{ boxShadow: 'none' }} onChange={handleChange} />
                            </div>
                        )
                    }
                   
                </div>
            </form>
        </>
    )

    const lenderModalFooter = (
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

    return(
        <>
            <Modal 
            headerContent={lenderModalHeader}
            bodyContent={lenderModalBody}
            footerContent={lenderModalFooter}
            stateChecker={stateChecker}
            stateControl={stateControl}
            customWidth={'65%'}
            />
        </>
    )
}