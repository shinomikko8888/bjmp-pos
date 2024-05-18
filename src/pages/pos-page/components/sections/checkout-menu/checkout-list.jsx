import React from "react";
import CheckoutListItem from "./list-items";

export default function CheckoutList(props){
    const {fromModal} = props
    return(
        <>
           <div className="checkout-list">
                <CheckoutListItem fromModal={fromModal}/>
           </div>
        </>
    )
}