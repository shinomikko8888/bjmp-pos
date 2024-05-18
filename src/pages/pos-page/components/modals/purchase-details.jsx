import React from "react";
import { Modal, SectionTitle } from "../../../../components";
import '../../../../styles/modals/transaction-modals.css'
import CheckoutList from "../sections/checkout-menu/checkout-list";
import SearchPdlForm from "./search-pdl-form";
export default function PurchaseDetails(props){
    const {stateControl, stateChecker} = props
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
                                <p className="m-0">You have 1 item in your cart</p>
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
                    <CheckoutList fromModal={false} />
                 </div>
                <div className="col-5">
                    <div className="purchase-modal-pdl">
                        <SectionTitle title="PDL Details" icon="fa-solid fa-user"/>
                        <hr></hr>
                        <SearchPdlForm/>
                        <div className="d-flex justify-content-end mt-4">
                            <button className="pay-now-button">Pay Now!</button>
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