import React, { useState } from "react";
import '../../../../../styles/navigation-bars/checkout-bar/general.css';
import { SectionTitle } from "../../../../../components";
import CheckoutList from './checkout-list.jsx'
export default function CheckoutTable(props){
    const {openModal, commodityData, fetchCommodityData, errorMessage, setErrorMessage, totalPrice} = props
    
    return(
        <>
            <div className="pos-table-container p-4 checkout-margin"
            
            >
               {/* <button className="toggle-checkout-button" onClick={() => setListExtend((prev) => !prev)}>
                    <i className="fa-solid fa-chevron-left button-icon-rotate" style={{transform: listExtend ? 'rotate(180deg)' : ''}}></i>        
    </button>*/}
                <div className="mx-4">
                    <SectionTitle  title="Checkout List" icon="fa-solid fa-receipt"/>
                    <hr></hr>
                    <CheckoutList fromModal={true} commodityData={commodityData} 
                    fetchCommodityData={fetchCommodityData} setErrorMessage={setErrorMessage}
                    />
                    <hr></hr>
                    <div className="d-flex justify-content-between">
                        <h4>Total: </h4>
                        <h4>₱{totalPrice}</h4>
                    </div>
                    <div className="d-flex justify-content-end my-2">
                        <p className="error-message mx-3">{errorMessage}</p>
                        <button onClick={() => openModal()} className="main-btn">
                            <i className="fa-solid fa-shopping-cart icon-hover"></i>
                            <span className="icon-tooltip">Checkout</span>
                        </button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}