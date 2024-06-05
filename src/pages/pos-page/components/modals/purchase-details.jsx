import React, { useEffect, useState } from "react";
import { Modal, SectionTitle } from "../../../../components";
import '../../../../styles/modals/transaction-modals.css'
import CheckoutList from "../sections/checkout-menu/checkout-list";
import SearchPdlForm from "./search-pdl-form";
import { handleChangeWrapper, handleSubmitWrapper, isFormDataValid } from "../../../../utils";
import { DOMAIN } from "../../../../constants";
export default function PurchaseDetails(props){
    const {stateControl, stateChecker, commodityData, totalPrice, isSubmittedControl, setResultValue} = props
    const [formData, setFormData] = useState({});
    const [isNamePopulated, setIsNamePopulated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        setFormData({
            'pdl-data': '',
            'purchase-type': '',
            'commodity-data': commodityData,
            'total-price': totalPrice,
            'action': 'purchase-item',
            'active-email': localStorage.getItem('user-email')
        })
        if(!stateChecker){
            eraseData('pdl-data')
            setIsNamePopulated(false);
            setSearchTerm('');
        }
       
        
    }, [stateChecker])



    const eraseData = (name) => {
        setFormData({
            ...formData,
            [`${name}`]: '',
        });
    }
    const calculateTotalQuantity = () => {
        let totalQuantity = 0;
        commodityData.forEach(item => {
            // Add the commodity-quantity to the totalQuantity
            totalQuantity += parseInt(item['commodity-quantity']) || 0;
        });
    
        // Check the totalQuantity
        if (totalQuantity === 0) {
            return 'no items';
        } else {
            return `${parseInt(totalQuantity)} item${parseInt(totalQuantity) !== 1 ? 's' : ''}`;
        }
    };
    
    const handleChange = async (event) => {
        await handleChangeWrapper(event, formData, setFormData)
    }
    const handleSubmit = async(event) => {
        try {
            if(!isFormDataValid(formData)){
                setErrorMessage('Please fill out all fields!')
            } else {
                if (formData['purchase-type'] === 'Permission') {
                    if (formData['permission']) {
                        setErrorMessage('');
                        const pdlBalance = parseFloat(formData['pdl-data']['pdl-balance']).toFixed(2);
                        const totalPrice = parseFloat(formData['total-price']);
                        const resultValue = (pdlBalance - totalPrice).toFixed(2);
                        const response = await handleSubmitWrapper(event, formData, false);
                        if(response.success){
                            setResultValue(resultValue);
                            stateControl((prev) => !prev);
                            isSubmittedControl((prev) => !prev);
                            window.open(`${DOMAIN}/files/docs/receipts/purchase/${response.filepath}`, '_blank');
                        }
                        
                    } else {
                        setErrorMessage('Please tick the box before proceeding to payment!');
                        return;
                    }
                }
                else if (formData['purchase-type'] === 'Biometrics') {
                    if (formData['pdl-data']['pdl-fingerprint-id']) {
                        setErrorMessage('');
                        console.log(formData);
                        alert('Fingerprint Modal');
                    } else {
                        setErrorMessage('No fingerprint id detected.');
                        return;
                    }
                }
                    
                
            }
           
        } catch (error) {
            console.error('Error: ', error);
        }
    }
    const purchaseModalHeader = ( 
        <>
        <div className='row w-100'>
            <div className='col-12 d-flex align-items-center'>
            <i className='fa-solid fa-receipt'></i>
            <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>Purchase Details</h6>
            </div>
        </div>
        </>
    )
    const purchaseModalBody = (
        <>
            <div className="row">
                <div className="col-7"> 
                    <div className="col-12 d-flex align-items-center justify-content-between my-4">
                        <div className="col-5 d-flex align-items-center">
                            <i className="fa-solid fa-shopping-cart me-3"></i>
                            <div className="purchase-modal-text">
                                <h6 className="m-0">Items in Cart</h6>
                                <p className="m-0">You have {calculateTotalQuantity()} in your cart</p>
                            </div>
                        </div>
                        <div className="col-7 d-flex align-items-center">
                            <div className="purchase-modal-text col-3">
                            <h6 className="m-0">Sort by:</h6>
                            </div>
                            <select className="form-select"></select>
                        </div>
                    </div>
                    <hr></hr>
                    <CheckoutList fromModal={false} commodityData={commodityData}/>
                 </div>
                <div className="col-5">
                    <div className="purchase-modal-pdl">
                        <SectionTitle title="PDL Details" icon="fa-solid fa-user"/>
                        <hr></hr>
                        <SearchPdlForm formData={formData} setFormData={setFormData} handleChange={handleChange} totalPrice={totalPrice} eraseData={eraseData}
                        setIsNamePopulated={setIsNamePopulated} isNamePopulated={isNamePopulated} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                        <div className="d-flex justify-content-end mt-4">
                        <p className="error-message mx-3 white-text">{errorMessage}</p>
                            <button className="pay-now-button" onClick={handleSubmit}>Pay Now!</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
    const purchaseModalFooter = (
        <>
        
        </>
    )
    return(
        <>
            <Modal 
            headerContent={purchaseModalHeader}
            bodyContent={purchaseModalBody}
            footerContent={purchaseModalFooter}
            stateChecker={stateChecker} 
            stateControl={stateControl}
            customWidth={'60%'}
            customZIndex={25} 
            />
        </>
    )
}