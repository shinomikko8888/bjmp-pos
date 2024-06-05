import React, { useEffect, useState } from "react";
import { DOMAIN } from "../../../../../../constants";
import { handleSubmitWrapper } from "../../../../../../utils";

export default function CheckoutListItem(props){
    const {fromModal, data, fetchCommodityData, setErrorMessage} = props
    const [formData, setFormData] = useState({
        "commodity-item-id": '',
        "commodity-type": '',
        "commodity-name": '',
        'action': 'delete-commodity',
        'active-email': localStorage.getItem('user-email')
    });

    useEffect(() => {
        setFormData({
            "commodity-item-id": data['pk'] || '',
            "commodity-type": data['commodity-type'] || '',
            "commodity-name": data['commodity-name'] || '',
            'action': 'delete-commodity',
            'active-email': localStorage.getItem('user-email')
        });
    }, [data]);
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setErrorMessage('');
            await handleSubmitWrapper(event, formData, true);
            fetchCommodityData();
        } catch (error) {
            console.error('Error: ', error);
        }
    };
    return(
        <>
            <div className="checkout-list-item d-flex align-items-center justify-content-between mb-3" >
                <div className="pos-button-image-container d-flex align-items-center">
                    <img className="pos-button-image" src={`${DOMAIN}/files/images/items/${data['commodity-image']}`} width={80} height={80}></img>
                    <div className="mx-3">
                        <h6 className="m-0 p-0">{data['commodity-type']}</h6>
                        <p className="m-0 p-0">{data['commodity-name']}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <h6 className="m-0 p-0">{data['commodity-quantity']}</h6>
                    <h6 className="my-0 p-0 mx-3">₱{(data['commodity-price'] * data['commodity-quantity']).toFixed(2)}</h6>
                </div>
                {
                    fromModal && (
                        <div className="d-flex justify-content-end align-items-center action-buttons">
                            <p className="mx-1" >
                                <i className="fa-solid fa-trash icon-hover icon-large" onClick={handleSubmit}></i>
                                <span className='icon-tooltip' >Remove Item</span>
                            </p>
                        </div>
                    )
                }
            </div>
        </>
    )
}