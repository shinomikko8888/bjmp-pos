import React, { useEffect } from "react";
import { handleChangeWrapper } from "../../../../../../utils";

export default function InventoryForm(props){
    const {itemData, stateChecker, isView, formData, setFormData, formattedDate, formattedTime} = props
    useEffect(() => {
        setFormData({
            'instance-type': itemData['item-type'] || '',
            'instance-name': itemData['item-name'] || '',
            'instance-date-time': `${formattedDate} ${formattedTime}`,
            'instance-expiration-date': '',
            'instance-remaining-stock': '',
            'action': 'add-instance',
            'active-email': localStorage.getItem('user-email'),
            'instance-branch-location': itemData['item-branch-location'] || '',
        })
    }, [stateChecker, isView, itemData])



    const handleChange = async (event) => {
        await handleChangeWrapper(event, formData, setFormData);
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
                        <div className="col-12">
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
                        />
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