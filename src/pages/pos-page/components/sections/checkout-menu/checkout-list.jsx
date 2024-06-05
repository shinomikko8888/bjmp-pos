import React from "react";
import CheckoutListItem from "./list-items";
import { empty_result } from "../../../../../assets/svg";

export default function CheckoutList(props){
    const {fromModal, commodityData, fetchCommodityData, setErrorMessage} = props
    if (commodityData.length === 0) {
        return (
            <div className="checkout-list d-flex flex-column align-items-center justify-content-center">
                <img src={empty_result} width={300} alt="Empty Result" />
                <div className='table-display-empty mt-2 text-center'>
                    There is no data present at the moment.
                </div>
            </div>
        );
    }
    return(
        <>
           <div className="checkout-list">
           {
                commodityData.map((data, index) => (
                    <CheckoutListItem key={index} fromModal={fromModal} data={data} fetchCommodityData={fetchCommodityData} setErrorMessage={setErrorMessage}/>
                ))
            }
                
           </div>
        </>
    )
}