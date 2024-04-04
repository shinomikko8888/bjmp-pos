import React, {useState} from "react";
import '../../../styles/buttons/general.css';
import Modal from "..";
import { handleSubmitWrapper } from "../../../utils";

export default function RetrieveModal (props) {
    const {stateChecker, stateControl, type, method, id, isSubmittedControl, prim, multipleIds} = props
    console.log(multipleIds)
    const retrieveValue = {
        id: id || '',
        mult: multipleIds || '',
        method: method.toLowerCase() || '',
        action: `retrieve-${type.toLowerCase()}`,
        prim: prim || '',
      }
    const handleSubmit = async (event) => {
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