import React, {useEffect, useState} from "react";
import '../../../styles/buttons/general.css';
import Modal from "..";
import { handleChangeWrapper, handleSubmitWrapper } from "../../../utils";
import { REASONS } from "../../../constants/reasons";

export default function RetrieveModal (props) {
    const {stateChecker, stateControl, type, method, id, isSubmittedControl, prim, multipleIds} = props
    const [retrieveValue, setRetrieveValue] = useState({
        id: '',
        mult: '',
        method: '',
        action: '',
        prim: '',
        reason: '',
        user: '',
      })
    const [errorMessage, setErrorMessage] = useState('');
    const filteredReasons = REASONS.filter(branch => branch.action === 'Retrieve')[0]?.content.filter(contentItem => contentItem.type === type)[0]?.reasons || [];
      useEffect(() => {
        setRetrieveValue(
          {
            ...retrieveValue,
            reason: '',
          }
        )
      }, [stateChecker]);
  
      useEffect(() => {
        setRetrieveValue({
          ...retrieveValue,
          id: id && id,
          mult: multipleIds && multipleIds ,
          method: method && method.toLowerCase(),
          action: type && `retrieve-${type.toLowerCase()}`,
          prim: prim && prim,
          user: localStorage.getItem('user-email'),
        })
      }, [type, method, id] )

      const handleChange = async (event) => {
        await handleChangeWrapper(event, retrieveValue, setRetrieveValue);
      };

    const handleSubmit = async (event) => {
        if(retrieveValue.reason === '' && filteredReasons.length !== 0)
          setErrorMessage('Please set a reason for retrieval!');
        else{
          try{
            const response = await handleSubmitWrapper(event, retrieveValue, true);
            if (response.success) {
                stateControl((prev) => !prev)
                isSubmittedControl((prev) => !prev)
            }
          } catch (error) {
            console.error('Error: ', error);
          }
        }
        
    }
    const retrieveHeader = (
        <div className='w-100 text-center'>
            <i className='fa-solid fa-rotate-left' style={{ fontSize: '40px' }}></i>
        </div> 
    )
    
    const retrieveBody = (
        <div className='text-center'>
            <h3>Confirm Retrieval?</h3>
            <p>Are you sure you want to retrieve  {
                method === 'Single' ?
                `the entry?` :
                `these entries?`
            } There might be ID conflicts but the system will handle it accordingly!</p>
            { filteredReasons.length !== 0 &&
              
              <select
                name="reason"
                id="reason"
                style={{ width: '100%', boxShadow: 'none' }}
                onChange={handleChange}
                value={retrieveValue.reason || ''}
                className="form-select"
            >
                <option value="" disabled hidden>--Select Reason--</option>
                {filteredReasons.map((reason, index) => (
                    <option key={index} value={reason}>{reason}</option>
                ))}
            </select>}
        </div>
    )

    const retrieveFooter = (
        <div className='d-flex align-items-center justify-content-end'>
          <button
            type="button"
            className='link-btn mx-2'
            onClick={() => stateControl((prev) => !prev)}
          >
            Cancel
          </button>
          <button
            type="button"
            className='main-btn'
            onClick={handleSubmit}
          >
            Proceed
          </button>
        </div>
      );

      return <Modal headerContent={retrieveHeader} 
      bodyContent={retrieveBody} 
      footerContent={retrieveFooter} 
      stateChecker={stateChecker} 
      stateControl={stateControl}
      customWidth={'25%'}
      customZIndex={20}/>;
}