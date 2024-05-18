import React, { useEffect, useState } from "react";
import { Modal } from "../../../../components";
import { descriptionCreator, fetchDataWrapper } from "../../../../utils";

export default function LogModal(props){
    const {stateChecker, stateControl, id} = props
    const [logData, setLogData] = useState({
        "log-date": '',
        "log-user": '',
        "log-action": '',
        "log-type": '',
        "log-data": [],
        "log-reason": ''
    })

    useEffect(() => {
        setLogData({
            "log-date": '',
            "log-user": '',
            "log-action": '',
            "log-type": '',
            "log-data": [],
            "log-reason": ''
        })
        if(stateChecker){
            fetchData();
        }
        else{
            setLogData({
                "log-date": '',
                "log-user": '',
                "log-action": '',
                "log-type": '',
                "log-data": [],
                "log-reason": ''
            })
        }
        
    }, [stateChecker])
    const formatFields = (fields) => {
        return Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join(', ');
    };
    const fetchData = async () => {
        
        try{
            const data = await fetchDataWrapper('get-log', [['id', id]]);
            const existingFields = 
            data[`log-${data['log-item-details'] ? 'item' 
            : data['log-instance-details'] ? "instance" 
            : data['log-pdl-details'] ? "pdl" 
            : data['log-user-details'] ? "user" : ''}-details`]['existingFields'] ? `From: ${formatFields(data[`log-${data['log-item-details'] ? 'item' 
            : data['log-instance-details'] ? "instance" 
            : data['log-pdl-details'] ? "pdl" 
            : data['log-user-details'] ? "user" : ''}-details`]['existingFields'])}. ` : '';
            const updatedFields = data[`log-${data['log-item-details'] ? 'item' 
            : data['log-instance-details'] ? "instance" 
            : data['log-pdl-details'] ? "pdl" 
            : data['log-user-details'] ? "user" : ''}-details`]['updatedFields'] ? `To ${formatFields(data[`log-${data['log-item-details'] ? 'item' 
            : data['log-instance-details'] ? "instance" 
            : data['log-pdl-details'] ? "pdl" 
            : data['log-user-details'] ? "user" : ''}-details`]['updatedFields'])} ` : '';
            setLogData({
                "log-date": data['log-date'] || '',
                "log-user": data['log-user'] || '',
                "log-action": data['log-action'],
                "log-type": data['log-item-details'] ? 'Item' 
                : data['log-instance-details'] ? "Instance" 
                : data['log-pdl-details'] ? "PDL" 
                : data['log-user-details'] ? "User" : '',
                "log-data": data['log-item-details'] ? `${existingFields}${updatedFields}`
                : data['log-instance-details'] ? `${existingFields}${updatedFields}`
                : data['log-pdl-details'] ? `${existingFields}${updatedFields}`
                : data['log-user-details'] ? `${existingFields}${updatedFields}` : [],
                "log-reason": data['log-reason'] || '',
            })

        }catch (error){
            console.error('Error fetching data: ', error);
          }
    }

    const logModalHeader = (
        <>
        <div className='row w-100'>
            <div className='col-12 d-flex align-items-center'>
            <i className={`fa-solid fa-clipboard-question`}></i>
            <h6 className='fw-bold fs-6 m-0 pe-4 ps-2 text-start'>Log Details</h6>
            </div>
        </div>
        </>
    )
    const logModalBody = (
        <>
            <div className="row g-3 align-items-center mb-2">
                <div className="col-12">
                    <label htmlFor="log-date" className="col-form-label d-block">
                      <b>Date and Time:</b> {logData['log-date']}
                    </label>
                    <label htmlFor="log-user" className="col-form-label d-block">
                      <b>Contributor:</b> {logData['log-user']}
                    </label>
                    <label htmlFor="log-action" className="col-form-label d-block">
                      <b>Type of Action:</b> {logData['log-action']}
                    </label>
                    <label htmlFor="itemPrice" className="col-form-label d-block">
                      <b>Type of Data Managed:</b> {logData['log-type']}
                    </label>
                    {logData['log-action'] === 'Edit' && <label htmlFor="itemBranch" className="col-form-label d-block">
                      <b>Edited Data:</b> {logData['log-data']}
                    </label>}
                    {logData['log-reason'] && <label htmlFor="itemBranch" className="col-form-label d-block">
                      <b>Reason:</b> {logData['log-reason']}
                    </label>}
                </div>
                
            </div>
        </>
    )
    const logModalFooter = (
        <>
        
        </>
    )
    
    return <Modal 
    headerContent={logModalHeader}
    bodyContent={logModalBody}
    footerContent={logModalFooter}
    stateChecker={stateChecker}
    stateControl={stateControl}
    />
}