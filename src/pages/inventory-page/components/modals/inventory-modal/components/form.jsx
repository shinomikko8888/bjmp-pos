import React, { useEffect, useState } from "react";
import { handleChangeWrapper } from "../../../../../../utils";

export default function InventoryForm(props){
    const {itemData, stateChecker, isView, formData, setFormData, formattedDate, formattedTime} = props
    const [isExpirationDate, setExpirationDate] = useState(false);
    useEffect(() => {
        if (!isExpirationDate) {
            // When the expiration date is disabled, set it to null
            setFormData((prevData) => ({
                ...prevData,
                'instance-expiration-date': null,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                'instance-expiration-date': formData['instance-expiration-date'] || '', // Use existing value or set to an empty string
            }));
        }

        // Set other form fields
        setFormData((prevData) => ({
            ...prevData,
            'instance-item-pk': itemData['pk'] || '',
            'instance-date-time': `${formattedDate} ${formattedTime}`,
            'instance-remaining-stock': '',
            'action': 'add-instance',
            'active-email': localStorage.getItem('user-email'),
            'instance-branch-location': itemData['item-branch-location'] || '',
        }));
    }, [stateChecker, isView, itemData, isExpirationDate, formattedDate, formattedTime]);




    const handleChange = async (event) => {
        await handleChangeWrapper(event, formData, setFormData);
        console.log(formData)
    }
    return(
        <>
            <form>
            <div className="row g-2 align-items-center mb-1">
                            <div className="col-12">
                                <label htmlFor="instanceDate" className="col-form-label">
                                    Date Today:
                                </label>
                                <input
                                    type="date"
                                    id="instance-date"
                                    name="instance-date"
                                    className="form-control"
                                    style={{ boxShadow: "none" }}
                                    value={formattedDate}
                                    disabled
                                />
                                </div>
                    </div>
                    <div className="row g-2 align-items-center mb-1">
                        <div className="col-12">
                        <label htmlFor="instanceTime" className="col-form-label">
                            Time:
                        </label>
                        <input
                            type="time"
                            id="instance-time"
                            name="instance-time"
                            className="form-control"
                            style={{ boxShadow: "none" }}
                            value={formattedTime}
                            disabled
                        />
                        </div>
                    </div>
                    <div className="row g-2 align-items-center mb-1">
                        <div className="col-11">
                        <label htmlFor="instance-expiration-date" className="col-form-label">
                            Expiration Date:
                        </label>
                        <input
                            type="date"
                            id="instance-expiration-date"
                            name="instance-expiration-date"
                            className="form-control"
                            style={{ boxShadow: "none" }}
                            min={formattedDate}
                            value={formData['instance-expiration-date'] || ''}
                            onChange={handleChange}
                            disabled={isExpirationDate}
                        />
                        </div>
                        <div className="col-1">
                            <button type="button" className="toggle-form-button" onClick={() => setExpirationDate((prev) => !prev)}> 
                                <p className="icon-hover m-0 item-modal-field-state-button" style={{transform: isExpirationDate ? '' : 'rotate(45deg)'}}>+</p>
                                <span className='icon-tooltip'>{!isExpirationDate ? 'No Expiration Date' : 'Expiration Date Available'}</span>
                            </button>  
                        </div>
                    </div>
                    <div className="row g-2 align-items-center mb-1">
                        <div className="col-12">
                        <label htmlFor="instanceQuantity" className="col-form-label">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="instance-remaining-stock"
                            name="instance-remaining-stock"
                            className="form-control"
                            style={{ boxShadow: "none" }}
                            value={formData['instance-remaining-stock'] || ''}
                            placeholder="Enter quantity"
                            onChange={handleChange}
                        />
                        </div>
                    </div>
            </form>
        </>
    )
}