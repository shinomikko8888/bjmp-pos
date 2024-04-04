import React, {useState} from "react";
import '../../../styles/buttons/general.css';
import Modal from "..";
import { handleSubmitWrapper } from "../../../utils";

export default function DeleteModal (props) {
    const {stateChecker, stateControl, type, method, id, isSubmittedControl, prim, multipleIds} = props
    const deleteValue = {
        id: id || '',
        mult: multipleIds || '',
        method: method.toLowerCase() || '',
        action: `delete-${type.toLowerCase()}`,
        prim: prim || '',
      }

    const handleSubmit = async (event) => {
        try{
          const response = await handleSubmitWrapper(event, deleteValue, true);
          if (response.success) {
              stateControl((prev) => !prev)
              isSubmittedControl((prev) => !prev)
          }
        } catch (error) {
          console.error('Error: ', error);
        }
    }
    const deleteHeader = (
        <div className='w-100 text-center'>
            <i className='fa-solid fa-trash' style={{ fontSize: '40px' }}></i>
        </div> 
    )
    
    const deleteBody = (
        <div className='text-center'>
            <h3>Confirm Deletion?</h3>
            <p>Are you sure you want to delete {
                method === 'Single' ?
                `this entry?` :
                `these entries?`
            } This cannot be undone!</p>
        </div>
    )

    const deleteFooter = (
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

      return <Modal headerContent={deleteHeader} 
      bodyContent={deleteBody} 
      footerContent={deleteFooter} 
      stateChecker={stateChecker} 
      stateControl={stateControl}
      customWidth={'25%'}
      customZIndex={20}/>;
}