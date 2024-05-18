import React, { useState } from "react";
import '../../../../../styles/navigation-bars/checkout-bar/general.css';
import { SectionTitle } from "../../../../../components";
import CheckoutList from './checkout-list.jsx'
export default function CheckoutTable(props){
    const {listExtend, setListExtend, openModal} = props

    return(
        <>
            <div className="checkout-bar"
            style={{ '--checkout-bar-width': !listExtend ? '700px' : '0px' }}
            >
                <button className="toggle-checkout-button" onClick={() => setListExtend((prev) => !prev)}>
                    <i className="fa-solid fa-chevron-left button-icon-rotate" style={{transform: listExtend ? 'rotate(180deg)' : ''}}></i>        
                </button>
                <div className="mx-4">
                    <SectionTitle  title="Checkout List" icon="fa-solid fa-receipt"/>
                    <hr></hr>
                    <CheckoutList fromModal={true}/>
                    <hr></hr>
                    <div className="d-flex justify-content-between">
                        <h4>Total: </h4>
                        <h4>XX.XX </h4>
                    </div>
                    <div className="d-flex justify-content-end my-2">
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