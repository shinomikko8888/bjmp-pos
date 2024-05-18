import React from "react";
import { DOMAIN } from "../../../../../../constants";

export default function CheckoutListItem(props){
    const {fromModal} = props
    return(
        <>
            <div className="checkout-list-item d-flex align-items-center justify-content-between" >
                <div className="pos-button-image-container d-flex align-items-center">
                    <img className="pos-button-image" src={`${DOMAIN}/files/images/items/1714666580028_1SoapSafeguard_MalolosCityJail.jpg`} width={80}></img>
                    <div>
                        <h6 className="m-0 p-0">Soap</h6>
                        <p className="m-0 p-0">Safeguard</p>
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <h6 className="m-0 p-0">1</h6>
                    <h6 className="my-0 p-0 mx-3">20.00</h6>
                </div>
                {
                    fromModal && (
                        <div className="d-flex justify-content-end align-items-center action-buttons">
                            <p className="mx-1">
                                <i className="fa-solid fa-pen-to-square icon-hover "></i>
                                <span className='icon-tooltip'>Edit Quantity</span>
                            </p>
                            <p className="mx-1">
                                <i className="fa-solid fa-trash icon-hover"></i>
                                <span className='icon-tooltip'>Remove Item</span>
                            </p>
                        </div>
                    )
                }
            </div>
        </>
    )
}